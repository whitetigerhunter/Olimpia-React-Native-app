import { StyleSheet } from 'react-native';

import { Fonts, Colors, Metrics, Typography } from '../../Theme';

const TEXT_BTN = Fonts.style.normal;
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    ...TEXT_BTN,
  },
  titleTextStyle: {
    ...Fonts.style.normal,
    fontSize: Fonts.size.xsmall,
  },
  inputContainer: {
    height: Metrics.textInputHeight,
    borderRadius: Metrics.smallBorderRadius,
    backgroundColor: Colors.greyScaleOne,
    color: Colors.textInputText,
    paddingHorizontal: Metrics.margin,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  input: {
    flex: 1,
    ...Fonts.style.input,
  },
  iconContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: Metrics.margin,
    right: Metrics.margin,
  },
  icon: { width: 20, height: 20 },
  label: {
    ...Fonts.style.inputLabel,
    color: Colors.inputLabel,
    marginBottom: Metrics.tinyMargin,
    lineHeight: Typography.largeLineHeight,
  },
  error: {
    color: Colors.validationInvalid,
    ...Fonts.style.helper,
    marginTop: Metrics.smallMargin,
    lineHeight: Typography.smallLineHeight,
  },
  helper: {
    color: Colors.greyScaleFive,
    ...Fonts.style.helper,
    marginTop: Metrics.smallMargin,
    lineHeight: Typography.smallLineHeight,
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
