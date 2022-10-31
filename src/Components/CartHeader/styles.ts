import { StyleSheet } from 'react-native';

import { Colors, Fonts, Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '80%',
    alignItems: 'center',
  },
  numberActive: {
    borderRadius: 50,
    backgroundColor: Colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 25,
    height: 25,
    padding: 2,
  },
  numberInactive: {
    borderRadius: 50,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    padding: 2,
  },
  text: {
    color: Colors.greyScaleOne,
    ...Fonts.style.helper,
  },
  separatorInactive: {
    backgroundColor: Colors.lightBlue,
    width: '20%',
    height: 1.5,
    marginTop: Metrics.baseMargin,
    marginBottom: 10,
    alignSelf: 'center',
  },
  separatorActive: {
    backgroundColor: Colors.main,
    width: '20%',
    height: 1.5,
    marginTop: Metrics.baseMargin,
    marginBottom: 10,
    alignSelf: 'center',
  },
});
