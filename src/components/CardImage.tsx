import React, {Fragment, useState} from "react";
import {NativeBase, Text, View} from "native-base";
import {Dimensions, Image, StyleSheet} from "react-native";


const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
    item: {
        width: 310,
        height: 200,
    },
    cardImg: {
        width: screenWidth,
        height: screenWidth * 0.7,
        maxHeight: 500,
        resizeMode: "contain"
    },
    panCard: {
        position: "relative",
        color: 'black',
        zIndex: 1,
        fontSize: 30,
        left: 45,
        top: -147
    },
    nameCard: {
        position: "relative",
        color: 'black',
        zIndex: 1,
        fontSize: 15,
        left: 35,
        top: -125
    },
    vencCard: {
        position: "relative",
        color: 'black',
        zIndex: 1,
        fontSize: 15,
        left: 120,
        top: -120
    }
});

export interface CardImageProps extends NativeBase.View {
    pan: string;
    name: string;
    venc?: string;
    brillo?: boolean;
}

const CardImage: React.FC<CardImageProps> = ({pan, name, venc, brillo = false, ...props}) => {
    const [loadEnd, setLoadEnd] = useState(false);
    return (
        <View {...props} style={styles.item}>
            {brillo
                ? <Image source={require('../../images/cardBANDECBrillo.png')} style={styles.cardImg}
                         onLoadEnd={() => setLoadEnd(true)}/>
                : <Image source={require('../../images/cardBANDEC.png')} style={styles.cardImg}
                         onLoadEnd={() => setLoadEnd(true)}/>}
            {loadEnd
                ? (<Fragment>
                    <Text style={styles.panCard}>{pan}</Text>
                    <Text style={styles.nameCard}>{name.toUpperCase()}</Text>
                    {!!venc ? <Text style={styles.vencCard}>VENCE: {venc}</Text> : null}
                </Fragment>) : null}

        </View>
    );
}

export default CardImage;