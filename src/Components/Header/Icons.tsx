import React, { PureComponent } from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Colors } from '../../Theme';

interface Props {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
  name: any;
  size: number;
  color: string;
}

class Icons extends PureComponent<Props> {
  static defaultProps: { onPress: () => void; style: {}; size: number; color: string };

  render() {
    const { style, onPress, name, size, color } = this.props;
    return (
      <TouchableOpacity style={[styles.touchable, style]} onPress={onPress}>
        <FeatherIcon name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  }
}

Icons.defaultProps = {
  onPress: () => {},
  style: {},
  size: 24,
  color: Colors.blue,
};

export default Icons;

const styles = StyleSheet.create({
  touchable: {
    padding: 12,
  },
});
