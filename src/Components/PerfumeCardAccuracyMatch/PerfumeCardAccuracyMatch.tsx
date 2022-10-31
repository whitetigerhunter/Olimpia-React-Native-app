import React, { memo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Colors, Fonts, Metrics, Typography } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

interface Props {
  match: number;
  style?: StyleProp<ViewStyle>;
}

const PerfumeCardAccuracyMatch = ({ match, style }: Props) => {
  return (

      <View></View>
    // <View style={[styles.matchContainer, style]}>
    //   <Text style={styles.matchNumber}>{match}%</Text>
    //   <Text style={styles.matchText}>{translate('perfumeMatch')}</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  matchContainer: {
    width: Metrics.xlargeMargin,
    height: Metrics.xlargeMargin,
    borderWidth: 2,
    borderColor: Colors.navyBlue,
    borderRadius: Metrics.smallBorderRadius,
    position: 'absolute',
    zIndex: 1,
    top: 15,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchText: {
    ...Fonts.style.tinyMedium,
    color: Colors.greyScaleFive,
    lineHeight: Typography.tinyLineHeight,
  },
  matchNumber: {
    ...Fonts.style.errorBold,
    color: Colors.navyBlue,
  },
});

export default memo(PerfumeCardAccuracyMatch);
