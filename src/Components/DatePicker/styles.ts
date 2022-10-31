import { StyleSheet } from 'react-native';

import { Colors, Fonts } from '../../Theme';

export default StyleSheet.create({
  dateText: {
    color: Colors.snow,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    ...Fonts.style.normal,
    flex: 1,
  },
  date: {
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    marginTop: 10,
    flex: 0.3,
  },
  dateShow: {
    color: Colors.main,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    ...Fonts.style.normal,
    flex: 1,
  },
  datePicker: {
    flex: 1,
    width: 400,
    alignSelf: 'stretch',
    opacity: 0,
    position: 'absolute',
  },
  pressableTextContainer: { marginTop: 10, alignItems: 'center', flex: 0.8 },
  textContainer: { flex: 1, flexDirection: 'row', alignSelf: 'center' },
});
