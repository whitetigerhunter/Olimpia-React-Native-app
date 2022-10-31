import React from 'react';
import { View, Text, TouchableOpacity, TextStyle, ViewStyle, StyleProp } from 'react-native';

import LinkStyle from './LinkStyle';

interface Props {
  onPress: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle: TextStyle;
}

const Link = ({ onPress, children, style, textStyle }: Props) => (
  <View style={[LinkStyle.viewLink, style]}>
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'transparent' }}>
      <Text numberOfLines={1} style={[LinkStyle.LinkStyle, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  </View>
);

export default Link;
