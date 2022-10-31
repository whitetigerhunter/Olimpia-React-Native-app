import { ScaledSheet } from 'react-native-size-matters';
import { FontsTablet, Colors, Metricstablet } from '../../Theme';

const TEXT_BTN = FontsTablet.style.normal;
export default ScaledSheet.create({
  container: {
    flex: 1,
    paddingBottom: Metricstablet.baseMargin,
    paddingHorizontal: Metricstablet.doubleBaseMargin,
  },
  fullScreenFlex: {
    flex: 1,
  },
  Footer: {
    marginBottom: Metricstablet.baseMargin * 5,
  },
  modalInputView: {
    paddingHorizontal: "20@ms",
  },
  modalIcon: {
    flex: 0.1,
    top: "55@ms",
    right: "-15@ms",
    marginRight: "20@ms",
  },
  modalContainer: {
    backgroundColor: Colors.backgroundSecondary,
    marginTop: Metricstablet.screenHeight * 0.05,
    borderRadius: "5@ms",
    height: Metricstablet.screenHeight * 0.45,
    width: Metricstablet.screenWidth * 0.9,
  },
  modalContent: {
    flex: 1,
  },
  modalHeaderText: {
    color: Colors.main,
    alignSelf: 'center',
    marginLeft: "10@ms",
    marginRight: "10@ms",
    marginTop: "30@ms",
    marginBottom: "10@ms",
    ...FontsTablet.style.normal,
    fontSize: FontsTablet.sizeTablet.h3,
  },
  modalText: {
    marginTop: "20@ms",
    color: Colors.greyScaleSix,
    alignSelf: 'center',
    ...FontsTablet.style.normal,
    fontSize: FontsTablet.sizeTablet.regular,
  },
  submitBtn: {
    width: '100%',
    alignSelf: 'center',
    marginTop: "20@ms",
    height: Metricstablet.button,
  },
  textStyleBtn2: {
    fontWeight: '400',
    ...TEXT_BTN,
  },
});
