import { StyleSheet, Platform } from 'react-native';

import { Colors, Metrics, Fonts } from '../../Theme';

export default StyleSheet.create({
  header: {
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.mediumMargin,
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
    ...Fonts.style.normal,
    color: Colors.blue,
    fontWeight: '600',
  },
  sectionText1: {
    ...Fonts.style.headerTitle,
    color: Colors.greyScaleSix,
  },
  row: {
    flexDirection: 'row',
  },
  appName: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  skipButton: {
    padding: Metrics.mediumMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  skipButtonText: {
    ...Fonts.style.buttonText,
    color: Colors.greyScaleOne,
  },
  avatar: {
    width: Metrics.xlargeMargin,
    height: Metrics.xlargeMargin,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    borderRadius: Metrics.xlargeMargin,
  },
});
