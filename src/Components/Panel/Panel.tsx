import React, { ReactNode, memo } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import { Loader } from 'app/Components';
import { Colors, Metrics, Metricstablet } from 'app/Theme';
import DeviceInfo from 'react-native-device-info';
import { ScaledSheet } from "react-native-size-matters";

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}


const Panel = ({ children, style, isLoading }: Props) => (
  <View style={[styles.panel, style]}>{isLoading ? <Loader fullHeight /> : children}</View>
);

const regularStyles = StyleSheet.create({
  panel: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: Metrics.panelBorderRadius,
    borderTopRightRadius: Metrics.panelBorderRadius,
    borderWidth: 1,
    borderColor: Colors.greyScaleTwo,
    height: '100%',
  },
});
const scaledStyles = ScaledSheet.create({
  panel: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: Metricstablet.panelBorderRadius,
    borderTopRightRadius: Metricstablet.panelBorderRadius,
    borderWidth: 1,
    borderColor: Colors.greyScaleTwo,
    height: '100%',
  },
});
let isTablet = DeviceInfo.isTablet();
const styles = isTablet ? scaledStyles : regularStyles;

export default memo(Panel);
