import React, { useCallback, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from 'app/Components';
import * as types from 'app/Constants/types';
import { Route } from 'app/Navigators';
import { Colors, Metrics, Metricstablet, Fonts, FontsTablet } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';

interface Props {
  navigation: types.NavigationProp<Route.Dashboard, types.NavigationParams[Route.Dashboard]>;
}

const DashboardFooter = ({ navigation }: Props) => {
  const isTablet = DeviceInfo.isTablet();
  const styles = isTablet? scaledStyles : regularStyles;
  const handlePress = useCallback(() => navigation.navigate(Route.SelectStoryType), [navigation]);
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{translate('dashboardFooterTitle')}</Text>
        <Text style={styles.description}>{translate('dashboardFooterDescription')}</Text>
      </View>
      {isTablet?
        <Button secondary iconOnlyBig iconOnlyBigSize={30} onPress={handlePress} style={styles.button} />
        :
        <Button secondary iconOnlyBig onPress={handlePress} style={styles.button} />
      }
    </SafeAreaView>
  );
};

const regularStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.navyBlue,
    borderTopLeftRadius: Metrics.largeBorderRadius,
    borderTopRightRadius: Metrics.largeBorderRadius,
    paddingVertical: Metrics.mediumMargin,
    paddingHorizontal: Metrics.largeMargin,
  },
  textContainer: { flex: 0.7 },
  title: { ...Fonts.style.h2, color: Colors.greyScaleOne, marginBottom: 8 },
  description: { ...Fonts.style.normal, color: Colors.greyScaleFour },
  button: { top: 22 },
});
const scaledStyles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.navyBlue,
    borderTopLeftRadius: Metricstablet.largeBorderRadius,
    borderTopRightRadius: Metricstablet.largeBorderRadius,
    paddingVertical: Metricstablet.mediumMargin,
    paddingHorizontal: Metricstablet.largeMargin,
  },
  textContainer: { flex: 0.7 },
  title: { ...FontsTablet.style.h2, color: Colors.greyScaleOne, marginBottom: 8 },
  description: { ...FontsTablet.style.normal, color: Colors.greyScaleFour },
  button: { top: "22@ms"},
});

export default memo(DashboardFooter);
