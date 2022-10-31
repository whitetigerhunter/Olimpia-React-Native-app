import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import Name from '../../Assets/Images/name.svg';
import HeaderRegister from '../../Components/Header/HeaderRegister';
import { Colors, Metrics } from '../../Theme';
// @ts-ignore
// Styles
import { translate } from '../../translations/translationHelpers';
import styles from './Styles/LoginStyles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
// eslint-disable-next-line no-undef

interface Props {
  navigation: NavigationStackProp;
}

const Cgu = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderRegister title={translate('TermsOfUse')} onPressLeftIcon={() => props.navigation.goBack()} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: Metrics.baseMargin }}>
        <View style={styles.centered} />

        <View>
          <Text>{translate('termsP0')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle1')}</Text>
          <Text>{translate('termsP1')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle2')}</Text>
          <Text>{translate('termsP2')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle3')}</Text>
          <Text>{translate('termsP3')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle4')}</Text>
          <Text>{translate('termsP4')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle5')}</Text>
          <Text>{translate('termsP5')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle6')}</Text>
          <Text>{translate('termsP6')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle7')}</Text>
          <Text>{translate('termsP7')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle8')}</Text>
          <Text>{translate('termsP8')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle9')}</Text>
          <Text>{translate('termsP9')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle10')}</Text>
          <Text>{translate('termsP10')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle11')}</Text>
          <Text>{translate('termsP11')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('termsTitle12')}</Text>
          <Text>{translate('termsP12')}</Text>
        </View>
        <View style={styles.centered} />

        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              textAlign: 'center',
              marginVertical: 20,
              color: Colors.blue,
            }}
          >
            {translate('privacyPolicy')}
          </Text>
          <Text>{translate('privacyP0')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('privacyTitle1')}</Text>
          <Text>{translate('privacyP1')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('privacyTitle2')}</Text>
          <Text>{translate('privacyP2')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('privacyTitle3')}</Text>
          <Text>{translate('privacyP3')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('privacyTitle4')}</Text>
          <Text>{translate('privacyP4')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('privacyTitle5')}</Text>
          <Text>{translate('privacyP5')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('privacyTitle6')}</Text>
          <Text>{translate('privacyP6')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('privacyTitle7')}</Text>
          <Text>{translate('privacyP7')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('privacyTitle8')}</Text>
          <Text>{translate('privacyP8')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{translate('privacyTitle9')}</Text>
          <Text>{translate('privacyP9')}</Text>
        </View>

        <Name width={Metrics.screenWidth} height={50} />
      </ScrollView>
    </View>
  );
};

export default Cgu;
