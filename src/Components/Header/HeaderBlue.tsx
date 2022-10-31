import React, { PureComponent, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { withNavigation } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';

import { translate } from 'app/translations/translationHelpers';

import { Colors, Metrics, Metricstablet, Fonts, FontsTablet } from '../../Theme';
import Icons from './Icons';
import DeviceInfo from 'react-native-device-info';

export interface HeaderBlueProps {
  title?: string;
  navigation: NavigationStackProp;
  noMarginBottom?: boolean;
}

class HeaderBlue extends PureComponent<HeaderBlueProps> {
  static defaultProps: Partial<HeaderBlueProps> = {
    title: translate('headerBlueDefaultTitle'),
  };

  handleOnPressRightIcon = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { title, noMarginBottom } = this.props;
    let isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    return (
      <View style={[styles.header, noMarginBottom && styles.headerNoMargin]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightIconContainer}>
          {isTablet?
            <Icons color={Colors.greyScaleOne} size={40} onPress={this.handleOnPressRightIcon} name="x" />
            :
            <Icons color={Colors.greyScaleOne} onPress={this.handleOnPressRightIcon} name="x" />
          }
        </View>
      </View>
    );
  }
}

const regularStyles = StyleSheet.create({
  header: {
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    paddingHorizontal: Metrics.mediumMargin,
    backgroundColor: Colors.navyBlue,
    marginBottom: Metrics.largeMargin,
  },
  headerNoMargin: {
    marginBottom: 0,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: Colors.greyScaleOne,
    ...Fonts.style.headerTitle,
  },
  rightIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

const scaledStyles = ScaledSheet.create({
  header: {
    height: Metricstablet.navBarHeight,
    flexDirection: 'row',
    paddingHorizontal: Metricstablet.mediumMargin,
    backgroundColor: Colors.navyBlue,
    marginBottom: Metricstablet.largeMargin,
  },
  headerNoMargin: {
    marginBottom: 0,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: Colors.greyScaleOne,
    ...FontsTablet.style.headerTitle,
  },
  rightIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default withNavigation(memo(HeaderBlue));
