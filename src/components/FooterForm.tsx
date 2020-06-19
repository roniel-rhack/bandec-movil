import React, {useEffect, useRef} from "react";
import {Animated, Dimensions, SafeAreaView, StyleSheet} from "react-native";
import {Card} from "native-base";

const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
    form: {
        position: "absolute",
        bottom: 0,
        left: -2,
    },
    card: {
        marginBottom: 0,
        width: screenWidth,
        maxWidth: 500,
        alignSelf: "center",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 10,
    },
});

const FooterForm: React.FC = (props) => {
    const sliceAnim = useRef(new Animated.Value(400)).current;
    const sliceIn = () => {
        return Animated.timing(sliceAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: false
        });
    };
    const sliceOut = () => {
        return Animated.timing(sliceAnim, {
            toValue: 400,
            duration: 350,
            useNativeDriver: false
        });
    };
    useEffect(() => {
        sliceIn().start();
    }, [])

    return (
        <SafeAreaView style={styles.form}>
            <Animated.View style={{translateY: sliceAnim}}>
                <Card style={styles.card}>
                    {props.children}
                </Card>
            </Animated.View>
        </SafeAreaView>
    );
}

export default FooterForm;