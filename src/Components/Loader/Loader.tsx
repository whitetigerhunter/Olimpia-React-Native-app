import LottieView from 'lottie-react-native';
import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  fullHeight?: boolean;
}

const Loader = ({ style, fullHeight }: Props) => (
  <View style={[styles.loaderContainer, fullHeight && styles.fullHeight]}>
    <LottieView
      speed={0.5}
      style={[styles.animation, style]}
      source={require('app/Assets/Animations/lottie_animation.json')}
      autoPlay
      loop
    />
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 0.4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullHeight: {
    flex: 0.8,
  },
  animation: {
    width: '70%',
  },
});

export default Loader;
