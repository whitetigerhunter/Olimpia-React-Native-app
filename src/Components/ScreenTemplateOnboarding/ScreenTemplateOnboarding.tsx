import React from 'react';
import { ActivityIndicator, StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from 'app/Components';
import { Route } from 'app/Navigators';
import { Colors, Metrics, Metricstablet } from 'app/Theme';
import colors from 'app/Theme/Colors';

import * as types from '../../Constants/types';
import Header, { HeaderProps } from '../Header/HomeHeader';
import DeviceInfo from 'react-native-device-info';
import { ScaledSheet } from "react-native-size-matters";

interface Props {
  headerProps?: Partial<HeaderProps>;
  children: React.ReactNode;
  header?: React.ReactNode;
  isLoading?: boolean;
  navigation: types.NavigationProp<Route.NoteSelection, types.NavigationParams[Route.Onboarding]>;
  onButtonPress: () => void;
}

class ScreenTemplateOnboarding extends React.PureComponent<Props> {
  render() {
    let isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    const { headerProps, children, header, isLoading, onButtonPress } = this.props;
    return (
      <>
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
          <StatusBar backgroundColor={Colors.navyBlue} barStyle="light-content" translucent />
          <Header {...headerProps} />
          {header}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={50} color={colors.main} />
            </View>
          ) : (
            <>{children}</>
          )}
        </SafeAreaView>
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.bottomContainer}>
          <Button iconOnlyBig iconOnlyBigSize={isTablet?30:20} secondary style={styles.button} onPress={onButtonPress} />
        </SafeAreaView>
      </>
    );
  }
}

export default ScreenTemplateOnboarding;
const regularStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navyBlue,
    borderBottomLeftRadius: Metrics.xlargeBorderRadius,
    borderBottomRightRadius: Metrics.xlargeBorderRadius,
  },
  bottomContainer: {
    height: 64,
    backgroundColor: Colors.backgroundSecondary,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    bottom: Metrics.doubleMediumMargin,
    left: Metrics.onboardingButtonLeftMargin,
  },
});
const scaledStyles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navyBlue,
    borderBottomLeftRadius: Metricstablet.xlargeBorderRadius,
    borderBottomRightRadius: Metricstablet.xlargeBorderRadius,
  },
  bottomContainer: {
    height: "64@ms",
    backgroundColor: Colors.backgroundSecondary,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    bottom: Metrics.doubleMediumMargin,
    left: Metricstablet.onboardingButtonLeftMargin,
  },
});

