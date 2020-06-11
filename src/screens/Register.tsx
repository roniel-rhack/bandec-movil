import React from "react";
import {Container} from "native-base";
import {Dimensions, Image, StyleSheet} from "react-native";
import FooterForm from "../components/FooterForm";
import {Formik} from "formik";
import InputWithLabel from "../components/InputWithLabel";
import CardModel from "../models/Card";
import MonthSelectorCalendar from "react-native-month-selector";

const card = {pan: "9225069990012770", name: "MARCOS MACIAS SANCHEZ", expDate: "10/14"};
const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
    cardImg: {
        width: screenWidth,
        height: screenWidth * 0.7,
        maxHeight: 500,
        resizeMode: "contain"
    },
})

const initialValue: CardModel = {pan: "", name: "", expDate: ""}

const RegisterScreen: React.FC = (props) => {
    return (
        <Container>
            <Image source={require('../../images/cardBANDEC.png')} style={styles.cardImg}/>
            <Formik
                initialValues={initialValue}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 3500);
                }}
            >
                {(formikBag) => (
                    <FooterForm>
                        <InputWithLabel formikBag={formikBag} label="Número de tarjeta" name="pan"/>
                        <InputWithLabel formikBag={formikBag} label="Nombre y apellidos" name="name"/>
                    </FooterForm>
                )}
            </Formik>
        </Container>
    );
}

export default RegisterScreen;