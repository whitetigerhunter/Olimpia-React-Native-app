import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Fonts, Metrics } from '../../Theme';

interface Props {
  size: number;
  number: number;
}

const Badge = (props: Props) =>
  props.number ? (
    <View
      style={[
        styles.container,
        {
          height: props.size,
          width: props.size,
          borderRadius: props.size / 2,
        },
      ]}
    >
      <Text style={styles.text}>{props.number}</Text>
    </View>
  ) : null;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: Metrics.baseMargin / 2,
    right: Metrics.doubleBaseMargin,
  },
  text: {
    color: Colors.backgroundSecondary,
    fontSize: 10,
    fontFamily: Fonts.fontTypes.base,
    fontWeight: 'bold',
  },
});

Badge.defaultProps = {
  size: 20,
  number: null,
};
export default Badge;
