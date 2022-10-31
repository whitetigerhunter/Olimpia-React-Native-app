import { Colors, Metricstablet, FontsTablet } from '../../Theme';
import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  pickerButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: Metricstablet.filterButtonPaddingHorizontal,
    justifyContent: 'center',
    height: Metricstablet.filterButtonHeight,
    borderRadius: Metricstablet.smallBorderRadius,
    marginRight: Metricstablet.filterButtonRightMargin,
  },
  pickerButtonTextStyle: {
    color: Colors.blackish,
    ...FontsTablet.style.perfumeFilterButtonTextActive,
  },
  pickerButtonTextStylePressed: {
    color: Colors.white,
    ...FontsTablet.style.perfumeFilterButtonTextActive,
  },
  pickerButtonPressed: {
    backgroundColor: Colors.lightBlue,
  },
  icon: {
    color: Colors.greyScaleSix,
    width: "20@ms",
  },
  iconActive: {
    color: Colors.greyScaleOne,
    width: "20@ms",
  },
  contentContainer: {
    height: "40@ms",
    paddingHorizontal: Metricstablet.baseMargin,
    alignItems: 'center',
  },
});
