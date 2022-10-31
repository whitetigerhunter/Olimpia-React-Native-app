import { Metrics, Metricstablet, TypographyTablet } from 'app/Theme';
import { ScaledSheet } from "react-native-size-matters";
import { Colors, FontsTablet } from '../../../Theme';

export default ScaledSheet.create({
  cardWrapper: {
    marginHorizontal: Metricstablet.smallMargin,
    marginBottom: Metricstablet.margin,
    width: Metricstablet.noteCardWidth,
    aspectRatio: 106 / 116,

  },
  card: {
    borderTopLeftRadius: Metricstablet.mediumBorderRadius,
    borderTopRightRadius: Metricstablet.mediumBorderRadius,
    borderBottomLeftRadius: "8@ms",
    borderBottomRightRadius: "8@ms",
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
    width: Metricstablet.noteCardImageWidth,
    aspectRatio: 94 / 65,
    borderRadius: Metricstablet.tinyBorderRadius,
    alignSelf: 'center',
    marginTop: Metricstablet.smallMargin,
  },
  detail: {
    flex: 0.9,
    paddingVertical: Metricstablet.baseMargin / 3,
    justifyContent: 'space-around',
    paddingBottom: Metricstablet.baseMargin,
    paddingHorizontal: Metricstablet.baseMargin * 1.5,
  },
  description: {
    alignSelf: 'flex-start',
    ...FontsTablet.style.helper,
  },
  threeDots: {
    fontSize: "22@ms",
    fontWeight: 'bold',
    color: 'white',
    height: "20@ms",
    textAlign: 'center',
    lineHeight: "17@ms",
    backgroundColor: Colors.blue
  },
  threeDotsBack: {
    marginTop: "1@ms",
    fontSize: "12@ms",
      height: "20@ms",
    lineHeight: "18@ms",
    fontWeight: 'normal',
    backgroundColor: Colors.blue,
    textAlign: 'center',
    color: Colors.white,
  },
  threeDotsWrapper: {
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
    height: "20@ms",
    marginTop: -20,
    // borderBottomWidth: 1,
    borderBottomLeftRadius: "8@ms",
    borderBottomRightRadius: "8@ms",
    overflow: 'hidden'
  },
  price: {
    alignSelf: 'flex-start',
    ...FontsTablet.style.h3,
    fontWeight: 'bold',
    color: Colors.main,
    marginBottom: -20,
  },
  btnText: {
    alignSelf: 'center',
    color: Colors.white,
    ...FontsTablet.style.normal,
    fontWeight: '400',
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonStyle: {
    width: '100%',
    height: "30@ms",
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
    // ...FontsTablet.style.helper,
    fontSize: "12@ms",
    color: Colors.greyScaleSix,
    lineHeight: TypographyTablet.smallLineHeight,
    minHeight: "60@ms",
    marginTop: "80@ms",
  },
  uncheckedText: {
    textAlign: 'center',
    fontSize: "16@ms",
    color: Colors.main,
  },
  cardDescription: {
    color: Colors.greyScaleSix,
    textAlign: 'center',
    height: "110@ms",
    width: Metricstablet.noteCardWidth,
    justifyContent: 'center',
    borderRadius: Metricstablet.mediumBorderRadius,
  },
  cardDescriptionText: {
    ...FontsTablet.style.helper,
    lineHeight: "18@ms",
    textAlign: 'center'
  },
  cardDisappear: {
    display: 'none'
  },
});
