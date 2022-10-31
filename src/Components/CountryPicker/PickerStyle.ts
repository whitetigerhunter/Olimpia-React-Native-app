import { StyleSheet } from 'react-native';

import { Colors, Fonts } from '../../Theme';

export default StyleSheet.create({
  text: {
    alignSelf: 'center',
    color: Colors.lightBlue,
    ...Fonts.style.normal,
  },
  Bouton: {
    alignSelf: 'stretch',
    height: 45,
    backgroundColor: Colors.opacity,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'transparent',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  Country: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  Icon: {
    position: 'absolute',
    top: 10,
    right: -15,
  },
});
