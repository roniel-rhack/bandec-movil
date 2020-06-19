import React from "react";
import Carousel from "react-native-snap-carousel";
import {Dimensions} from "react-native";
import CardComponentToCarousel from "./CarouselItemCard";
import CardModel from "../models/Card";


const {width: screenWidth} = Dimensions.get('window');

const listCards: CardModel[] = [
    {pan: "9200069995598913", name: "MARCOS MACIAS SANCHEZ", expMonth: "08", expYear: "29"},
    {pan: "9224069990035624", name: "MARCOS MACIAS SANCHEZ", expMonth: "08", expYear: "29"},
    {pan: "9225069990012770", name: "MARCOS MACIAS SANCHEZ", expMonth: "10", expYear: "29"},
]

const CardCarouselComponent: React.FC<any> = (props) => {
    return (
        <Carousel sliderWidth={screenWidth} sliderHeight={screenWidth} itemWidth={screenWidth - 60}
                  data={listCards} renderItem={CardComponentToCarousel} hasParallaxImages={true}
                  onSnapToItem={slideIndex => {
                      // slideIndex === 4 ? carouselRef?.snapToItem(0) : null;
                  }}
        />
    )
}

export default CardCarouselComponent;