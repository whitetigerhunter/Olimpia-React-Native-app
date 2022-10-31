import React from 'react';
import { StyleProp, Text, TextStyle, TouchableHighlight, View, ViewStyle, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconAuth from 'react-native-vector-icons/FontAwesome';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';
import { Colors, Metrics, Metricstablet, Fonts, FontsTablet } from '../../Theme';

interface Props {
  onPress?: () => void;
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  ghost?: boolean;
  text?: string;
  transparent?: boolean;
  iconName?: string;
  iconOnlyBigSize?: number;
  iconRight?: boolean;
  iconLeft?: boolean;
  iconOnly?: boolean;
  iconOnlyBig?: boolean;
  iconAuthName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconColor?: string;
}

const Button = ({
  onPress,
  disabled,
  primary,
  secondary,
  ghost,
  text,
  transparent,
  iconName,
  iconOnlyBigSize,
  iconRight,
  iconLeft,
  iconOnly,
  iconOnlyBig,
  iconAuthName,
  style,
  textStyle,
  iconColor,
}: Props) => {
  let isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  const handleOnPress = () => {
    onPress && onPress();
  };

  const iconTint: any = iconColor
    ? iconColor
    : transparent
    ? Colors.greyScaleSix
    : primary || secondary
    ? Colors.greyScaleOne
    : ghost
    ? Colors.primaryGold
    : disabled
    ? Colors.greyScaleFour
    : disabled && transparent && Colors.greyScaleFive;

  const buttonStyles: any =
    (disabled && iconLeft && transparent) || (disabled && iconRight && transparent)
      ? [styles.button, styles.buttonTransparent, style]
      : disabled && iconOnlyBig
      ? [styles.button, styles.buttonDisabled, styles.buttonIconOnlyBig, style]
      : disabled && transparent
      ? [styles.button, styles.buttonTransparent, style]
      : disabled && !ghost && !iconOnly
      ? [styles.button, styles.buttonDisabled, style]
      : disabled && ghost && !iconOnly
      ? [styles.button, styles.buttonGhostDisabled, style]
      : disabled && !ghost && iconOnly
      ? [styles.button, styles.buttonDisabled, styles.buttonIconOnly, style]
      : disabled && ghost && iconOnly
      ? [styles.button, styles.buttonDisabled, styles.buttonIconOnly, styles.buttonGhostDisabled, style]
      : [
          styles.button,
          primary && styles.buttonPrimary,
          secondary && styles.buttonSecondary,
          ghost && styles.buttonGhost,
          iconOnly && styles.buttonIconOnly,
          iconOnlyBig && styles.buttonIconOnlyBig,
          style,
        ];

  return (
    <TouchableHighlight
      disabled={disabled}
      underlayColor={buttonStyles}
      onPress={handleOnPress}
      style={buttonStyles}
    >
      <View style={styles.row}>
        {iconLeft && (
          <Icon
            name={iconName || 'chevron-left'}
            color={iconTint}
            style={[styles.icon, styles.iconLeft, disabled && styles.iconDisabled]}
          />
        )}

        {iconAuthName && (
          <IconAuth
            name={iconAuthName}
            color={iconColor ? iconColor : iconTint}
            style={[styles.icon, isTablet&&scaledStyles.iconAuth, styles.iconLeft, disabled && styles.iconDisabled]}
          />
        )}

        {iconOnly && (
          <Icon
            name={iconName || 'chevron-left'}
            color={iconColor ? iconColor : iconTint}
            style={[
              styles.icon,
              disabled && styles.iconDisabled,
              disabled && transparent && styles.iconTextDisabled,
            ]}
          />
        )}
        {iconOnlyBig && (
          <Icon
            name={iconName || 'chevron-right'}
            color={iconColor ? iconColor : iconTint}
            style={[
              styles.icon,
              disabled && styles.iconDisabled,
              disabled && transparent && styles.iconTextDisabled,
            ]}
            size={iconOnlyBigSize}
          />
        )}
        {text && (
          <Text
            style={
              disabled && !transparent
                ? [styles.text, styles.textDisabled, textStyle]
                : disabled && transparent
                ? [styles.text, styles.textOnlyDisabled, textStyle]
                : [styles.text, ghost && styles.textGhost, transparent && styles.textText, textStyle]
            }
          >
            {text.toUpperCase()}
          </Text>
        )}
        {iconRight && (
          <Icon
            name={iconName || 'chevron-right'}
            color={iconColor ? iconColor : iconTint}
            style={[styles.icon, styles.iconRight, disabled && styles.iconDisabled]}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};

const regularStyles = StyleSheet.create({
  text: {
    color: Colors.greyScaleOne,
    ...Fonts.style.buttonText,
  },
  textDisabled: {
    color: Colors.greyScaleFour,
  },
  textGhost: {
    color: Colors.primaryGold,
  },
  textText: { color: Colors.greyScaleSix },
  textOnlyDisabled: { color: Colors.greyScaleFive },

  button: {
    paddingVertical: Metrics.margin,
    paddingHorizontal: Metrics.mediumMargin,
    borderRadius: Metrics.mediumBorderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.greyScaleThree,
  },
  buttonPrimary: { backgroundColor: Colors.navyBlue },
  buttonSecondary: { backgroundColor: Colors.primaryGold },

  buttonGhost: { borderColor: Colors.primaryGold, borderWidth: 1 },
  buttonGhostDisabled: {
    borderColor: Colors.greyScaleFour,
    borderWidth: 1,
    backgroundColor: Colors.greyScaleTwo,
  },
  buttonTransparent: {
    backgroundColor: Colors.transparent,
  },

  row: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
  },
  iconLeft: {
    right: 5,
  },
  iconRight: {
    left: 5,
  },
  iconDisabled: {
    color: Colors.greyScaleFour,
  },
  iconTextDisabled: {
    color: Colors.greyScaleFive,
  },
  buttonIconOnly: {
    width: Metrics.buttonIconOnly,
    height: Metrics.buttonIconOnly,
  },
  buttonIconOnlyBig: {
    width: Metrics.buttonIconOnlyBig,
    height: Metrics.buttonIconOnlyBig,
    borderRadius: Metrics.largeBorderRadius,
    justifyContent: 'center',
  },
});
const scaledStyles = ScaledSheet.create({
  text: {
    color: Colors.greyScaleOne,
    ...FontsTablet.style.buttonText,
  },
  textDisabled: {
    color: Colors.greyScaleFour,
  },
  textGhost: {
    color: Colors.primaryGold,
  },
  textText: { color: Colors.greyScaleSix },
  textOnlyDisabled: { color: Colors.greyScaleFive },

  button: {
    paddingVertical: Metricstablet.margin,
    paddingHorizontal: Metricstablet.mediumMargin,
    borderRadius: Metricstablet.mediumBorderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.greyScaleThree,
  },
  buttonPrimary: { backgroundColor: Colors.navyBlue },
  buttonSecondary: { backgroundColor: Colors.primaryGold },

  buttonGhost: { borderColor: Colors.primaryGold, borderWidth: 1 },
  buttonGhostDisabled: {
    borderColor: Colors.greyScaleFour,
    borderWidth: 1,
    backgroundColor: Colors.greyScaleTwo,
  },
  buttonTransparent: {
    backgroundColor: Colors.transparent,
  },

  row: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
  },
  iconAuth:{
    fontSize:25,
  },
  iconLeft: {
    right: "5@ms",
  },
  iconRight: {
    left: "5@ms",
    fontSize: "14@ms",
  },
  iconDisabled: {
    color: Colors.greyScaleFour,
  },
  iconTextDisabled: {
    color: Colors.greyScaleFive,
  },
  buttonIconOnly: {
    width: Metricstablet.buttonIconOnly,
    height: Metricstablet.buttonIconOnly,
  },
  buttonIconOnlyBig: {
    width: Metricstablet.buttonIconOnlyBig,
    height: Metricstablet.buttonIconOnlyBig,
    borderRadius: Metricstablet.largeBorderRadius,
    justifyContent: 'center',
  },
});

export default Button;
