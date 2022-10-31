import { StyleSheet } from 'react-native';

import { Metrics, Colors, Fonts } from '../../../Theme';

export default StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin / 2,
  },
  child: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: Metrics.baseMargin / 2,
  },
  headerTitle: {
    ...Fonts.style.h3,
    color: Colors.main,
    fontWeight: '500',
    marginVertical: Metrics.baseMargin / 2,
  },
  childTitle: {
    ...Fonts.style.h3,
    color: Colors.main,
    fontWeight: '400',
    marginVertical: Metrics.baseMargin / 2,
  },
});
