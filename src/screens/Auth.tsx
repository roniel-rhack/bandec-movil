import React, {Fragment} from "react";
import {Formik} from "formik";
import {Dimensions, Image, StyleSheet} from "react-native";
import {Button, Card, CardItem, Container, Text} from "native-base";
import InputWithLabel from "../components/InputWithLabel";
import CheckBoxWithLabel from "../components/CheckBoxWithLabel";

interface authValues {
    clave: string;
    remember: boolean;
}

const initialValue: authValues = {
    clave: "",
    remember: false
}

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    form: {
        // backgroundColor: 'white',
        position: "absolute",
        bottom: 0,
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
        margin: 20
    },
    clave: {}
});
// TODO TRABAJANDO AUN AKI <<<
const AuthScreen: React.FC<{}> = (props) => {
    return (
        <Container>
            <Formik
                initialValues={initialValue}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(true);
                    //// All actions here
                    setSubmitting(false);
                }}
            >
                {(formikBag) => (
                    <Fragment>
                        <Image style={{width: screenWidth, height: screenHeight, resizeMode: "cover"}}
                               source={require('../../images/BackgroundBandec.png')}/>
                        <Card style={styles.form}>
                            <CardItem header>
                                <Text>Introduzca la clave de autenticación para acceder al sistema.</Text>
                            </CardItem>
                            <InputWithLabel style={styles.clave} formikBag={formikBag} label="Clave de autenticación"
                                            name="clave"/>
                            <CheckBoxWithLabel style={styles.chkBoxRem} formikBag={formikBag} label="Recordar clave"
                                               name="remember"/>

                            <CardItem footer style={styles.btnTxt}>
                                <Button bordered danger onPress={() => formikBag.submitForm()}>
                                    <Text>AUTENTICARSE</Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </Fragment>
                )}
            </Formik>
        </Container>
    );
}

export default AuthScreen;