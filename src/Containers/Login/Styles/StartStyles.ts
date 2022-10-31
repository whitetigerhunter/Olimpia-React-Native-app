import { StyleSheet } from 'react-native';

import { Metrics, Colors } from '../../../Theme';

export default StyleSheet.create({
  container: {
    paddingBottom: Metrics.baseMargin,
    flex: 1,
  },
  logo: {
    paddingVertical: Metrics.doubleBaseMargin * 4,
    height: Metrics.screenHeight * 0.32,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  swiper: {
    height: Metrics.screenHeight * 0.32,
    width: '100%',
  },
  Footer: {
    paddingVertical: Metrics.baseMargin,
    height: Metrics.screenHeight * 0.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn1: {
    backgroundColor: Colors.opacity,
    width: '90%',
    alignSelf: 'center',
  },
  btn2: {
    marginTop: Metrics.baseMargin,
  },
  textStyleBtn1: {
    color: Colors.blue,
    fontSize: 17,
    fontWeight: '400',
  },
  textStyleBtn2: {
    fontSize: 17,
    fontWeight: '400',
  },
  headerBackground: {
    resizeMode: 'stretch',
    position: 'relative',
    height: Metrics.screenHeight / 7,
    width: Metrics.screenWidth / 3,
    alignSelf: 'center',
  },
});
