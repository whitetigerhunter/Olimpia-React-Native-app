import { StyleSheet } from 'react-native';

import { Metrics, Colors, Fonts } from '../../../Theme';

export default StyleSheet.create({
  section: {
    height: Metrics.screenHeight / 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: Metrics.baseMargin,
  },
  title: {
    ...Fonts.style.h3,
    color: Colors.lightBlue,
    fontWeight: '500',
  },
});
