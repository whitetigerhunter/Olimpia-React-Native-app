import { StyleSheet } from 'react-native';

import { Fonts, Colors, Metrics } from '../../Theme';

const TEXT_BTN = Fonts.style.normal;
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  fullScreenFlex: {
    flex: 1,
  },
  Footer: {
    marginBottom: Metrics.baseMargin * 5,
  },
  modalInputView: {
    paddingHorizontal: 20,
  },
  modalIcon: {
    flex: 0.1,
    top: 55,
    right: -15,
    marginRight: 20,
  },
  modalContainer: {
    backgroundColor: Colors.backgroundSecondary,
    marginTop: Metrics.screenHeight * 0.05,
    borderRadius: 5,
    height: Metrics.screenHeight * 0.45,
    width: Metrics.screenWidth * 0.9,
  },
  modalContent: {
    flex: 1,
  },
  modalHeaderText: {
    color: Colors.main,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    marginBottom: 10,
    ...Fonts.style.normal,
    fontSize: Fonts.size.h3,
  },
  modalText: {
    marginTop: 20,
    color: Colors.greyScaleSix,
    alignSelf: 'center',
    ...Fonts.style.normal,
    fontSize: Fonts.size.regular,
  },
  submitBtn: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    height: Metrics.button,
  },
  textStyleBtn2: {
    fontWeight: '400',
    ...TEXT_BTN,
  },
});
