import React from 'react';
import { StyleSheet } from 'react-native';

import { ScreenTemplateOnboarding, OnboardingSlider } from 'app/Components';
import { Route } from 'app/Navigators';
import { Colors } from 'app/Theme';

import * as types from '../../Constants/types';

interface Props {
  navigation: types.NavigationProp<Route.NoteSelection, types.NavigationParams[Route.Onboarding]>;
}

interface State {
  currentSlideIndex: number;
}

const LAST_SLIDE_INDEX = 4;
export default class Onboarding extends React.PureComponent<Props, State> {
  state = { currentSlideIndex: 0 };

  handleButtonPress = () => {
    this.setState({ currentSlideIndex: this.state.currentSlideIndex + 1 }, () => {
      if (this.state.currentSlideIndex == LAST_SLIDE_INDEX) {
        this.setState({ currentSlideIndex: 0 });
        this.props.navigation.navigate(Route.Login);
      }
    });
  };

  handleChangeIndex = (currentSlideIndex: number) => this.setState({ currentSlideIndex });

  render() {
    return (
      <ScreenTemplateOnboarding
        onButtonPress={this.handleButtonPress}
        headerProps={{
          showRightIcon: false,
          showLeftIcon: false,
          style: styles.background,
          showLogo: true,
          showSkip: true,
        }}
        navigation={this.props.navigation}
      >
        <OnboardingSlider
          currentSlideIndex={this.state.currentSlideIndex}
          onChangeIndex={this.handleChangeIndex}
          navigation={this.props.navigation}
        />
      </ScreenTemplateOnboarding>
    );
  }
}

const styles = StyleSheet.create({
  background: { backgroundColor: Colors.navyBlue },
});
