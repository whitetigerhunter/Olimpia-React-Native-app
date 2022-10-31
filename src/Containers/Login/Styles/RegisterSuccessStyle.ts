import { StyleSheet } from 'react-native';

import { Metrics, Fonts, Colors } from '../../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.screenHeight / 6,
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
  },
  submitBtn: {
    width: '90%',
    alignSelf: 'center',
  },
  textStyleBtn: {
    fontWeight: '400',
    ...Fonts.style.normal,
  },
  textStyle: {
    fontWeight: '400',
    ...Fonts.style.normal,
    color: Colors.snow,
  },
  description: {
    alignItems: 'center',
    marginVertical: Metrics.screenHeight / 10,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
});
