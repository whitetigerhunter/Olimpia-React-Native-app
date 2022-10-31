import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { VideoUploadSliderItem } from 'app/Components';
import { Metrics, Colors } from 'app/Theme';
import { getRandomArrayElements } from 'app/helpers';
import { translate } from 'app/translations/translationHelpers';

interface State {
  chosenSlides: Record<string, string>[];
  currentSlideIndex: number;
}

class VideoUploadSlider extends React.PureComponent<null, State> {
  constructor(props: any) {
    super(props);
    this.carouselRef = React.createRef();
    this.state = {
      chosenSlides: [],
      currentSlideIndex: 0,
    };
  }

  carouselRef: any;

  slides = [
    {
      text: translate('scientificText1'),
    },
    {
      text: translate('scientificText2'),
    },
    {
      text: translate('scientificText3'),
    },
    { text: translate('scientificText4') },
    {
      text: translate('scientificText5'),
    },
    {
      text: translate('scientificText6'),
    },
    {
      text: translate('scientificText7'),
    },
    {
      text: translate('scientificText8'),
    },
    {
      text: translate('scientificText9'),
    },
    { text: translate('scientificText10') },
    {
      text: translate('scientificText11'),
    },
    {
      text: translate('scientificText12'),
    },
    {
      text: translate('scientificText13'),
    },
    {
      text: translate('scientificText14'),
    },
    {
      text: translate('scientificText15'),
    },
    { text: translate('scientificText16') },
    {
      text: translate('scientificText17'),
    },
    {
      text: translate('scientificText18'),
    },
    {
      text: translate('scientificText19'),
    },
    {
      text: translate('scientificText20'),
    },
    {
      text: translate('scientificText21'),
    },
    { text: translate('scientificText22') },
    {
      text: translate('scientificText23'),
    },
    {
      text: translate('scientificText24'),
    },
    {
      text: translate('scientificText25'),
    },
    {
      text: translate('scientificText26'),
    },
    { text: translate('scientificText27') },
    {
      text: translate('scientificText28'),
    },
    {
      text: translate('scientificText29'),
    },
    {
      text: translate('scientificText30'),
    },
    {
      text: translate('scientificText31'),
    },
    {
      text: translate('scientificText32'),
    },
    { text: translate('scientificText33') },
    {
      text: translate('scientificText34'),
    },
    {
      text: translate('scientificText35'),
    },
    {
      text: translate('scientificText36'),
    },
    {
      text: translate('scientificText37'),
    },
    {
      text: translate('scientificText38'),
    },
    { text: translate('scientificText39') },
    {
      text: translate('scientificText40'),
    },
    {
      text: translate('scientificText41'),
    },
    {
      text: translate('scientificText42'),
    },
    {
      text: translate('scientificText43'),
    },
  ];

  componentDidMount() {
    const chosenSlides = getRandomArrayElements(this.slides, 15);
    this.setState({ chosenSlides });
  }

  handleScrollIndexChanged = (index: number) => this.setState({ currentSlideIndex: index });

  renderItem = (slide: any) => {
    const { index, item } = slide;
    return <VideoUploadSliderItem key={index} text={item.text} />;
  };

  render() {
    const screenWidth = Metrics.screenWidth;
    const itemWidth = screenWidth - Metrics.doubleMediumMargin;
    const { currentSlideIndex, chosenSlides } = this.state;
    return (
      <>
        <Carousel
          vertical={false}
          ref={this.carouselRef}
          firstItem={currentSlideIndex}
          data={chosenSlides}
          renderItem={this.renderItem}
          itemWidth={itemWidth}
          sliderWidth={screenWidth}
          onSnapToItem={this.handleScrollIndexChanged}
          containerCustomStyle={styles.carouselContainer}
          autoplay
          loop
        />
        <Pagination
          // @ts-ignore
          renderDots={(activeIndex: number) =>
            chosenSlides.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  this.carouselRef?.current._snapToItem(this.carouselRef?.current._getPositionIndex(i))
                }
              >
                <View style={[styles.dot, activeIndex === i ? styles.activeDot : styles.inactiveDot]} />
              </TouchableOpacity>
            ))
          }
          dotsLength={this.slides.length}
          activeDotIndex={currentSlideIndex}
          containerStyle={styles.paginationContainer}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: { top: -70 },
  paginationContainer: {
    bottom: 170,
    paddingHorizontal: 5,
  },
  dot: {
    borderRadius: Metrics.dot,
    marginHorizontal: 1.5,
  },
  activeDot: {
    width: Metrics.activewDotWidth,
    height: Metrics.dot,
    backgroundColor: Colors.brown,
  },
  inactiveDot: {
    width: Metrics.dot,
    height: Metrics.dot,
    backgroundColor: Colors.lightBlue,
  },
});

export default VideoUploadSlider as any;
