import { ScaledSheet } from "react-native-size-matters";
import { FontsTablet, Colors, Metricstablet, Typography, TypographyTablet } from '../../Theme';

const TEXT_BTN = FontsTablet.style.normal;
export default ScaledSheet.create({
  container: {
    flex: 1,
    paddingTop: "20@vs",
  },
  text: {
    ...TEXT_BTN,
  },
  titleTextStyle: {
    ...FontsTablet.style.normal,
    fontSize: FontsTablet.sizeTablet.xsmall,
  },
  inputContainer: {
    height: Metricstablet.textInputHeight,
    borderRadius: Metricstablet.smallBorderRadius,
    backgroundColor: Colors.greyScaleOne,
    color: Colors.textInputText,
    paddingHorizontal: Metricstablet.margin,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  input: {
    flex: 1,
    ...FontsTablet.style.input,
  },
  iconContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: Metricstablet.margin,
    right: Metricstablet.margin,
  },
  icon: { width: "20@ms", height: "20@vs" },
  label: {
    ...FontsTablet.style.inputLabel,
    color: Colors.inputLabel,
    marginBottom: Metricstablet.tinyMargin,
    lineHeight: TypographyTablet.largeLineHeight,
  },
  error: {
    color: Colors.validationInvalid,
    ...FontsTablet.style.helper,
    marginTop: Metricstablet.smallMargin,
    lineHeight: TypographyTablet.smallLineHeight,
  },
  helper: {
    color: Colors.greyScaleFive,
    ...FontsTablet.style.helper,
    marginTop: Metricstablet.smallMargin,
    lineHeight: TypographyTablet.smallLineHeight,
  },
  focused: {
    borderColor: Colors.lightBlue,
    borderWidth: 1,
  },
  errorFocused: {
    borderColor: Colors.validationInvalid,
    borderWidth: 1,
  },
  errorFontColor: {
    color: Colors.validationInvalid,
  },
});
