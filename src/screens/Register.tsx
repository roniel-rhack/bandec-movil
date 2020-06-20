import React, {Fragment, useState} from "react";
import {Body, Button, CardItem, Container, Left, Right, Spinner, Text, View} from "native-base";
import FooterForm from "../components/FooterForm";
import {Formik} from "formik";
import InputWithLabel from "../components/InputWithLabel";
import CardModel from "../models/Card";
import PickerYear from "../components/PickerYear";
import PickerMonth from "../components/PickerMonth";
import {PermissionsAndroid, StyleSheet} from "react-native";
import useKeyboardHandle from "../hooks/useKeyboardHandle";
import CardCarouselComponent from "../components/CarouselCards";
import UssdDialer from "../native/UssdDialer";
import {cardNumberClear} from "../utils/cardProcess";

const initialValue: CardModel = {pan: "", name: "", expYear: null, expMonth: null}
const styles = StyleSheet.create({
    btnTxt: {
        alignSelf: "center"
    },
    cardDetails: {
        zIndex: -1
    },
});
const RegisterScreen: React.FC = (props) => {
    const keyboardHandle = useKeyboardHandle();
    const [inputFocus, setInputFocus] = useState("");

    return (
        <Container>
            <Formik
                initialValues={initialValue}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    UssdDialer.registerUSSDCode(cardNumberClear(values.pan),
                        values.name.toUpperCase(), `${values.expYear}${values.expMonth}`)
                        .then(value => {
                            console.log('ussd register', value);
                            setSubmitting(false);
                        })
                        .catch(reason => {
                            console.log('ussd register error', reason);
                            setSubmitting(false);
                        })
                }}
            >
                {(formikBag) =>
                    (
                        <Fragment>
                            {/*<CardImage pan={formikBag.values.pan} name={formikBag.values.name}*/}
                            {/*           style={styles.cardDetails}*/}
                            {/*           venc={`${formikBag.values.expMonth}/${formikBag.values.expYear}`}/>*/}
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

export default RegisterScreen;