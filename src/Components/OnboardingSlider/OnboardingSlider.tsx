import React from 'react';
import { PermissionsAndroid, Platform, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";

import Carousel, { Pagination } from 'react-native-snap-carousel';

import { OnboardingSliderItem } from 'app/Components';
import * as enums from 'app/Constants/enums';
import { Route } from 'app/Navigators';
import { Metrics, Metricstablet, Colors } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';
import DeviceInfo from 'react-native-device-info';
import * as types from '../../Constants/types';
import Toast from 'react-native-simple-toast';


interface Props {
  currentSlideIndex: number;
  onChangeIndex: (currentSlideIndex: number) => void;
  navigation: types.NavigationProp<Route.NoteSelection, types.NavigationParams[Route.Onboarding]>;
}

interface State {
  currentSlideIndex: number;
}

export default class OnboardingSlider extends React.PureComponent<Props, State> {
  carouselRef = React.createRef<Carousel<any>>();

  constructor(props: Props) {
    super(props);
    this.state = {
      currentSlideIndex: this.props.currentSlideIndex,
    };
  }

  slides = [
    {
      title: translate('onboardingTitleFirst'),
      description: translate('onboardingDescriptionFirst'),
      descriptionSecondary: translate('onboardingDescriptionSecond'),
    },
    {
      title: translate('onboardingTitleSecond'),
      description: translate('onboardingDescriptionThird'),
      descriptionSecondary: null,
    },
    {
      title: translate('onboardingTitleThird'),
      description: translate('onboardingDescriptionFourth'),
      descriptionSecondary: translate('onboardingDescriptionFifth'),
    },
    {
      title: translate('onboardingTitleFourth'),
      description: translate('onboardingDescriptionSixth'),
    },
  ];

  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        // @ts-ignore
        if (granted === PermissionsAndroid.RESULTS.GRANTED || granted == true) {
          console.log('all permissions granted');
        } else {
          console.log('permissions not granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { currentSlideIndex, onChangeIndex } = this.props;
    if (currentSlideIndex !== prevState.currentSlideIndex) {
      this.setState({ currentSlideIndex }, () => onChangeIndex(this.state.currentSlideIndex));
    }
  }

  handleScrollIndexChanged = (index: number) => {
    this.setState({ currentSlideIndex: index }, () =>
      this.props.onChangeIndex(this.state.currentSlideIndex),
    );
  };

  renderItem = (slide: any) => {
    const { index, item } = slide;
    return (
      <OnboardingSliderItem
        key={index}
        index={index}
        title={item.title}
        description={item.description}
        descriptionSecondary={item.descriptionSecondary}
      />
    );
  };

  render() {
    let isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    const screenWidth = isTablet ? Metricstablet.screenWidth : Metrics.screenWidth;
    const itemWidth = isTablet ? screenWidth - Metricstablet.doubleMediumMargin : screenWidth - Metrics.doubleMediumMargin;
    const { currentSlideIndex } = this.state;
    return (
      <>
        <Carousel
          vertical={false}
          ref={this.carouselRef}
          firstItem={currentSlideIndex}
          data={this.slides}
          renderItem={this.renderItem}
          loop={false}
          itemWidth={itemWidth}
          sliderWidth={screenWidth}
          onScrollIndexChanged={this.handleScrollIndexChanged}
          containerCustomStyle={styles.carouselContainer}
        />
        <Pagination
          // @ts-ignore
          renderDots={(activeIndex: number) =>
            this.slides.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  // @ts-ignore: Property 'current' does not exist on type 'string | ((instance: Carousel<{ title: string; description: string; descriptionSecondary: string; } | { title: string; description: string; descriptionSecondary: null; }> | null) => void) | RefObject<...>'.
                  // Property 'current' does not exist on type 'string'
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

const regularStyles = StyleSheet.create({
  carouselContainer: { paddingBottom: Metrics.screenWidth < enums.Screen.WidthThreshold ? 60 : 80 },
  paginationContainer: {
    position: 'absolute',
    bottom: Metrics.screenWidth < enums.Screen.WidthThreshold ? -20 : 0,
    left: 0,
  },
  dot: {
    borderRadius: Metrics.dot,
    marginHorizontal: Metrics.smallMargin,
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
const scaledStyles = ScaledSheet.create({
  carouselContainer: { paddingBottom: Metrics.screenWidth < enums.Screen.WidthThreshold ? 60 : 80 },
  paginationContainer: {
    position: 'absolute',
    bottom: Metrics.screenWidth < enums.Screen.WidthThreshold ? -20 : 0,
    left: 0,
  },
  dot: {
    borderRadius: Metricstablet.dot,
    marginHorizontal: Metricstablet.smallMargin,
  },
  activeDot: {
    width: Metricstablet.activewDotWidth,
    height: Metricstablet.dot,
    backgroundColor: Colors.brown,
  },
  inactiveDot: {
    width: Metricstablet.dot,
    height: Metricstablet.dot,
    backgroundColor: Colors.lightBlue,
  },
});
