import React, {Fragment, useEffect, useState} from "react";
import {Body, Button, CardItem, Container, Left, Right, Spinner, Text, View} from "native-base";
import FooterForm from "../components/FooterForm";
import {Formik} from "formik";
import InputWithLabel from "../components/InputWithLabel";
import CardModel from "../models/Card";
import CardImage from "../components/CardImage";
import PickerYear from "../components/PickerYear";
import PickerMonth from "../components/PickerMonth";
import {StyleSheet} from "react-native";
import useKeyboardHandle from "../hooks/useKeyboardHandle";

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

    useEffect(() => {
        console.log('focus', inputFocus)
    }, [inputFocus])

    return (
        <Container>
            <Formik
                initialValues={initialValue}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 3500);
                }}
            >
                {(formikBag) =>
                    (
                        <Fragment>
                            <CardImage pan={formikBag.values.pan} name={formikBag.values.name}
                                       style={styles.cardDetails}
                                       venc={`${formikBag.values.expMonth}/${formikBag.values.expYear}`}/>
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