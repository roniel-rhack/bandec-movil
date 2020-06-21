import React, {Fragment, useEffect, useState} from "react";
import {Body, Button, CardItem, Container, Left, Right, Spinner, Text, Toast, View} from "native-base";
import FooterForm from "../components/FooterForm";
import {Formik} from "formik";
import InputWithLabel from "../components/InputWithLabel";
import CardModel from "../models/Card";
import PickerYear from "../components/PickerYear";
import PickerMonth from "../components/PickerMonth";
import {StyleSheet} from "react-native";
import useKeyboardHandle from "../hooks/useKeyboardHandle";
import CardCarouselComponent from "../components/CarouselCards";
import UssdDialer from "../native/UssdDialer";
import {cardNumberClear} from "../utils/cardProcess";
// @ts-ignore;
import SmsListener from 'react-native-android-sms-listener';
import {extractRegisterCode} from "../utils/MessagesProcess";
import {connect} from "react-redux";
import {captureRegisterCode} from "../actions/ConfigsApp";
import {ConfigsAppModel, registerCodeModel} from "../reducers/ConfigsApp";
import {StackNavigationProp} from "@react-navigation/stack";
import {rootStateModel} from "../reducers";

const initialValue: CardModel = {
    pan: "9224 0699 9003 5624",
    name: "MARCOS MACIAS SANCHEZ",
    expYear: "29",
    expMonth: "08"
}
const styles = StyleSheet.create({
    btnTxt: {
        alignSelf: "center"
    },
    cardDetails: {
        zIndex: -1
    },
});

export interface RegisterScreenProps {
    captureRegisterCode: (code: registerCodeModel) => any;
    ConfigsApp: ConfigsAppModel;
    navigation: StackNavigationProp<any>;
}

const RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
    const keyboardHandle = useKeyboardHandle();
    const [inputFocus, setInputFocus] = useState("");

    useEffect(() => {
        let smsListener = SmsListener.addListener((message: { originatingAddress: string, body: string }) => {
            if (message.originatingAddress === "PAGOxMOVIL") {
                console.log('msg', message.body)
                const code = extractRegisterCode(message.body)
                if (code) props.captureRegisterCode(code);
            }
        })
        return () => {
            smsListener.remove();
        }
    }, [])

    useEffect(() => {
        if (props.ConfigsApp.claveRegistro) {
            props.navigation.navigate("Autenticarse");
        }
    }, [props.ConfigsApp.claveRegistro])

    return (
        <Container>
            <Formik
                initialValues={initialValue}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    UssdDialer.registerUSSDCode(cardNumberClear(values.pan),
                        values.name.toUpperCase(), `${values.expYear}${values.expMonth}`)
                        .then(value => {
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
                            setSubmitting(false);
                        })
                }}
            >
                {(formikBag) =>
                    (
                        <Fragment>
                            <CardCarouselComponent disableFormat listCards={[{
                                name: formikBag.values.name, expYear: formikBag.values.expYear,
                                pan: formikBag.values.pan, expMonth: formikBag.values.expMonth
                            }]}/>
                            <FooterForm>
                                {!keyboardHandle.keyboardOpen
                                    ? <CardItem header>
                                        <Text>Introduzca los datos de una de sus tarjetas para registrarse.</Text>
                                    </CardItem> : null}
                                {!keyboardHandle.keyboardOpen || (keyboardHandle.keyboardOpen && inputFocus === "pan")
                                    ? <InputWithLabel type="card number" formikBag={formikBag} keyboardType="numeric"
                                                      label="Número de Tarjeta:" name="pan"
                                                      setInputFocus={setInputFocus}
                                                      style={{}}/>
                                    : null}
                                {!keyboardHandle.keyboardOpen || (keyboardHandle.keyboardOpen && inputFocus === "name")
                                    ? <InputWithLabel inlineLabel formikBag={formikBag} keyboardType="default"
                                                      label="Títular:" name="name" type="card name"
                                                      setInputFocus={setInputFocus}/>
                                    : null}
                                {!keyboardHandle.keyboardOpen
                                    ? <View style={{display: "flex", flexDirection: "row"}}>
                                        <Left>
                                            <Text>Vencimiento:</Text>
                                        </Left>
                                        <Body>
                                            <PickerMonth name="expMonth" formikBag={formikBag}/>
                                        </Body>
                                        <Right>
                                            <PickerYear name="expYear" formikBag={formikBag}/>
                                        </Right>
                                    </View> : null}
                                {!keyboardHandle.keyboardOpen
                                    ? (<CardItem footer style={styles.btnTxt}>
                                        {!formikBag.isSubmitting
                                            ?
                                            <Button bordered danger onPress={() => formikBag.submitForm()}
                                                    disabled={formikBag.isSubmitting}>
                                                <Text>REGISTRARSE</Text>
                                            </Button>
                                            : <Button transparent><Spinner/></Button>
                                        }
                                    </CardItem>) : null}
                            </FooterForm>
                        </Fragment>
                    )}
            </Formik>
        </Container>
    );
}

const mapStateToProps = (state: rootStateModel) => ({
    ConfigsApp: state.ConfigsApp
})

const mapDispatchToProps = {
    captureRegisterCode
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);