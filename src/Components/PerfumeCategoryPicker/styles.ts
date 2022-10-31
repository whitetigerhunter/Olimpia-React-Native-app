import { StyleSheet } from 'react-native';

import { Colors, Metrics, Fonts } from '../../Theme';

export default StyleSheet.create({
  pickerButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.filterButtonPaddingHorizontal,
    justifyContent: 'center',
    height: Metrics.filterButtonHeight,
    borderRadius: Metrics.smallBorderRadius,
    marginRight: Metrics.filterButtonRightMargin,
  },
  pickerButtonTextStyle: {
    color: Colors.blackish,
    ...Fonts.style.perfumeFilterButtonTextActive,
  },
  pickerButtonTextStylePressed: {
    color: Colors.white,
    ...Fonts.style.perfumeFilterButtonTextActive,
  },
  pickerButtonPressed: {
    backgroundColor: Colors.lightBlue,
  },
  icon: {
    color: Colors.greyScaleSix,
    width: 20,
  },
  iconActive: {
    color: Colors.greyScaleOne,
    width: 20,
  },
  contentContainer: {
    height: 40,
    paddingHorizontal: Metrics.baseMargin,
    alignItems: 'center',
  },
});
