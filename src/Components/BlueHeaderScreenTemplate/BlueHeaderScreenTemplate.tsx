import React from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { Loader } from 'app/Components';
import HeaderBlue from 'app/Components/Header/HeaderBlue';
import { Colors, Metrics, Metricstablet } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';

interface Props {
  screenTitle: string;
  statusBarType?: null | StatusBarStyle;
  isLoading?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export class BlueHeaderScreenTemplate extends React.PureComponent<Props> {
  render() {
    const isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    const { screenTitle, isLoading, footer, statusBarType, children } = this.props;
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View style={styles.mainContainer}>
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
              <StatusBar
                backgroundColor={Colors.navyBlue}
                barStyle={statusBarType ? statusBarType : 'dark-content'}
                translucent
              />
              <HeaderBlue title={screenTitle} noMarginBottom />
            </SafeAreaView>
            <KeyboardAvoidingView
              style={styles.contentContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={insets ? -insets?.bottom : 0}
            >
              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <Text style={styles.text}>{translate('tellUs')}</Text>
                {isLoading ? <Loader fullHeight /> : children}
              </ScrollView>
              <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.footer}>
                {footer}
              </SafeAreaView>
            </KeyboardAvoidingView>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

export default BlueHeaderScreenTemplate;

const regularStyles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.navyBlue, flex: 1 },
  container: {
    backgroundColor: Colors.navyBlue,
  },
  contentContainer: {
    flexGrow: 1,
    borderTopLeftRadius: Metrics.panelBorderRadius,
    borderTopRightRadius: Metrics.panelBorderRadius,
    backgroundColor: Colors.backgroundPrimary,
  },
  footer: {
    padding: Metrics.mediumMargin,
    borderTopLeftRadius: Metrics.largeBorderRadius,
    borderTopRightRadius: Metrics.largeBorderRadius,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.greyScaleTwo,
  },
  text: {
    paddingBottom: 8,
    paddingTop: 26,
    paddingHorizontal: 16,
    textAlign: 'center',
    color: Colors.blue,
  },
});
const scaledStyles = ScaledSheet.create({
  mainContainer: { backgroundColor: Colors.navyBlue, flex: 1 },
  container: {
    backgroundColor: Colors.navyBlue,
  },
  contentContainer: {
    flexGrow: 1,
    borderTopLeftRadius: Metricstablet.panelBorderRadius,
    borderTopRightRadius: Metricstablet.panelBorderRadius,
    backgroundColor: Colors.backgroundPrimary,
  },
  footer: {
    padding: Metricstablet.mediumMargin,
    borderTopLeftRadius: Metricstablet.largeBorderRadius,
    borderTopRightRadius: Metricstablet.largeBorderRadius,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.greyScaleTwo,
  },
  text: {
    paddingBottom: "8@ms",
    paddingTop: "26@ms",
    paddingHorizontal: "16@ms",
    textAlign: 'center',
    fontSize:"16@ms",
    color: Colors.blue,
  },
});
