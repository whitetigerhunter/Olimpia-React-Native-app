/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ViewStyle, StyleProp } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

import Icons from '../Icons';
import Styles from './PickerStyle';

interface Props {
  parentCallback: (country: any) => void;
  style: StyleProp<ViewStyle>;
  baseCountry?: any;
}

const Country = ({ parentCallback, style, baseCountry }: Props) => {
  const [visible, setVisible] = useState(false);

  const [countryCode, setCountryCode] = useState(baseCountry);
  const [country, setCountry] = useState({ name: baseCountry });
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  // eslint-disable-next-line no-shadow
  const onSelect = (country: any) => {
    parentCallback(country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setVisible(true)}>
      <View style={[Styles.Bouton, style]}>
        <View style={Styles.Country}>
          <Text style={Styles.text}>{country.name}</Text>
          {countryCode === '' && <Icons style={Styles.Icon} name="angle-down" />}

          <CountryPicker
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
            }}
            visible={visible}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Country;
