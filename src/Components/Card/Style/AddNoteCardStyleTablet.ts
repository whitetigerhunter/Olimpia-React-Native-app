import { ScaledSheet } from "react-native-size-matters";
import { Colors, FontsTablet, Metricstablet, TypographyTablet } from '../../../Theme';

export default ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: "76@ms",
    backgroundColor: Colors.greyScaleOne,
    marginTop: Metricstablet.tinyMargin,
    borderRadius: Metricstablet.mediumBorderRadius,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 0.85,
  },
  text: {
    ...FontsTablet.style.regularBase,
    color: Colors.greyScaleSix,
    marginStart: Metricstablet.mediumMargin,
    lineHeight: TypographyTablet.mediumLineHeight,
  },
  textBolder: {
    ...FontsTablet.style.regularMedium,
    color: Colors.greyScaleSix,
    lineHeight: TypographyTablet.mediumLineHeight,
  },
  buttonConatiner: {
    justifyContent: 'center',
  },
  button: {
    width: Metricstablet.buttonIconOnly,
    height: Metricstablet.buttonIconOnly,
    borderRadius: Metricstablet.mediumBorderRadius,
    marginRight: Metricstablet.mediumMargin,
  },
});
