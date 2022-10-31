import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const { width, height } = Dimensions.get('window');
let isTablet = DeviceInfo.isTablet();

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,

  doubleBaseMargin: 20,
  errorMessageTopMargin: 4,
  doubleSection: 50,
  horizontalLineHeight: 1,
  textInputHorizontalPadding: 12,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  statusBarHeight: Platform.OS === 'ios' ? 16 : 0,
  tabBarHeight: Platform.OS === 'ios' ? 40 : 50,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
  // NEW DESIGN
  tinyBorderRadius: 8,
  smallBorderRadius: 12,
  mediumBorderRadius: 16,
  largeBorderRadius: 24,
  xlargeBorderRadius: 36,
  buttonIconOnly: 44,
  buttonIconOnlyBig: 64,
  button: 48,

  filterButtonHeight: 32,
  filterButtonRightMargin: 12,
  filterButtonPaddingHorizontal: 12,
  tinyMargin: 4,
  smallMargin: 6,
  smallerMargin: 8,
  margin: 12,
  mediumMargin: 16,
  largeMargin: 24,
  doubleMediumMargin: 32,
  xlargeMargin: 36,
  xxlMargin: 42,

  panelBorderRadius: 24,
  perfumeFilterButtonHeight: 29,
  perfumeLogo: 36,
  perfumeLogoBorderRadius: 6,

  onboardingInnerContainerHeight: height - height * 0.15,
  onboardingButtonLeftMargin: width - 100,
  screenHorizontalSize: width,
  screenVerticallSize: height,

  dot: 5,
  activewDotWidth: 23,

  textInputHeight: 44,
  seeAllButtonWidth: 90,
  listItemHeight: 56,

  perfumeCardWidth: width * 0.55,
  perfumeCardImageHeight: 155 * 0.8,
  perfumeCardImageWidth: 131 * 0.8,

  perfumeSmallCardHeight: (width - 32) / 2,
  perfumeSmallCardWidth: (width - 32 - 12) / 2,
  perfumeSmallCardImageHeight: 155 * 0.7,
  perfumeSmallCardImageWidth: 131 * 0.7,

  favouritesPaddingTop: 34,
  selectStoryTypeItemHeight: (width - 24 * 2) / 2,
  selectStoryTypeItemWidth: (width - 24 * 2 - 16) / 2,

  noteCardStaticHeight: 116,
  noteCardWidth: (width - 32 - 24) / 3,
  noteCardImageWidth: (width - 32 - 24) / 3 - 12,

  noteSelectionFooterSpace: 180,

  videoRecordCameraBottom: 51,

  bootomMarginCameraRecord: 34,

  affiliateLink: 75,
  affiliateLinkWidth: (width - 48) / 3,
  recipeListItemHeight: 84,
};

export default metrics;
