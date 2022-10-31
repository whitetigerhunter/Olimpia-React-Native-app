import { Platform } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";

import { Metricstablet, FontsTablet, Colors, TypographyTablet } from 'app/Theme/';

const TEXT_BTN = FontsTablet.style.normal;
export default ScaledSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  container: {
    paddingBottom: Metricstablet.baseMargin,
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
    height: Metricstablet.screenHeight * 0.1,
    width: '100%',
  },
  headerText: {
    color: Colors.black,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: "10@ms",
    ...FontsTablet.style.normal,
  },
  sexError: {
    color: Colors.validationInvalid,
    backgroundColor: Colors.transparent,
    textAlign: 'left',
    marginTop: "-5@ms",
    ...FontsTablet.style.normal,
    fontSize: "12@ms",
    marginLeft: "20@ms",
    marginBottom: "10@ms",
  },
  cguContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Metricstablet.baseMargin,
    flex: 1,
  },
  dateText: {
    color: Colors.main,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    textAlign: 'left',
    marginTop: "10@ms",
    marginLeft: "-150@ms",
    ...FontsTablet.style.normal,
  },
  checkboxError: {
    color: Colors.validationInvalid,
    backgroundColor: Colors.transparent,
    textAlign: 'left',
    marginTop: "-10@ms",
    ...FontsTablet.style.normal,
    fontSize: "12@ms",
    marginLeft: '20@ms',
    marginBottom: "10@ms",
  },
  Footer: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: Metricstablet.baseMargin,
    marginBottom: Metricstablet.baseMargin * 5,
  },
  conditionsPwd: {
    borderRadius: "4@ms",
    borderWidth: "1@ms",
    borderColor: Colors.transparent,
    paddingBottom: "10@ms",
    paddingTop: "10@ms",
    marginBottom: Metricstablet.baseMargin,
  },
  cond: {
    color: Colors.main,
    paddingBottom: "10@ms",
    marginLeft: "10@ms",
    ...FontsTablet.style.helper,
  },
  cond2: {
    color: Colors.main,
    marginLeft: "10@ms",
    ...FontsTablet.style.helper,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: Metricstablet.baseMargin,
  },
  checkboxHolder: {
    justifyContent: 'center',
  },
  textHolder: {
    flexDirection: 'row',
  },
  cguText: {
    color: Colors.snow,
    ...FontsTablet.style.normal,
    alignSelf: 'flex-end',
  },
  cguLink: {
    ...FontsTablet.style.normal,
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
    marginTop: Metricstablet.baseMargin * 2,
    height: Metricstablet.button,
  },
  fullScreenFlex: {
    flex: 1,
    paddingHorizontal: Metricstablet.doubleBaseMargin,
  },
  customInputContainerStyle: {
    marginBottom: "20@ms",
  },
  inputContainer: {
    marginTop: "12@ms",
  },
  dobLabel: {
    marginTop: Metricstablet.doubleBaseMargin,
    marginBottom: "-8@ms",
  },
  rowContainer: {
    flexDirection: 'row',
  },
  pickerMarginTop: { marginTop: "30@ms" },
  topTen: { top: '10@ms' },
  buttonContainer: { height: "150@ms" },
  input: { minHeight: "44@ms", height: undefined },
  multilineInputText: {
    paddingTop: Platform.OS === 'ios' ? 12 : "8@ms",
    paddingBottom: Platform.OS === 'ios' ? 12 : "8@ms",
    textAlignVertical: 'top',
  },
  label: {
    ...FontsTablet.style.inputLabel,
    color: Colors.inputLabel,
    marginBottom: Metricstablet.tinyMargin,
    lineHeight: TypographyTablet.largeLineHeight,
  },
});
