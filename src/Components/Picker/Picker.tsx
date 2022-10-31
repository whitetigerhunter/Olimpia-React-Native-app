import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

import { Colors, Fonts, FontsTablet } from 'app/Theme';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';

interface Props extends PickerSelectProps {}

const Picker = (props: Props) => (
  
  <RNPickerSelect
    useNativeAndroidPickerStyle={false}
    placeholder={{}}
    style={{
      viewContainer: styles.container,
      inputAndroidContainer: styles.container,
      inputAndroid: styles.text,
      inputIOS: styles.text,
    }}
    {...props}
  />
);

export default Picker;

const regularStyles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.greyScaleOne,
    borderRadius: 12,
  },
  text: {
    ...Fonts.style.input,
    paddingLeft: 12,
    paddingRight: 12,
  },
});
const scaledStyles = ScaledSheet.create({
  container: {
    height: "44@ms",
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.greyScaleOne,
    borderRadius: "12@ms",
  },
  text: {
    ...FontsTablet.style.input,
    paddingLeft: "12@ms",
    paddingRight: "12@ms",
  },
});
const isTablet = DeviceInfo.isTablet();
const styles = isTablet ? scaledStyles : regularStyles;
