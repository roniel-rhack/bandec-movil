import React from "react";
import Carousel, {AdditionalParallaxProps} from "react-native-snap-carousel";
import {Dimensions} from "react-native";
import CardModel from "../models/Card";
import CardComponentToCarousel from "./CarouselItemCard";


const {width: screenWidth} = Dimensions.get('window');

export interface CardCarouselComponentProps {
    listCards: CardModel[];
    disableFormat?: boolean;
}

const PreProcessRenderItem = (item: { index: number, item: any }, parallaxProps: AdditionalParallaxProps | undefined,
                              disableFormat?: boolean) => {
    return (<CardComponentToCarousel index={item.index} item={item.item} parallaxProps={parallaxProps}
                                     disableFormat={disableFormat}/>)
}

const CardCarouselComponent: React.FC<CardCarouselComponentProps> = (props) => {
    return (
        <Carousel sliderWidth={screenWidth} sliderHeight={screenWidth} itemWidth={screenWidth - 60}
                  data={props.listCards}
                  renderItem={(item, parallaxProps) => PreProcessRenderItem(item, parallaxProps, props.disableFormat)}
                  hasParallaxImages={true}
                  onSnapToItem={slideIndex => {
                      // slideIndex === 4 ? carouselRef?.snapToItem(0) : null;
                  }}
        />
    )
}

export default CardCarouselComponent;