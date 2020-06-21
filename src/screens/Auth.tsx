import React, {Fragment, useEffect, useState} from "react";
import {Formik} from "formik";
import {Button, CardItem, Container, Spinner, Text} from "native-base";
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
}

// TODO TRABAJANDO AUN AKI <<<
const AuthScreen: React.FC<AuthScreenProps> = (props) => {
    const [waitBiometric, setWaitBiometric] = useState(true);

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
    }, [])

    return (
        <Container>
            <ImageBackground source={require('../../images/BackgroundCleared.png')}/>
            <Formik validationSchema={AuthScreenSchemaValidation}
                    initialValues={initialValue}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(true);
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 3500);
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


const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);