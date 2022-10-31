import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import NavigationService from '../../Services/NavigationService';
import colors from '../../Theme/Colors';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from '../App';

/* import { useAppState } from 'react-native-hooks' */

function LoadingContainer(props: any) {
  useEffect(() => {
    const x = props.all;
    console.log(x);

    if (props.token && props.isAuthenticated) {
      return NavigationService.navigateAndReset('HomeStack');
    } else {
      return NavigationService.navigate('MainScreen');
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size={50} color={colors.main} />
    </SafeAreaView>
  );
}

function mapStateToProps(state: RootState) {
  return {
    all: state,
    token: state.token.token,
    isAuthenticated: state.user.user,
  };
}

export default connect(mapStateToProps)(LoadingContainer);
