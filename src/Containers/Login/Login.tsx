import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React from 'react';
import { BackHandler, Keyboard, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import Logo from 'app/Assets/Images/logo.svg';
import Name from 'app/Assets/Images/name.svg';
import { Button, WhiteScreenTemplate } from 'app/Components';
import Input from 'app/Components/Input/Input';
import LinkText from 'app/Components/Link';
import * as types from 'app/Constants/types';
import LoginAppleActions from 'app/Containers/Login/Redux/LoginAppleRedux';
import LoginGoogleActions from 'app/Containers/Login/Redux/LoginGoogleRedux';
import { Route } from 'app/Navigators';
import { CrashlyticsService } from 'app/Services';
import AlertActions from 'app/State/AlertRedux';
import { Colors } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

import { RootState } from '../App';
import LoginActions from './Redux/LoginRedux';
import regularStyles from './Styles/LoginStyles';
import scaledStyles from './Styles/LoginTabletStyles';
import { validateEmail, validatePassword } from './Validation';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
interface Props {
  navigation: types.NavigationProp<types.NavigationParams, Route.Login>;
  login: (credentials: { email: string; password: string }) => void;
  authenticateWithApple: (accessToken: string) => void;
  authenticateWithGoogle: (accessToken: string) => void;
  authenticateWithFacebook: (accessToken: string) => void;
  alert: (content: { title: string; description: string }) => void;
}

interface State {
  errorMail: string;
  errorPassword: string;
  loading: boolean;
  email: string;
  password: string;
  isSigninInProgress: boolean;
}

class Login extends React.PureComponent<Props, State> {
  state = {
    errorMail: '',
    errorPassword: '',
    loading: false,
    email: '',
    password: '',
    isSigninInProgress: false,
  };

  modal: any;
  mail: any;
  password: any;

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    {
      return (
        Platform.OS === 'ios' &&
        appleAuth.onCredentialRevoked(async () => {
          console.warn('If this function executes, User Credentials have been Revoked');
        })
      );
    }
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

  submit = () => {
    // validation
    this.setState({ loading: true });
    if (!validateEmail(this.mail.state.value.toLowerCase().trim())) {
      this.setState({
        errorMail: 'Invalid Email',
      });
    } else {
      this.setState({
        errorMail: '',
      });
    }
    if (!validatePassword(this.password.state.value)) {
      this.setState({
        errorPassword: 'Invalid Password',
      });
    } else {
      this.setState({
        errorPassword: '',
      });
    }
    const credentials = {
      email: this.mail.state.value.toLowerCase().trim(),
      password: this.password.state.value,
    };
    this.props.login(credentials);
  };

  handleRegisterRedirect = () => this.props.navigation.navigate(Route.Register);

  handleAuthenticateWithGoogle = async () => {
      console.log('handleAuthenticateWithGoogle async');
    try {
      await GoogleSignin.hasPlayServices();
      const isSignedIn = await GoogleSignin.isSignedIn();
      console.log('User is already signed in:', isSignedIn);
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      const res = await GoogleSignin.getTokens();
      console.log('GoogleSignin.getTokens', res);
      console.log('authenticateWithGoogle - Token', res.accessToken);
      this.props.authenticateWithGoogle(res.accessToken);

    } catch (error) {

      console.log('handleAuthenticateWithGoogle catch', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        CrashlyticsService.logError(error, 'GOOGLE_OUTH_SIGN_IN_CANCELLED_ERROR');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        CrashlyticsService.logError(error, 'GOOGLE_OUTH_SIGN_IN_PROGRESS_ALREADY_ERROR');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.props.alert({
          title: translate('googleAuthErrorTitle'),
          description: translate('enablePlayServices'),
        });
        CrashlyticsService.logError(
          error,
          'GOOGLE_OUTH_SIGN_IN_PLAY_SERVICES_NOT_AVAILABLE_OR_OUTDATED_ERROR',
        );
      } else {
        CrashlyticsService.logError(error, 'GOOGLE_OUTH_SIGN_IN_OTHER_ERROR');
      }
    }
  };

  handleAuthenticateWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        this.props.authenticateWithApple(appleAuthRequestResponse.authorizationCode as string);
      }
    } catch (error) {
      CrashlyticsService.logError(error, 'APPLE_SIGN_IN_ERROR');
    }
  };

  render() {
    const { email, password, errorMail, errorPassword } = this.state;
    let isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    return (
      <WhiteScreenTemplate title={translate('login')}>
        <View style={styles.headerContainer}>
          <Logo width={'100%'} height={'50%'} />
          <Name width={'100%'} height={'50%'} />
        </View>
        <View style={styles.Footer}>
          <Input
            ref={(c: any) => {
              this.mail = c;
            }}
            onSubmitEditing={() => this.password.focus()}
            keyboardType={'email-address'}
            label={translate('yourEmail')}
            placeholder="test@test.com"
            autoCapitalize="none"
            autoCorrect={false}
            errorText={errorMail}
            helperText="Pay attention to email's format"
            autoCompleteType="email"
            textContentType="emailAddress"
            value={email}
            onChangeText={(email: string) => this.setState({ email })}
          />
          <Input
            ref={(c: any) => {
              this.password = c;
            }}
            onSubmitEditing={() => Keyboard.dismiss()}
            password
            label={translate('password')}
            errorText={errorPassword}
            autoCapitalize="none"
            autoCompleteType="password"
            textContentType="password"
            value={password}
            onChangeText={(password: string) => this.setState({ password })}
          />
          <Button
            disabled={this.state.loading}
            secondary
            style={styles.submitBtn}
            onPress={this.submit}
            text={translate('login')}
          />
          <Button
            secondary
            iconAuthName="google"
            iconColor={Colors.greyScaleOne}
            style={styles.submitBtn}
            onPress={this.handleAuthenticateWithGoogle}
            disabled={this.state.isSigninInProgress}
            text={translate('signInWithGoogle')}
          />
          {Platform.OS === 'ios' && (
            <Button
              secondary
              iconAuthName="apple"
              iconColor={Colors.greyScaleOne}
              style={styles.submitBtn}
              onPress={this.handleAuthenticateWithApple}
              text={translate('signInWithApple')}
            />
          )}
          <LinkText
            onPress={() => this.props.navigation.navigate('ResetPassword')}
            textStyle={styles.linkText}
          >
            {translate('forgotPassword')}
          </LinkText>
          <LinkText onPress={this.handleRegisterRedirect} textStyle={styles.linkText}>
            {translate('goToRegister')}
          </LinkText>
        </View>
      </WhiteScreenTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  fetching: state.login.fetching,
});

const mapDispatchToProps = {
  login: LoginActions.loginRequest,
  authenticateWithGoogle: LoginGoogleActions.loginGoogleRequest,
  authenticateWithApple: LoginAppleActions.loginAppleRequest,
  alert: AlertActions.alertRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
