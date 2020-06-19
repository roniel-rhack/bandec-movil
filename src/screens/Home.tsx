import React from "react";
import CardCarouselComponent from "../components/CarouselCards";
import {Button, Icon, Text, View} from "native-base";
import {StyleSheet} from "react-native";

interface HomeScreenProps {

}

const styles = StyleSheet.create({
    view: {
        marginTop: 10,
    },
    titleCards: {
        marginLeft: 10,
        fontSize: 20
    },
    btnAdd: {
        marginLeft: 'auto'
    }
})

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
    return (
        <View style={styles.view} >
            <View style={{flexDirection: "row"}}>
                <Text style={styles.titleCards}>Tarjetas</Text>
                <Button transparent iconRight style={styles.btnAdd} small>
                    <Text>Agregar Nueva</Text>
                    <Icon name="add"/>
                </Button>
            </View>
            <CardCarouselComponent/>
            <Text>HOlaaaa</Text>
            {props.children}
        </View>
    )
}

export default HomeScreen;