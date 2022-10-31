import React, { memo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors, Metrics } from 'app/Theme';

interface Props {
  onPress: (mode: 'remove' | 'add') => void;
  isFavorite: boolean;
  style?: StyleProp<ViewStyle>;
}

const PerfumeDetailsHeart = ({ style, onPress, isFavorite }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(isFavorite ? 'remove' : 'add')}>
      <View style={[styles.container, style]}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} color={Colors.greyScaleOne} size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.xlargeMargin,
    height: Metrics.xlargeMargin,
    borderRadius: Metrics.smallBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.navyBlue,
  },
});

export default memo(PerfumeDetailsHeart);
