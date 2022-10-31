import { StyleSheet } from 'react-native';

import { Metrics, Colors, Fonts } from '../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.largeMargin,
  },
  item: {
    flexDirection: 'row',
    width: 106,
    height: 48,
    borderRadius: Metrics.smallBorderRadius,
    backgroundColor: Colors.white,
    marginRight: Metrics.margin,
  },
  logo: {
    width: Metrics.perfumeLogo,
    height: Metrics.perfumeLogo,
    borderRadius: Metrics.perfumeLogoBorderRadius,
    margin: Metrics.smallMargin,
  },
  text: {
    alignSelf: 'center',
    ...Fonts.style.affilateLink,
  },
});
