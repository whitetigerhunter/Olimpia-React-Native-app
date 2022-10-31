import { StyleSheet } from 'react-native';

import { Fonts, Colors } from '../../Theme';

export default StyleSheet.create({
  LinkStyle: {
    color: Colors.snow,
    ...Fonts.style.normal,
  },
  viewLink: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 20,
    paddingRight: 20,
  },
});
