import Colors from 'app/Theme/Colors';

const fontTypes = {
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

const size = {
  h1: 36,
  h2: 24,
  h3: 20,
  medium: 18,
  regular: 16,
  small: 14,
  xsmall: 12,
  error: 10,
  tiny: 6,
};

const style = {
  h1: {
    fontFamily: fontTypes.black,
    fontSize: size.h1,
  },
  h2: {
    fontFamily: fontTypes.black,
    fontSize: size.h2,
  },
  h3: {
    fontFamily: fontTypes.black,
    fontSize: size.h3,
  },
  headerTitle: {
    fontFamily: fontTypes.medium,
    fontSize: size.medium,
  },
  headerSmallerBlack: {
    fontFamily: fontTypes.black,
    fontSize: size.regular,
  },
  inputLabel: {
    fontFamily: fontTypes.bold,
    fontSize: size.xsmall,
  },
  input: {
    fontSize: size.small,
    fontFamily: fontTypes.base,
    color: Colors.greyScaleSix,
  },
  helper: {
    fontFamily: fontTypes.base,
    fontSize: size.xsmall,
  },
  normal: {
    fontFamily: fontTypes.base,
    fontSize: size.small,
  },
  perfumeFilterButtonTextActive: {
    fontFamily: fontTypes.bold,
    fontSize: size.xsmall,
  },
  perfumeDetailsFilterButtonTextActive: {
    fontFamily: fontTypes.medium,
    fontSize: size.xsmall,
  },
  perfumeName: {
    fontFamily: fontTypes.black,
    fontSize: size.h1,
  },
  buttonText: {
    fontFamily: fontTypes.bold,
    fontSize: size.xsmall,
  },
  affilateLink: {
    fontFamily: fontTypes.sourceSansProRegular,
    fontSize: size.xsmall,
  },
  favouritePerfumeName: {
    fontFamily: fontTypes.semiBold,
    fontSize: size.small,
  },
  xsmallBase: {
    fontFamily: fontTypes.base,
    fontSize: size.xsmall,
  },
  regularBase: {
    fontFamily: fontTypes.base,
    fontSize: size.regular,
  },
  regularMedium: {
    fontFamily: fontTypes.medium,
    fontSize: size.regular,
  },
  smallMedium: {
    fontFamily: fontTypes.medium,
    fontSize: size.small,
  },
  xsmallMedium: {
    fontFamily: fontTypes.medium,
    fontSize: size.xsmall,
  },
  tinyMedium: {
    fontFamily: fontTypes.medium,
    fontSize: size.tiny,
  },
  tinySemiBold: {
    fontFamily: fontTypes.semiBold,
    fontSize: size.tiny,
  },
  errorBold: {
    fontFamily: fontTypes.bold,
    fontSize: size.error,
  },
};

export default {
  fontTypes,
  size,
  style,
};
