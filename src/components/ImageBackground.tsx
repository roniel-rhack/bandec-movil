import React from "react";
import {Dimensions, Image, StyleSheet} from "react-native";

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    imgBack: {
        width: screenWidth, height: screenHeight,
        resizeMode: "cover", position: "absolute"
    }
});

const ImageBackground: React.FC<ImageBase> = (props) => {
    return (
        <Image style={styles.imgBack} {...props}/>
    );
}

export default ImageBackground;