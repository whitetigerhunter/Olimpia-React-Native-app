/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import AppName from 'app/Assets/Images/app_name.svg';
import LogoSmall from 'app/Assets/Images/logo_small.svg';
import { Image } from 'app/Components';
import * as types from 'app/Constants/types';
import { RootState } from 'app/Containers/App';
import { Route } from 'app/Navigators';
import NavigationService from 'app/Services/NavigationService';
import { translate } from 'app/translations/translationHelpers';

import { Colors } from '../../Theme';
import regularStyles from './HeaderStyles';
import scaledStyles from './HeaderTabletStyles';
import DeviceInfo from 'react-native-device-info';
import Icons from './Icons';

export interface HeaderProps {
  title?: string;
  leftIconName?: string;
  rightIconName?: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  rightIcon?: React.ReactNode;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  avatar?: string;
  user: types.User;
  navigation: NavigationStackProp;
  style?: StyleProp<ViewStyle>;
  showLogo?: boolean;
  showSkip?: boolean;
}

class Header extends PureComponent<HeaderProps> {
  static defaultProps: Partial<HeaderProps> = {
    title: '',
    leftIconName: 'menu',
    rightIconName: 'perm-identity',
    onPressLeftIcon: () => null,
    showLeftIcon: true,
    showRightIcon: true,
    showLogo: false,
    showSkip: false,
  };

  toggleSideMenu() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  handleOnPressRightIcon = () => {
    const { navigation, user } = this.props;
    navigation.navigate(Route.Profile, { userId: user.id, oldUser: null });
  };

  handleOnPressSkipButton = () => this.props.navigation.navigate(Route.Login);

  render() {
    const {
      showLeftIcon,
      leftIconName,
      showLogo,
      showSkip,
      title,
      showRightIcon,
      avatar,
      rightIconName,
      onPressLeftIcon,
      onPressRightIcon,
      rightIcon,
    } = this.props;
    let isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.bars}>
          {showLeftIcon && (
            isTablet?
            <Icons
              onPress={leftIconName === 'menu' ? this.toggleSideMenu.bind(this) : onPressLeftIcon}
              name={leftIconName}
              color={Colors.greyScaleSix}
              size={45}
            />
            :
            <Icons
              onPress={leftIconName === 'menu' ? this.toggleSideMenu.bind(this) : onPressLeftIcon}
              name={leftIconName}
              color={Colors.greyScaleSix}
            />
          )}
          {showLogo && (
            isTablet?
            <View style={styles.row}>
              <LogoSmall width={60} minHeight={70} />
              <AppName width={150} minHeight={70} style={styles.appName} />
            </View>
            :
            <View style={styles.row}>
                <LogoSmall />
                <AppName style={styles.appName} />
            </View>
          )}
        </View>
        {!!title && (
          <View style={styles.titleContainer}>
            <Text style={styles.sectionText1}>{title}</Text>
          </View>
        )}

        <View style={styles.shop}>
          {showRightIcon && (
            <Icons
              color={Colors.blue}
              onPress={onPressRightIcon || this.handleOnPressRightIcon}
              name={rightIconName}
            />
          )}
          {rightIcon}
          {!!avatar && (
            <TouchableOpacity activeOpacity={0.8} onPress={() => NavigationService.navigate(Route.Profile)}>
              <Image style={styles.avatar} source={{ uri: avatar }} />
            </TouchableOpacity>
          )}
          {showSkip && (
            <TouchableOpacity style={styles.skipButton} onPress={this.handleOnPressSkipButton}>
              <Text style={styles.skipButtonText}>{translate('skip')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(withNavigation(Header));
