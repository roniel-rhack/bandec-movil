import React from "react";
import Carousel, {CarouselStatic} from "react-native-snap-carousel";
import {Dimensions} from "react-native";
import CardComponentToCarousel from "./Card";
import CardModel from "../models/Card";


const {width: screenWidth} = Dimensions.get('window');

const listCards: CardModel[] = [
    {pan: "9200069995598913", name: "MARCOS MACIAS SANCHEZ", expDate: "08/29"},
    {pan: "9224069990035624", name: "MARCOS MACIAS SANCHEZ", expDate: "08/29"},
    {pan: "9225069990012770", name: "MARCOS MACIAS SANCHEZ", expDate: "10/14"},
]

const CardCarouselComponent: React.FC<any> = (props) => {
    let carouselRef: CarouselStatic<any> | null;
    return (
        <Carousel ref={(c: CarouselStatic<any> | null) => carouselRef = c}
                  sliderWidth={screenWidth} sliderHeight={screenWidth} itemWidth={screenWidth - 60}
                  data={listCards} renderItem={CardComponentToCarousel} hasParallaxImages={true}
                  onSnapToItem={slideIndex => {
                      slideIndex === 4 ? carouselRef?.snapToItem(0) : null;
                  }}
        />
    )
}

export default CardCarouselComponent;