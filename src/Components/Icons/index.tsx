import React from 'react';
import { View, TouchableWithoutFeedback, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Colors } from '../../Theme/';

interface Props {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  name: string;
  size: number;
  color: string;
  material: boolean;
}

const Icons = (props: Props) => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View style={props.style}>
      {props.material ? (
        <MaterialIcon name={props.name} size={props.size} color={props.color} />
      ) : (
        <Icon name={props.name} size={props.size} color={props.color} />
      )}
    </View>
  </TouchableWithoutFeedback>
);

Icons.defaultProps = {
  onPress: () => {},
  style: { paddingHorizontal: 10 },
  size: 24,
  color: Colors.lightBlue,
  material: false,
};

export default Icons;
