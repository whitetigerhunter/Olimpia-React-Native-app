import React from 'react';
import { View, Text, Platform, Keyboard, NativeModules } from 'react-native';

import { Button, Picker } from 'app/Components';
import * as types from 'app/Constants/types';
import { Route } from 'app/Navigators';
import { translate } from 'app/translations';

import Checkbox from '../../Components/Checkbox';
import Input from '../../Components/Input/Input';
import { Colors } from '../../Theme';
import regularStyles from './Styles/RegisterStyles';
import scaledStyles from './Styles/RegisterStylesTablet';
import DeviceInfo from 'react-native-device-info';

import {
  validateEmail,
  validatePassword,
  validatePasswordStrength,
  validatePrenom,
  validateNom,
  validateCheckbox,
} from './Validation';

interface Props {
  loading: boolean;
  onAction: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    language: string,
    allergies?: string,
    interestedIn?: string,
    age?: string,
    gender?: string,
    skinType?: string,
  ) => void;
  user?: types.User;
  navigation:
    | types.NavigationProp<types.NavigationParams, Route.Register>
    | types.NavigationProp<types.NavigationParams, Route.Profile>;
}

interface State {
  errorMail: string;
  errorPassword: string;
  errorPrenom: string;
  errorNom: string;
  errorCheckbox: string;
  errorAllergies: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  allergies: string;
  language: string;
  country: string;
  interestedIn: string;
  age: string;
  gender: string;
  skinType: string;
}

class RegisterOrEditProfileForm extends React.PureComponent<Props, State> {
  prenom: any;
  mail: any;
  datepicker: any;
  checkbox: any;
  nom: any;
  password: any;
  allergies: any;

  constructor(props: Props) {
    super(props);
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    const user = this.props.user;
    this.state = {
      errorMail: '',
      errorPassword: '',
      errorPrenom: '',
      errorNom: '',
      errorCheckbox: '',
      errorAllergies: '',
      password: '',
      firstName: user ? user.first_name : '',
      lastName: user ? user.last_name : '',
      email: user ? user.email : '',
      allergies: user ? user.allergies : '',
      language:
        deviceLanguage && (deviceLanguage === 'en_US' || deviceLanguage === 'fr_FR')
          ? deviceLanguage.toString().split('_')[0]
          : 'en',
      country: '',
      interestedIn: user?.interested_in || '',
      age: user?.age || '',
      gender: user?.gender || '',
      skinType: user?.skin_type || '',
    };
  }

  componentDidUpdate() {
    if (this.props.user) {
      const { user, onAction } = this.props;
      const { firstName, lastName, email, allergies, interestedIn, age, gender, skinType } = this.state;
      if (
        (user && email !== user.email) ||
        firstName !== user?.first_name ||
        lastName !== user?.last_name ||
        allergies !== user?.allergies ||
        interestedIn !== user?.interested_in ||
        age !== user?.age ||
        gender !== user?.gender ||
        skinType !== user?.skin_type
      ) {
        onAction(
          email,
          firstName,
          lastName,
          allergies,
          interestedIn,
          age || undefined,
          gender || undefined,
          skinType || undefined,
        );
      }
    }
  }

  setCountry() {
    this.setState({ country: 'no Country' });
  }

  validate() {
    let valid = true;
    if (!validateEmail(this.mail.state.value)) {
      this.setState({ errorMail: 'Invalid email' });
      valid = false;
    } else {
      this.setState({ errorMail: '' });
    }
    if (!validatePassword(this.state.password) || !validatePasswordStrength(this.state.password)) {
      this.setState({ errorPassword: 'Invalid password' });
      valid = false;
    } else {
      this.setState({ errorPassword: '' });
    }
    if (!validatePrenom(this.prenom.state.value)) {
      this.setState({ errorPrenom: 'Invalid name' });
      valid = false;
    } else {
      this.setState({ errorPrenom: '' });
    }
    if (!validateNom(this.nom.state.value)) {
      this.setState({ errorNom: 'Invalid name' });
      valid = false;
    } else {
      this.setState({ errorNom: '' });
    }
    if (!validateCheckbox(this.checkbox.state.checked)) {
      this.setState({
        errorCheckbox: 'Please accept the User Terms',
      });
      valid = false;
    } else {
      this.setState({ errorCheckbox: '' });
    }
    return valid;
  }

  validateStyle() {
    if (!validatePasswordStrength(this.state.password)) {
      return { color: Colors.snow };
    }
  }

  validateStyle2() {
    if (!validatePassword(this.state.password)) {
      return { color: Colors.snow };
    }
  }

  handlePress = () => {
    const { email, firstName, lastName, password, language } = this.state;
    const valid = this.validate();
    if (valid) {
      this.props.onAction(email, firstName, lastName, password, language);
    }
  };

  handleAgeChange = (age: string) => this.setState({ age });

  handleSkinTypeChange = (skinType: string) => this.setState({ skinType });

  handleNavigateTerms = () => this.props.navigation.navigate(Route.Cgu);

  render() {
    const isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    const { loading, user } = this.props;
    const { email, firstName, lastName, allergies, interestedIn, age, gender, skinType } = this.state;
    console.log(this.state);
    return (
      <>
        <Input
          onSubmitEditing={this.nom?.focus}
          ref={(c: any) => {
            this.prenom = c;
          }}
          label={translate('firstName')}
          errorText={this.state.errorPrenom}
          autoCompleteType="name"
          textContentType="name"
          onChangeText={(firstName: string) => this.setState({ firstName })}
          value={firstName}
        />
        <Input
          onSubmitEditing={Keyboard.dismiss}
          ref={(c: any) => {
            this.nom = c;
          }}
          label={translate('lastName')}
          errorText={this.state.errorNom}
          autoCompleteType="username"
          textContentType="familyName"
          onChangeText={(lastName: string) => this.setState({ lastName })}
          value={lastName}
        />
        {user && (
          <>
            <Input
              containerStyle={styles.customInputContainerStyle}
              inputContainerStyle={styles.input}
              textStyle={styles.multilineInputText}
              multiline
              ref={(c: any) => {
                this.allergies = c;
              }}
              label={translate('allergies')}
              errorText={this.state.errorAllergies}
              value={allergies}
              onChangeText={(value: any) => this.setState({ allergies: value })}
            />
            <Text style={styles.label}>{translate('interestedIn')}</Text>
            <Picker
              value={interestedIn}
              onValueChange={(interestedIn) => this.setState({ interestedIn })}
              items={[
                { label: translate('malePerfumes'), value: 'male' },
                { label: translate('femalePerfumes'), value: 'female' },
                { label: translate('whoCares'), value: 'who_cares' },
              ]}
            />
          </>
        )}
        <Input
          onSubmitEditing={this.password?.focus}
          ref={(c: any) => {
            this.mail = c;
          }}
          keyboardType={'email-address'}
          label={translate('yourEmail')}
          errorText={this.state.errorMail}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          value={email}
          onChangeText={(value: { toString: () => string }) =>
            this.setState({ email: value.toString().toLowerCase().trim() })
          }
        />
        {user && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{translate('age')}</Text>
              <Picker
                value={age}
                onValueChange={this.handleAgeChange}
                items={[
                  { label: translate('noSelection'), value: '' },
                  { label: '16-24', value: '16-24' },
                  { label: '25-29', value: '25-29' },
                  { label: '30-39', value: '30-39' },
                  { label: '40-56', value: '40-56' },
                  { label: '57-75', value: '57-75' },
                  { label: '75+', value: '75+' },
                ]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{translate('genderDropdownLabel')}</Text>
              <Picker
                value={gender}
                onValueChange={(gender) => this.setState({ gender })}
                items={[
                  { label: translate('noSelection'), value: '' },
                  { label: translate('maleDropdown'), value: 'male' },
                  { label: translate('femaleDropdown'), value: 'female' },
                ]}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{translate('skinTypeDropdownLabel')}</Text>
              <Picker
                value={skinType}
                onValueChange={this.handleSkinTypeChange}
                items={[
                  { label: translate('noSelection'), value: '' },
                  { label: translate('drySkin'), value: 'dry' },
                  { label: translate('normalSkin'), value: 'normal' },
                  { label: translate('oilySkin'), value: 'oily' },
                  { label: translate('otherSkin'), value: 'other' },
                ]}
              />
            </View>
          </>
        )}
        {!user && (
          <>
            <View style={styles.inputContainer}>
              <Input
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                ref={(c: any) => {
                  this.password = c;
                }}
                password
                label={translate('password')}
                errorText={this.state.errorPassword}
                autoCapitalize="none"
                autoCompleteType="password"
                textContentType="newPassword"
                value={this.password}
                onChangeText={(password: string) => this.setState({ password })}
              />
            </View>
            <View style={styles.conditionsPwd}>
              <Text style={[styles.cond, this.validateStyle2()]}>
                {'\u2022'} {translate('8CharMin')}
              </Text>
              <Text style={[styles.cond2, this.validateStyle()]}>
                {'\u2022'} {translate('1SpecChar')}
              </Text>
            </View>
          </>
        )}

        {!user && (
          <>
            <Text style={styles.label}>{translate('TermsOfUse')}</Text>
            <View style={styles.checkboxContainer}>
              <View style={styles.view}>
                <View style={styles.checkboxHolder}>
                  {/* @ts-ignore */}
                  <Checkbox
                    //  @ts-ignore
                    ref={(c: any) => {
                      this.checkbox = c;
                    }}
                  />
                </View>
                <View style={styles.textHolder}>
                  <Text style={styles.cguText}> {translate('iAcceptTerms')} </Text>
                  <Text onPress={this.handleNavigateTerms} style={styles.cguLink}>
                    {translate('TermsOfUse')}
                  </Text>
                </View>
              </View>
            </View>
            {this.state.errorCheckbox ? (
              <Text style={[styles.topTen, { ...styles.checkboxError }]}>{this.state.errorCheckbox}</Text>
            ) : null}
            <View style={styles.buttonContainer}>
              <Button
                disabled={loading}
                style={styles.submitBtn}
                onPress={this.handlePress}
                text={translate('signUp')}
                secondary
              />
            </View>
          </>
        )}
      </>
    );
  }
}

export default RegisterOrEditProfileForm;
