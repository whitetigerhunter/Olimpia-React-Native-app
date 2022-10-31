import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';

import { RootState } from '../Containers/App';
import AppNavigation from './AppNavigator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// here is our redux-aware smart component
function ReduxNavigation(props: any) {
  const { dispatch, nav } = props;
  //@ts-ignore
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav,
  });

  return <AppNavigation navigation={navigation} />;
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
