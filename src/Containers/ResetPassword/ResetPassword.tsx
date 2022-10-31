import React from 'react';
import { BackHandler, View, Keyboard, Alert, Text } from 'react-native';
import { connect } from 'react-redux';

import { Button, WhiteScreenTemplate } from 'app/Components';
import { translate } from 'app/translations/translationHelpers';

import Input from '../../Components/Input/Input';
import * as types from '../../Constants/types';
import { Route } from '../../Navigators';
import { RootState } from '../App';
import { validateEmail } from '../Login/Validation';
import RequestResetPasswordActions from './Redux/RequestPasswordRedux';
import regularStyles from './styles';
import scaledStyles from './stylesTablet';
import DeviceInfo from 'react-native-device-info';

interface Props {
  navigation: types.NavigationProp<Route.Login, types.NavigationParams[Route.Login]>;
  resetPassword: (email: string) => void;
}

interface State {
  loading: boolean;
  errorMail: string;
  email: string;
}

class ResetPassword extends React.PureComponent<Props, State> {
  state = {
    loading: false,
    errorMail: '',
    email: '',
  };

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  submit = () => {
    // validation
    this.setState({ loading: true });
    const { email } = this.state;
    if (!validateEmail(email.toLowerCase().trim())) {
      this.setState({
        errorMail: 'Invalid Email',
      });
    } else {
      this.setState({
        errorMail: '',
      });
      //@ts-ignore: Argument of type '{ email: any; }' is not assignable to parameter of type 'string'.ts(2345)
      this.props.resetPassword({ email });
      Alert.alert('An email was sent to your address with the following instructions !');
      this.props.navigation.goBack();
    }
    this.setState({ loading: false });
  };

  render() {
    let isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    return (
      <WhiteScreenTemplate title={translate('resetPassword')} canNavigateBack>
        <Text style={styles.modalText}>
          {translate('forgotPasswordModalText1')} {'\n'}
          {translate('forgotPasswordModalText2')}
        </Text>
        <View style={styles.Footer}>
          <Input
            onSubmitEditing={Keyboard.dismiss}
            placeholder="test@test.com"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType={'email-address'}
            label={translate('yourEmail')}
            errorText={this.state.errorMail}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={(email: string) => this.setState({ email, errorMail: '' })}
          />
          <Button
            disabled={this.state.loading}
            style={styles.submitBtn}
            onPress={this.submit}
            secondary
            text={translate('resetPassword')}
          />
        </View>
      </WhiteScreenTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  fetching: state.login.fetching,
});

const mapDispatchToProps = {
  resetPassword: RequestResetPasswordActions.requestResetPasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
