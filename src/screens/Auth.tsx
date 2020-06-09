import React, {Fragment, useEffect} from "react";
import {Formik} from "formik";
import {Dimensions, Image, PermissionsAndroid, StyleSheet} from "react-native";
import {Button, Card, CardItem, Container, Text, Toast} from "native-base";
import InputWithLabel from "../components/InputWithLabel";
import CheckBoxWithLabel from "../components/CheckBoxWithLabel";
import * as yup from "yup";

interface authValues {
    clave: string;
    remember: boolean;
}

export const initialValue: authValues = {
    clave: "",
    remember: false
}

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    form: {
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
    clave: {},
    imgBack: {width: screenWidth, height: screenHeight, resizeMode: "cover", position: "absolute"}
});
// TODO TRABAJANDO AUN AKI <<<
const AuthScreen: React.FC<{}> = (props) => {
    return (
        <Container>
            <Formik validationSchema={AuthScreenSchemaValidation}
                    initialValues={initialValue}
                    onSubmit={async (values, {setSubmitting}) => {
                        setSubmitting(true);
                        //// All actions here
                        setSubmitting(false);
                    }}
            >
                {(formikBag) => (
                    <Fragment>
                        <Image style={styles.imgBack} source={require('../../images/BackgroundCleared.png')}/>
                        <Card style={styles.form}>
                            <CardItem header>
                                <Text>Introduzca la clave de autenticación para acceder al sistema.</Text>
                            </CardItem>
                            <InputWithLabel secureTextEntry style={styles.clave} formikBag={formikBag}
                                            label="Clave de autenticación" name="clave"/>
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

const AuthScreenSchemaValidation = yup.object<authValues>({
    clave: yup.string().length(5, "Este campo debe tener una logitud de 5 números.")
        .required("Este campo es obligatorio.")
        .test("only-numbers", "Este campo solo puede contener números.",
            (value) => {
                // eslint-disable-next-line
                return value == parseInt(value);
            }
        ),
    remember: yup.boolean()
})

export default AuthScreen;