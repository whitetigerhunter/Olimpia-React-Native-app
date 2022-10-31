import { StyleSheet } from 'react-native';

import { Colors, Fonts, Metrics, Typography } from '../../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 76,
    backgroundColor: Colors.greyScaleOne,
    marginTop: Metrics.tinyMargin,
    borderRadius: Metrics.mediumBorderRadius,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 0.85,
  },
  text: {
    ...Fonts.style.regularBase,
    color: Colors.greyScaleSix,
    marginStart: Metrics.mediumMargin,
    lineHeight: Typography.mediumLineHeight,
  },
  textBolder: {
    ...Fonts.style.regularMedium,
    color: Colors.greyScaleSix,
    lineHeight: Typography.mediumLineHeight,
  },
  buttonConatiner: {
    justifyContent: 'center',
  },
  button: {
    width: Metrics.buttonIconOnly,
    height: Metrics.buttonIconOnly,
    borderRadius: Metrics.mediumBorderRadius,
    marginRight: Metrics.mediumMargin,
  },
});
