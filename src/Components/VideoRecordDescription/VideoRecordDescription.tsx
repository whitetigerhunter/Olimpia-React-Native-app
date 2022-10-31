import React, { memo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Metrics, Metricstablet, Colors, Fonts, FontsTablet } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';
interface Props {
  style?: StyleProp<ViewStyle>;
}

const VideoRecordDescription = ({ style }: Props) => {
  let isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  return (
    <View style={[styles.descriptionContainer, style]}>
      <Text style={styles.descriptionTitle}>{translate('videoRecordDescriptionTitle')}</Text>
      <Text style={styles.descriptionText}>{translate('videoRecordDescriptionText')}</Text>
    </View>
  );
};

export default memo(VideoRecordDescription);

const regularStyles = StyleSheet.create({
  descriptionContainer: {
    backgroundColor: Colors.videoRecordDecriptionBackground,
    paddingVertical: 20,
    paddingHorizontal: Metrics.mediumMargin,
    borderRadius: Metrics.largeBorderRadius,
  },
  descriptionTitle: {
    ...Fonts.style.headerSmallerBlack,
    color: Colors.greyScaleOne,
    paddingBottom: Metrics.smallerMargin,
  },
  descriptionText: {
    ...Fonts.style.normal,
    color: Colors.greyScaleOne,
  },
});
const scaledStyles = ScaledSheet.create({
  descriptionContainer: {
    backgroundColor: Colors.videoRecordDecriptionBackground,
    paddingVertical: "20@ms",
    paddingHorizontal: Metricstablet.mediumMargin,
    borderRadius: Metricstablet.largeBorderRadius,
  },
  descriptionTitle: {
    ...FontsTablet.style.headerSmallerBlack,
    color: Colors.greyScaleOne,
    paddingBottom: Metricstablet.smallerMargin,
  },
  descriptionText: {
    ...FontsTablet.style.normal,
    color: Colors.greyScaleOne,
  },
});

