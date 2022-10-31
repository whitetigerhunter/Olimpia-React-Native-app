import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import regularStyles from './HeaderStyles';
import scaledStyles from './HeaderTabletStyles';
import Icons from './Icons';
import DeviceInfo from 'react-native-device-info';

interface Props {
  title: string;
  leftIcon: boolean;
  leftIconName?: string;
  onPressLeftIcon?: () => void;
}
class HeaderRegister extends PureComponent<Props> {
  static defaultProps: Props;
  render() {
    const { leftIcon } = this.props;
    let isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    return (
      <View style={styles.header}>
        {!!leftIcon && (
          <View style={styles.bars}>
            <Icons onPress={this.props.onPressLeftIcon} name={this.props.leftIconName || 'chevron-left'} />
          </View>
        )}
        <View style={styles.titleContainer}>
          <Text allowFontScaling numberOfLines={1} style={styles.sectionText1}>
            {this.props.title?.toUpperCase()}
          </Text>
        </View>
        {!!leftIcon && <View style={styles.shop} />}
      </View>
    );
  }
}

export default HeaderRegister;
