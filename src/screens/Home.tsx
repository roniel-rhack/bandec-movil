import React from "react";
import CardCarouselComponent from "../components/CarouselCards";
import {Button, Icon, Text, View} from "native-base";
import {StyleSheet} from "react-native";
import CardModel from "../models/Card";

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

const listCards: CardModel[] = [
    {pan: "9200069995598913", name: "MARCOS MACIAS SANCHEZ", expMonth: "08", expYear: "29"},
    {pan: "9224069990035624", name: "MARCOS MACIAS SANCHEZ", expMonth: "08", expYear: "29"},
    {pan: "9225069990012770", name: "MARCOS MACIAS SANCHEZ", expMonth: "10", expYear: "29"},
]

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
    return (
        <View style={styles.view}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.titleCards}>Tarjetas</Text>
                <Button transparent iconRight style={styles.btnAdd} small>
                    <Text>Agregar Nueva</Text>
                    <Icon name="add"/>
                </Button>
            </View>
            <CardCarouselComponent listCards={listCards}/>
            <Text></Text>
            {props.children}
        </View>
    )
}

export default HomeScreen;