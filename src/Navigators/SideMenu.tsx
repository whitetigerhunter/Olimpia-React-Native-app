import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import * as types from 'app/Constants/types';
import { Route } from 'app/Navigators';
import { CrashlyticsService } from 'app/Services';
import TokenActions from 'app/State/TokenRedux';
import UserActions from 'app/State/UserRedux';

import Logo from '../Assets/Images/logo.svg';
import RatingModal from '../Components/RatingModal/RatingModal';
import { Colors, Fonts, FontsTablet, Metrics, Metricstablet } from '../Theme';
import { translate } from '../translations/translationHelpers';
import DeviceInfo from 'react-native-device-info';
import { ScaledSheet } from "react-native-size-matters";

interface Props {
  user: types.User;
  logout: () => void;
  resetUser: () => void;
  navigation: any;
}

interface State {
  selected: number;
  showFeedbackModal: boolean;
}
class SideMenu extends React.PureComponent<Props, State> {
  state = {
    selected: 0,
    showFeedbackModal: false,
  };
  
  onButtonPress(selected: number) {
    this.setState({ selected });
    this.navigate(selected);
  }

  getBarStyle(selected: number, selectedState: number) {
    if (selected === selectedState) {
      return styles.selectedBar;
    }
    return styles.unSelectedBar;
  }

  getStyle(selected: number, selectedState: number) {
    if (selected === selectedState) {
      return styles.selectedView;
    }
    return styles.navSectionStyle;
  }

  getTextStyle(selected: number, selectedState: number) {
    if (selected === selectedState) {
      return styles.selectedText;
    }
    return styles.navItemStyle;
  }

  getIconColor(selected: number, selectedState: number) {
    if (selected === selectedState) {
      return Colors.blue;
    }
    return Colors.blue;
  }

  reset() {
    this.props.logout();
    this.props.resetUser();
    AsyncStorage.removeItem('text');
    AsyncStorage.removeItem('videoURL');
    this.props.navigation.navigate('MainScreen');
    this.googleOauthSignOut();
  }

  googleOauthSignOut = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      try {
        await GoogleSignin.signOut();
      } catch (error) {
        CrashlyticsService.logError(error, 'GOOGLE_OUTH_SIGN_OUT_ERROR');
      }
    }
  };

  resetState() {
    this.setState({ selected: 0 });
  }

  navigate(selected: number) {
    if (selected === 0) {
      this.props.navigation.navigate(Route.Dashboard);
    } else if (selected === 1) {
      this.props.navigation.navigate(Route.NoteSelection);
    } else if (selected === 2) {
      this.props.navigation.navigate(Route.Perfumes);
    } else if (selected === 3) {
      this.props.navigation.navigate('Profile', { userId: this.props.user.id, oldUser: null });
    } else if (selected === 4) {
      this.props.navigation.navigate(Route.Selections);
    } else if (selected === 6) {
      this.props.navigation.navigate(Route.MyCollection);
    }
  }

  handleShowFeedbackModal = () => this.setState({ showFeedbackModal: true });

  hideFeedbackModal = () => this.setState({ showFeedbackModal: false });

  shareAppLinks = async () => {
    const shareOptions = {
      title: 'O My Note',
      message: translate('shareAppLinks'),
      urls: [
        'https://play.google.com/store/apps/details?id=io.omynote',
        'https://apps.apple.com/fr/app/o-my-note-perfume-advisor/id1561737457',
      ],
    };

    Share.open(shareOptions)
      .then((res) => {
        console.log('RES_SHARE_LINKS', res);
      })
      .catch((err) => {
        console.log('ERR_SHARE_LINKS', err);
      });
  };

  render() {
    const { selected, showFeedbackModal } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.white,
            //  alignItems: 'center',
          }}
        >
          {/* @ts-ignore */}
          <View style={{ ...styles.drawerHeader, height: 40, padding: 5 }}>
            <Logo style={styles.headerBackground} width={'100%'} height={'100%'} />
          </View>
          <View style={{ flex: 2.5 }}>
            {/* @ts-ignore */}
            <TouchableOpacity onPress={() => this.onButtonPress(0)} style={this.getStyle(0, selected)}>
              <View style={this.getBarStyle(0, selected)} />
              <Text style={this.getTextStyle(0, selected)}> {translate('dashboard')}</Text>
              <Icon style={styles.Icon} size={isTablet?30:20} name="home" color={this.getIconColor(0, selected)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onButtonPress(6)} style={this.getStyle(1, selected)}>
              <View style={this.getBarStyle(6, selected)} />
              <Text style={this.getTextStyle(6, selected)}> {translate('favorites')}</Text>
              <Icon style={styles.Icon} size={isTablet?30:20} name="favorite" color={this.getIconColor(1, selected)} />
            </TouchableOpacity>
            {/* @ts-ignore */}
            <TouchableOpacity onPress={() => this.onButtonPress(3)} style={this.getStyle(3, selected)}>
              <View style={this.getBarStyle(3, selected)} />
              <Text style={this.getTextStyle(3, selected)}> {translate('profile')}</Text>
              <Icon
                style={styles.Icon}
                size={isTablet?30:20}
                name="perm-identity"
                color={this.getIconColor(3, selected)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onButtonPress(4)}
              //@ts-ignore
              style={this.getStyle(4, selected)}
            >
              <View style={this.getBarStyle(4, selected)} />
              <Text style={this.getTextStyle(4, selected)}> {translate('personalizedRecipes')}</Text>
            </TouchableOpacity>
            {/* @ts-ignore */}
            <TouchableOpacity onPress={this.shareAppLinks} style={this.getStyle(5, selected)}>
              <View style={this.getBarStyle(5, selected)} />
              <Text style={this.getTextStyle(5, selected)}> {translate('share')}</Text>
              <Icon style={styles.Icon} size={isTablet?30:20} name="share" color={this.getIconColor(5, selected)} />
            </TouchableOpacity>
            {/* @ts-ignore */}
            <TouchableOpacity style={styles.navSectionStyle} onPress={this.handleShowFeedbackModal}>
              <View style={styles.unSelectedBar} />
              <Text style={styles.navItemStyle}> {translate('giveUsFeedback')}</Text>
            </TouchableOpacity>
            <RatingModal show={showFeedbackModal} onHideModal={this.hideFeedbackModal} />
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.btnView} onPress={() => this.reset()}>
              <Text style={styles.btnText}>{translate('logout')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}



const regularStyles = StyleSheet.create({
  headerBackground: {
    resizeMode: 'stretch',
    position: 'absolute',
    height: Metrics.screenHeight / 7,
    width: Metrics.screenWidth / 3,
  },
  navSectionStyle: {
    height: Metrics.screenHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedView: {
    backgroundColor: Colors.opacity,
    height: Metrics.screenHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItemStyle: {
    marginLeft: 20,
    ...Fonts.style.normal,
    fontSize: Fonts.size.xsmall,
    flex: 0.8,
    color: Colors.blue,
  },
  selectedText: {
    marginLeft: 20,
    ...Fonts.style.normal,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: Colors.blue,
    flex: 0.8,
  },
  selectedBar: {
    height: '100%',
    width: '2%',
    backgroundColor: Colors.main,
  },
  unSelectedBar: {
    height: '100%',
    width: '2%',
    backgroundColor: Colors.backgroundSecondary,
    opacity: 0,
  },
  drawerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    flex: 0.2,
  },
  btnView: {
    height: Metrics.baseMargin * 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
  },
  btnText: {
    alignSelf: 'center',
    paddingVertical: 10,
    marginRight: 15,
    ...Fonts.style.regularMedium,
    color: Colors.greyScaleSix,
  },
});

const scaledStyles = ScaledSheet.create({
  headerBackground: {
    resizeMode: 'stretch',
    position: 'absolute',
    height: Metricstablet.screenHeight / 7,
    width: Metricstablet.screenWidth / 3,
  },
  navSectionStyle: {
    height: Metricstablet.screenHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedView: {
    backgroundColor: Colors.opacity,
    height: Metricstablet.screenHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItemStyle: {
    marginLeft: "20@ms",
    ...FontsTablet.style.normal,
    fontSize: FontsTablet.sizeTablet.regular,
    flex: 1,
    color: Colors.blue,
  },
  selectedText: {
    marginLeft: "20@ms",
    ...FontsTablet.style.normal,
    fontSize: FontsTablet.sizeTablet.regular,
    fontWeight: 'bold',
    color: Colors.blue,
    flex: 1,
  },
  selectedBar: {
    height: '100%',
    width: '2%',
    backgroundColor: Colors.main,
  },
  unSelectedBar: {
    height: '100%',
    width: '2%',
    backgroundColor: Colors.backgroundSecondary,
    opacity: 0,
  },
  drawerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    flex: 0.2,
  },
  btnView: {
    height: Metricstablet.baseMargin * 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
  },
  btnText: {
    alignSelf: 'center',
    paddingVertical: "10@ms",
    marginRight: '15@ms',
    ...FontsTablet.style.regularMedium,
    color: Colors.greyScaleSix,
  },
});
const isTablet = DeviceInfo.isTablet();
const styles = isTablet ? scaledStyles : regularStyles;
const mapStateToProps = (state: { user: { user: any } }) => ({
  /* fetching: state.login.fetching, */
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(TokenActions.removeToken()),
  resetUser: () => dispatch(UserActions.removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
