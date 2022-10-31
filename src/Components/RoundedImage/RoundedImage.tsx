import React from 'react';
import { StyleSheet, Image, StyleProp, ImageStyle } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';
import { Metrics, Metricstablet, Colors } from 'app/Theme';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

const RoundedImage = ({ uri, style }: Props) => {
  const isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  return <Image style={[styles.image, style]} source={{ uri }} />;
};

const regularStyles = StyleSheet.create({
  image: {
    width: Metrics.perfumeLogo,
    height: Metrics.perfumeLogo,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    borderRadius: Metrics.largeBorderRadius,
  },
});
const scaledStyles = ScaledSheet.create({
  image: {
    width: Metricstablet.perfumeLogo,
    height: Metricstablet.perfumeLogo,
    borderWidth: "1@ms",
    borderColor: Colors.lightBlue,
    borderRadius: Metricstablet.largeBorderRadius,
  },
});

export default React.memo(RoundedImage);
