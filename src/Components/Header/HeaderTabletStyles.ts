import { ScaledSheet } from "react-native-size-matters";
import { Colors, Metricstablet, FontsTablet } from '../../Theme';

export default ScaledSheet.create({
  header: {
    height: Metricstablet.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metricstablet.mediumMargin,
  },
  titleContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bars: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  shop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  sectionText: {
    ...FontsTablet.style.normal,
    color: Colors.blue,
    fontWeight: '600',
  },
  sectionText1: {
    ...FontsTablet.style.headerTitle,
    color: Colors.greyScaleSix,
  },
  row: {
    flexDirection: 'row',
  },
  appName: {
    alignSelf: 'center',
    marginLeft: "10@ms",
  },
  skipButton: {
    padding: Metricstablet.mediumMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  skipButtonText: {
    ...FontsTablet.style.buttonText,
    color: Colors.greyScaleOne,
  },
  avatar: {
    width: Metricstablet.xlargeMargin,
    height: Metricstablet.xlargeMargin,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    borderRadius: Metricstablet.xlargeMargin,
  },
});
