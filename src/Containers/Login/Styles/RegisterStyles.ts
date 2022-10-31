import { Platform, StyleSheet } from 'react-native';

import { Metrics, Fonts, Colors, Typography } from 'app/Theme/';

const TEXT_BTN = Fonts.style.normal;
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  container: {
    paddingBottom: Metrics.baseMargin,
  },
  btnPressed: {
    width: '48%',
  },
  btnUnpressed: {
    width: '48%',
    backgroundColor: Colors.opacity,
  },
  textStyleBtn1: {
    color: Colors.lightBlue,
    fontWeight: '400',
    ...TEXT_BTN,
  },
  textStyleBtn2: {
    fontWeight: '400',
    ...TEXT_BTN,
  },
  headerContainer: {
    height: Metrics.screenHeight * 0.1,
    width: '100%',
  },
  headerText: {
    color: Colors.black,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    ...Fonts.style.normal,
  },
  sexError: {
    color: Colors.validationInvalid,
    backgroundColor: Colors.transparent,
    textAlign: 'left',
    marginTop: -5,
    ...Fonts.style.normal,
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
  cguContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Metrics.baseMargin,
    flex: 1,
  },
  dateText: {
    color: Colors.main,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: -150,
    ...Fonts.style.normal,
  },
  checkboxError: {
    color: Colors.validationInvalid,
    backgroundColor: Colors.transparent,
    textAlign: 'left',
    marginTop: -10,
    ...Fonts.style.normal,
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
  Footer: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin * 5,
  },
  conditionsPwd: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.transparent,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: Metrics.baseMargin,
  },
  cond: {
    color: Colors.main,
    paddingBottom: 10,
    marginLeft: 10,
    ...Fonts.style.helper,
  },
  cond2: {
    color: Colors.main,
    marginLeft: 10,
    ...Fonts.style.helper,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
  },
  checkboxHolder: {
    justifyContent: 'center',
  },
  textHolder: {
    flexDirection: 'row',
  },
  cguText: {
    color: Colors.snow,
    ...Fonts.style.normal,
    alignSelf: 'flex-end',
  },
  cguLink: {
    ...Fonts.style.normal,
    color: Colors.main,
    textDecorationLine: 'underline',
    textAlign: 'auto',
    alignSelf: 'flex-end',
  },
  view: {
    flexDirection: 'row',
  },
  submitBtn: {
    width: '100%',
    alignSelf: 'center',
    marginTop: Metrics.baseMargin * 2,
    height: Metrics.button,
  },
  fullScreenFlex: {
    flex: 1,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  customInputContainerStyle: {
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 12,
  },
  dobLabel: {
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: -8,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  pickerMarginTop: { marginTop: 30 },
  topTen: { top: 10 },
  buttonContainer: { height: 150 },
  input: { minHeight: 44, height: undefined },
  multilineInputText: {
    paddingTop: Platform.OS === 'ios' ? 12 : 8,
    paddingBottom: Platform.OS === 'ios' ? 12 : 8,
    textAlignVertical: 'top',
  },
  label: {
    ...Fonts.style.inputLabel,
    color: Colors.inputLabel,
    marginBottom: Metrics.tinyMargin,
    lineHeight: Typography.largeLineHeight,
  },
});
