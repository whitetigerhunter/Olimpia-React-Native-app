import Colors from 'app/Theme/Colors';

const fontTypesTablet = {
  base: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  black: 'Inter-Black',
  emphasis: 'Montserrat-SemiBold',
  sourceSansProRegular: 'SourceSansPro-Regular',
  moteserratSemiBold: 'Montserrat-SemiBold',
  cormorantGaramondSemiBold: 'CormorantGaramond-SemiBold',
};

const sizeTablet = {
  h1: "36@ms",
  h2: "24@ms",
  h3: "20@ms",
  medium: "18@ms",
  regular: "16@ms",
  small: "14@ms",
  xsmall: "12@ms",
  error: "10@ms",
  tiny: "6@ms",
};

const style = {
  h1: {
    fontFamily: fontTypesTablet.black,
    fontSize: sizeTablet.h1,
  },
  h2: {
    fontFamily: fontTypesTablet.black,
    fontSize: sizeTablet.h2,
  },
  h3: {
    fontFamily: fontTypesTablet.black,
    fontSize: sizeTablet.h3,
  },
  headerTitle: {
    fontFamily: fontTypesTablet.medium,
    fontSize: sizeTablet.medium,
  },
  headerSmallerBlack: {
    fontFamily: fontTypesTablet.black,
    fontSize: sizeTablet.regular,
  },
  inputLabel: {
    fontFamily: fontTypesTablet.bold,
    fontSize: sizeTablet.xsmall,
  },
  input: {
    fontSize: sizeTablet.small,
    fontFamily: fontTypesTablet.base,
    color: Colors.greyScaleSix,
  },
  helper: {
    fontFamily: fontTypesTablet.base,
    fontSize: sizeTablet.xsmall,
  },
  normal: {
    fontFamily: fontTypesTablet.base,
    fontSize: sizeTablet.small,
  },
  perfumeFilterButtonTextActive: {
    fontFamily: fontTypesTablet.bold,
    fontSize: sizeTablet.xsmall,
  },
  perfumeDetailsFilterButtonTextActive: {
    fontFamily: fontTypesTablet.medium,
    fontSize: sizeTablet.xsmall,
  },
  perfumeName: {
    fontFamily: fontTypesTablet.black,
    fontSize: sizeTablet.h1,
  },
  buttonText: {
    fontFamily: fontTypesTablet.bold,
    fontSize: sizeTablet.xsmall,
  },
  affilateLink: {
    fontFamily: fontTypesTablet.sourceSansProRegular,
    fontSize: sizeTablet.xsmall,
  },
  favouritePerfumeName: {
    fontFamily: fontTypesTablet.semiBold,
    fontSize: sizeTablet.small,
  },
  xsmallBase: {
    fontFamily: fontTypesTablet.base,
    fontSize: sizeTablet.xsmall,
  },
  regularBase: {
    fontFamily: fontTypesTablet.base,
    fontSize: sizeTablet.regular,
  },
  regularMedium: {
    fontFamily: fontTypesTablet.medium,
    fontSize: sizeTablet.regular,
  },
  smallMedium: {
    fontFamily: fontTypesTablet.medium,
    fontSize: sizeTablet.small,
  },
  xsmallMedium: {
    fontFamily: fontTypesTablet.medium,
    fontSize: sizeTablet.xsmall,
  },
  tinyMedium: {
    fontFamily: fontTypesTablet.medium,
    fontSize: sizeTablet.tiny,
  },
  tinySemiBold: {
    fontFamily: fontTypesTablet.semiBold,
    fontSize: sizeTablet.tiny,
  },
  errorBold: {
    fontFamily: fontTypesTablet.bold,
    fontSize: sizeTablet.error,
  },
};

export default {
  fontTypesTablet,
  sizeTablet,
  style,
};
