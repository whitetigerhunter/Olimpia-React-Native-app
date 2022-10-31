import { StyleSheet } from 'react-native';

import { Typography } from 'app/Theme';

import { Colors, Fonts, Metrics } from '../../../Theme';

export default StyleSheet.create({
  cardWrapper: {
    marginHorizontal: Metrics.smallMargin,
    marginBottom: Metrics.margin - 2,
    width: Metrics.noteCardWidth,
    aspectRatio: 106 / 116,

  },
  card: {
    borderTopLeftRadius: Metrics.mediumBorderRadius,
    borderTopRightRadius: Metrics.mediumBorderRadius,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    aspectRatio: 106 / 116,
    backgroundColor: Colors.greyScaleOne,
  },
  selectedCard: {
    backgroundColor: Colors.lightBlue,
  },
  swiper: {
    flex: 1.3,
  },
  image: {
    width: Metrics.noteCardImageWidth,
    aspectRatio: 94 / 65,
    borderRadius: Metrics.tinyBorderRadius,
    alignSelf: 'center',
    marginTop: Metrics.smallMargin,
  },
  detail: {
    flex: 0.9,
    paddingVertical: Metrics.baseMargin / 3,
    justifyContent: 'space-around',
    paddingBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin * 1.5,
  },
  description: {
    alignSelf: 'flex-start',
    ...Fonts.style.helper,
  },
  threeDots: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    height: 20,
    textAlign: 'center',
    lineHeight: 17,
    backgroundColor: Colors.blue
  },
  threeDotsBack: {
    marginTop: 1,
    fontSize: 12,
      height: 20,
    lineHeight: 18,
    fontWeight: 'normal',
    backgroundColor: Colors.blue,
    textAlign: 'center',
    color: Colors.white,
  },
  threeDotsWrapper: {
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
    height: 20,
    marginTop: -20,
    // borderBottomWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden'
  },
  price: {
    alignSelf: 'flex-start',
    ...Fonts.style.h3,
    fontWeight: 'bold',
    color: Colors.main,
    marginBottom: -20,
  },
  btnText: {
    alignSelf: 'center',
    color: Colors.white,
    ...Fonts.style.normal,
    fontWeight: '400',
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonStyle: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  checkedConfirm: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    right: -10,
  },
  uncheckedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.black,
    width: '100%',
    height: '100%',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    ...Fonts.style.helper,
    color: Colors.greyScaleSix,
    lineHeight: Typography.smallLineHeight,
    textAlign: 'center',
  },
  uncheckedText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.main,
  },
  cardDescription: {
    color: Colors.greyScaleSix,
    textAlign: 'center',
    height: 110,
    width: Metrics.noteCardWidth,
    justifyContent: 'center',
    borderRadius: Metrics.mediumBorderRadius,
  },
  cardDescriptionText: {
    ...Fonts.style.helper,
    lineHeight: 18,
    textAlign: 'center'
  },
  cardDisappear: {
    display: 'none'
  },
});
