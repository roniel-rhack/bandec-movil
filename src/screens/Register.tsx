import React from "react";
import {Container} from "native-base";
import ImageBackground from "../components/ImageBackground";

const RegisterScreen: React.FC = (props) => {
    return (
        <Container>
            <ImageBackground source={require('../../images/BackgroundCleared.png')}/>

        </Container>
    );
}

export default RegisterScreen;