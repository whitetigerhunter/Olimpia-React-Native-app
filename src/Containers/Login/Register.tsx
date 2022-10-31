import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';

import { WhiteScreenTemplate } from 'app/Components';

import * as types from '../../Constants/types';
import { Route } from '../../Navigators';
import { translate } from '../../translations/translationHelpers';
import { RootState } from '../App';
import RegisterActions from './Redux/RegisterRedux';
import RegisterOrEditProfileForm from './RegisterOrEditProfileForm';

interface Props {
  navigation: types.NavigationProp<types.NavigationParams, Route.Register>;
  register: (payload: types.RegistrationPayload) => void;
}
interface State {
  loading: boolean;
}

class Register extends React.PureComponent<Props, State> {
  state = { loading: false };

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState({
      loading: nextProps.fetching,
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  handleRegister = (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    language: string,
  ) => {
    this.props.register({
      email,
      firstName,
      lastName,
      password,
      language,
    });
  };

  render() {
    return (
      <WhiteScreenTemplate canNavigateBack title={translate('signUp')}>
        <RegisterOrEditProfileForm
          loading={this.state.loading}
          onAction={this.handleRegister}
          navigation={this.props.navigation}
        />
      </WhiteScreenTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  fetching: state.register.fetching,
});

const mapDispatchToProps = {
  register: RegisterActions.registerRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
