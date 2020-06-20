import React, {Fragment, useState} from "react";
import {Platform, StyleSheet, View} from "react-native";
import {Text} from 'native-base';
import {AdditionalParallaxProps, ParallaxImage} from "react-native-snap-carousel";
import CardModel from "../models/Card";
import {monedaCard, monedas, panCardVisualizerEncode} from "../utils/cardProcess";

export interface CardComponentProps {
    item: CardModel,
    index: number,
    parallaxProps: AdditionalParallaxProps | undefined
    disableFormat?: boolean;
}

const styles = StyleSheet.create({
    item: {
        width: 310,
        height: 200,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
    cardNumber: {
        position: "absolute",
        bottom: 75,
        left: 30,
        fontSize: 26,
    },
    cardName: {
        position: "absolute",
        bottom: 42,
        left: 30,
        fontSize: 11
    },
    cardMoneda: {
        position: "absolute",
        bottom: 22,
        left: 25,
        fontSize: 11
    },
    cardExp: {
        position: "absolute",
        bottom: 22,
        left: 100,
        fontSize: 11
    }
})

const CardComponentToCarousel: React.FC<CardComponentProps> = (props) => {
    const [loadEnd, setLoadEnd] = useState(false);
    const {expYear, expMonth, name, pan} = props.item;
    const moneda: monedas = monedaCard(pan);
    const img = require("../../images/cardBANDEC.png")
    return (
        <View style={styles.item}>
            <ParallaxImage onLoadEnd={() => setLoadEnd(true)} onLoadStart={() => setLoadEnd(false)}
                           source={img} containerStyle={styles.imageContainer} style={styles.image} showSpinner
                           parallaxFactor={0.04} {...props.parallaxProps}/>
            {loadEnd ? (
                <Fragment>
                    <Text style={styles.cardNumber}>{props.disableFormat ? pan : panCardVisualizerEncode(pan)}</Text>
                    <Text style={styles.cardName}>{name.toUpperCase()}</Text>
                    <Text style={styles.cardExp}>VENCE: {`${expMonth}/${expYear}`}</Text>
                    {moneda === monedas.CUP
                        ? <Text style={styles.cardMoneda}>CUP</Text>
                        : null}
                </Fragment>
            ) : null}

        </View>
    );
};

export default CardComponentToCarousel;