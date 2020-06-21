import React, {Fragment, useEffect, useState} from "react";
import {Formik} from "formik";
import {Button, CardItem, Container, Spinner, Text, Toast} from "native-base";
import InputWithLabel from "../components/InputWithLabel";
import CheckBoxWithLabel from "../components/CheckBoxWithLabel";
import * as yup from "yup";
import {Dimensions, StyleSheet} from "react-native";
import ImageBackground from "../components/ImageBackground";
import FooterForm from "../components/FooterForm";
import ReactNativeBiometrics from 'react-native-biometrics'
import {connect} from "react-redux";
import {rootStateModel} from "../reducers";
import {ConfigsAppModel, ConfigsAppState} from "../reducers/ConfigsApp";
import UssdDialer from "../native/UssdDialer";
// @ts-ignore;
import SmsListener from 'react-native-android-sms-listener2'
import {changeCardInUse, registerCompleted, saveCodeAuth} from "../actions/ConfigsApp";
import {SmsListenerModel} from "../utils/TypesUtils";
import {extractCuenta, validateAuth} from "../utils/MessagesProcess";
import {StackNavigationProp} from "@react-navigation/stack";

interface authValues {
    clave: string;
    show: boolean;
}

export const initialValue: authValues = {
    clave: "",
    show: false
}

const {width: screenWidth} = Dimensions.get('window');
const styles = StyleSheet.create({
    form: {
        position: "absolute",
        bottom: 0,
        left: -2
    },
    card: {
        marginBottom: 0,
        width: screenWidth,
        maxWidth: 500,
        alignSelf: "center",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 10
    },
    btnTxt: {
        alignSelf: "center"
    },
    chkBoxRem: {
        margin: 20,
    },
    clave: {},
});

export interface AuthScreenProps {
    configsApp: ConfigsAppModel;
    saveCodeAuth: (code: string) => void;
    changeCardInUse: (pan: string) => void;
    registerCompleted: () => void;
    navigation: StackNavigationProp<any>;
}

// TODO TRABAJANDO AUN AKI <<<
const AuthScreen: React.FC<AuthScreenProps> = (props) => {
    const [waitBiometric, setWaitBiometric] = useState(true);
    const [codeTest, setCodeTest] = useState('');

    useEffect(() => {
        if (props.configsApp.biometrics && props.configsApp.registradoCompletado && props.configsApp.state === ConfigsAppState.completed)
            ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirme su identidad', cancelButtonText: 'Cancelar'})
                .then((resultObject) => {
                    const {success} = resultObject
                    if (success) {
                        console.log('successful biometrics provided')
                        // setWaitBiometric(false);
                    } else {
                        console.log('user cancelled biometric prompt')
                        setWaitBiometric(false);
                    }
                })
                .catch(() => {
                    console.log('biometrics failed')
                    setWaitBiometric(false);
                })
        else
            setWaitBiometric(false);

        let smsListener = SmsListener.addListener((message: SmsListenerModel) => {
            if (message.originatingAddress === "PAGOxMOVIL" && validateAuth(message.body)) {
                props.saveCodeAuth(codeTest);
                props.changeCardInUse(extractCuenta(message.body));
                props.registerCompleted();
            }
        })
        return () => {
            smsListener.remove();
        }
    }, []);

    useEffect(() => {
        if (props.configsApp.registradoCompletado)
            props.navigation.navigate("Inicio");
    }, [props.configsApp.registradoCompletado]);

    return (
        <Container>
            <ImageBackground source={require('../../images/BackgroundCleared.png')}/>
            <Formik validationSchema={AuthScreenSchemaValidation}
                    initialValues={initialValue}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(true);
                        setCodeTest(values.clave);
                        UssdDialer.autenticateUSSDCode(values.clave)
                            .then(value => {
                                if (!value.toUpperCase().includes("USTED YA SE ENCUENTRA AUTENTICADO".toUpperCase())) {

                                }
                                Toast.show({
                                    // @ts-ignore
                                    text: value,
                                    duration: 5000,
                                    buttonText: "Leido"
                                })
                                setSubmitting(false);
                            })
                            .catch(reason => {
                                Toast.show({
                                    // @ts-ignore
                                    text: reason,
                                    duration: 5000,
                                    buttonText: "Leido"
                                })
                                setSubmitting(false);
                            })
                    }}
            >
                {(formikBag) => (
                    <Fragment>
                        {!waitBiometric ? (
                            <FooterForm>
                                <CardItem header>
                                    <Text>Introduzca la clave de autenticación para acceder al sistema.</Text>
                                </CardItem>
                                <InputWithLabel secureTextEntry={!formikBag.values.show} style={styles.clave}
                                                formikBag={formikBag}
                                                label="Clave de autenticación:" name="clave" keyboardType="numeric"/>

                                {props.configsApp.claveRegistro ? (
                                    <Fragment>
                                        <Text>Datos necesarios de la Multibanca:</Text>
                                        <Text>Posición {`${props.configsApp.claveRegistro.posPIN}`} del PIN</Text>
                                        <Text>Coordenada {`${props.configsApp.claveRegistro.coord1}`}</Text>
                                        <Text>Coordenada {`${props.configsApp.claveRegistro.coord2}`}</Text>
                                    </Fragment>
                                ) : null}
                                <CheckBoxWithLabel style={styles.chkBoxRem} formikBag={formikBag} label="Mostrar clave"
                                                   name="show" textHelp=""/>

                                <CardItem footer style={styles.btnTxt}>
                                    {!formikBag.isSubmitting
                                        ?
                                        <Button bordered danger onPress={() => formikBag.submitForm()}
                                                disabled={formikBag.isSubmitting}>
                                            <Text>AUTENTICARSE</Text>
                                        </Button>
                                        : <Button transparent><Spinner/></Button>
                                    }
                                </CardItem>
                            </FooterForm>
                        ) : null}
                    </Fragment>
                )}
            </Formik>
        </Container>
    );
}

const AuthScreenSchemaValidation = yup.object<authValues>({
    clave: yup.string().length(5, "Este campo debe tener una logitud de 5 números.")
        .required("Este campo es obligatorio.")
        .test("only-numbers", "Este campo solo puede contener números.",
            (value) => {
                // eslint-disable-next-line
                return value == parseInt(value);
            }
        ),
    show: yup.boolean().notRequired()
})

const mapStateToProps = (state: rootStateModel) => ({
    configsApp: state.ConfigsApp
})


const mapDispatchToProps = {
    saveCodeAuth,
    changeCardInUse,
    registerCompleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);