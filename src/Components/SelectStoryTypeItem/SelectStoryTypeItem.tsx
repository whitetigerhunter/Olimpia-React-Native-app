import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Button } from 'app/Components';
import { Colors, Metrics, Metricstablet, Fonts, FontsTablet } from 'app/Theme';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';

interface Props {
  type: string;
  iconName: string;
  text: string;
  onSelect: (type: string) => void;
}

const SelectStoryTypeItem = ({ type, iconName, text, onSelect }: Props) => {
  const isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  const handlePress = () => onSelect(type);
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Button
        primary
        iconOnlyBig
        iconName={iconName}
        iconOnlyBigSize={isTablet?45:20}
        style={styles.button}
        onPress={handlePress}
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const regularStyles = StyleSheet.create({
  container: {
    height: Metrics.selectStoryTypeItemHeight,
    width: Metrics.selectStoryTypeItemWidth,
    backgroundColor: Colors.greyScaleOne,
    borderRadius: Metrics.largeBorderRadius,
    alignItems: 'center',
    paddingTop: Metrics.largeMargin,
    marginBottom: Metrics.mediumMargin,
  },
  text: {
    color: Colors.greyScaleSix,
    ...Fonts.style.regularMedium,
    width: '72%',
    textAlign: 'center',
  },
  button: {
    marginBottom: Metrics.largeMargin,
  },
});
const scaledStyles = ScaledSheet.create({
  container: {
    height: Metricstablet.selectStoryTypeItemHeight,
    width: Metricstablet.selectStoryTypeItemWidth,
    backgroundColor: Colors.greyScaleOne,
    borderRadius: Metricstablet.largeBorderRadius,
    alignItems: 'center',
    paddingTop: Metricstablet.largeMargin,
    margin: Metricstablet.smallMargin,
  },
  text: {
    color: Colors.greyScaleSix,
    ...FontsTablet.style.regularMedium,
    width: '72%',
    textAlign: 'center',
  },
  button: {
    marginBottom: Metricstablet.largeMargin,
    width: 135,
    height: 135,
  },
});

export default memo(SelectStoryTypeItem);
