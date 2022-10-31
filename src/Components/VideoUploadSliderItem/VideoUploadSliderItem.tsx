import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, FontsTablet, Typography, TypographyTablet } from 'app/Theme';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';

interface Props {
  text: string;
}

const VideoUploadSliderItem = ({ text }: Props) => (
  <View style={styles.slide}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default VideoUploadSliderItem;

const regularStyles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.greyScaleSix,
    ...Fonts.style.regularMedium,
    textAlign: 'center',
    lineHeight: Typography.mediumLineHeight,
  },
});
const scaledStyles = ScaledSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.greyScaleSix,
    ...FontsTablet.style.regularMedium,
    textAlign: 'center',
    lineHeight: TypographyTablet.mediumLineHeight,
  },
});
const isTablet = DeviceInfo.isTablet();
const styles = isTablet ? scaledStyles : regularStyles;
