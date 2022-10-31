import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const { width, height } = Dimensions.get('window');
let isTablet = DeviceInfo.isTablet();

// Used via Metrics.baseMargin
const Metricstablet = {
  marginHorizontal: isTablet ? "10@ms" : 10,
  marginVertical: isTablet ? "10@ms" : 10,
  section: isTablet ? "25@ms" : 25,
  baseMargin: 20,

  doubleBaseMargin : 40,
  errorMessageTopMargin: isTablet ? "4@ms" : 4,
  doubleSection: isTablet ? "50@ms" : 50,
  horizontalLineHeight: isTablet ? "1@ms" : 1,
  textInputHorizontalPadding: isTablet ? "12@ms" : 12,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : isTablet ? "54@ms" : 54,
  statusBarHeight: Platform.OS === 'ios' ? 16 : 0,
  tabBarHeight: Platform.OS === 'ios' ? 40 : isTablet ? "50@ms" : 50,
  buttonRadius: isTablet ? "4@ms" : 4,
  icons: {
    tiny: isTablet ? "15@ms" : 15,
    small: isTablet ? "20@ms" : 20,
    medium: isTablet ? "30@ms" : 30,
    large: isTablet ? "45@ms" : 45,
    xl: isTablet ? "50@ms" : 50,
  },
  images: {
    small: isTablet ? "20@ms" : 20,
    medium: isTablet ? "40@ms" : 40,
    large: isTablet ? "60@ms" : 60,
    logo: isTablet ? "200@ms" : 200,
  },
  // NEW DESIGN
  tinyBorderRadius: "8@ms",
  smallBorderRadius: "12@ms",
  mediumBorderRadius: "16@ms",
  largeBorderRadius: "24@ms",
  xlargeBorderRadius: "36@ms",
  buttonIconOnly: isTablet ? "44@ms" : 44,
  buttonIconOnlyBig: isTablet ? "64@ms" : 64,
  button: isTablet ? "48@ms" : 48,

  filterButtonHeight: isTablet ? "32@ms" : 32,
  filterButtonRightMargin: isTablet ? "12@ms" : 12,
  filterButtonPaddingHorizontal: isTablet ? "12@ms" : 12,
  tinyMargin: isTablet ? "4@ms" : 4,
  smallMargin: isTablet ? "6@ms" : 6,
  smallerMargin: isTablet ? "8@ms" : 8,
  margin: isTablet ? "12@ms" : 12,
  mediumMargin: isTablet ? "16@ms" : 16,
  largeMargin: isTablet ? "24@ms" : 24,
  doubleMediumMargin: 64,
  xlargeMargin: isTablet ? "36@ms" : 36,
  xxlMargin: isTablet ? "42@ms" : 42,

  panelBorderRadius: isTablet ? "24@ms" : 24,
  perfumeFilterButtonHeight: isTablet ? "29@ms" : 29,
  perfumeLogo: isTablet ? "36@ms" : 36,
  perfumeLogoBorderRadius: isTablet ? "6@ms" : 6,

  onboardingInnerContainerHeight: height - height * 0.15,
  onboardingButtonLeftMargin: width - 160,
  screenHorizontalSize: width,
  screenVerticallSize: height,

  dot: isTablet ? "5@ms" : 5,
  activewDotWidth: isTablet ? "23@ms" : 23,

  textInputHeight: isTablet ? "44@ms" : 44,
  seeAllButtonWidth: isTablet ? "90@ms" : 90,
  listItemHeight: isTablet ? "56@ms" : 56,

  perfumeCardWidth: width * 0.55,
  perfumeCardImageHeight: 155 * 0.8,
  perfumeCardImageWidth: 131 * 0.8,

  perfumeSmallCardHeight: (width - 32) / 2,
  perfumeSmallCardWidth: (width - 32 - 12) / 2,
  perfumeSmallCardImageHeight: 155 * 0.7,
  perfumeSmallCardImageWidth: 131 * 0.7,

  favouritesPaddingTop: isTablet ? "34@ms" : 34,
  selectStoryTypeItemHeight: (width - 44 * 2) / 2,
  selectStoryTypeItemWidth: (width - 44 * 2 - 16) / 2,

  noteCardStaticHeight: isTablet ? "116@ms" : 116,
  noteCardWidth: (width - 32 - 24) / 3,
  noteCardImageWidth: (width - 32 - 24) / 3 - 12,

  noteSelectionFooterSpace: isTablet ? "180@ms" : 180,

  videoRecordCameraBottom: isTablet ? "51@ms" : 51,

  bootomMarginCameraRecord: isTablet ? "34@ms" : 34,

  affiliateLink: isTablet ? "75@ms" : 75,
  affiliateLinkWidth: (width - 48) / 3,
  recipeListItemHeight: isTablet ? "84@ms" : 84,
};

export default Metricstablet;
