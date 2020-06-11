import React from "react";
import {Formik} from "formik";
import {Button, CardItem, Container, Spinner, Text} from "native-base";
import InputWithLabel from "../components/InputWithLabel";
import CheckBoxWithLabel from "../components/CheckBoxWithLabel";
import * as yup from "yup";
import {Dimensions, StyleSheet} from "react-native";
import ImageBackground from "../components/ImageBackground";
import FooterForm from "../components/FooterForm";

interface authValues {
    clave: string;
    remember: boolean;
}

export const initialValue: authValues = {
    clave: "",
    remember: false
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
// TODO TRABAJANDO AUN AKI <<<
const AuthScreen: React.FC<{}> = (props) => {

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
                    <FooterForm>
                        <CardItem header>
                            <Text>Introduzca la clave de autenticación para acceder al sistema.</Text>
                        </CardItem>
                        <InputWithLabel secureTextEntry style={styles.clave} formikBag={formikBag}
                                        label="Clave de autenticación" name="clave"/>
                        <CheckBoxWithLabel style={styles.chkBoxRem} formikBag={formikBag} label="Recordar clave"
                                           name="remember"/>

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