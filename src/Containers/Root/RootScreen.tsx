import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import Alert from 'app/Components/Alert/Alert';
import AppNavigator from 'app/Navigators/AppNavigator';
import NavigationService from 'app/Services/NavigationService';
import { Helpers } from 'app/Theme';

import { RootState } from '../App';

interface Props {
  alert: any;
}

class RootScreen extends Component<Props> {
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.alert.show) {
      Alert(nextProps.alert.content);
    }
  }

  render() {
    return (
      <View style={Helpers.fill}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={false}
        />
        <AppNavigator ref={NavigationService.setTopLevelNavigator} />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(RootScreen);
