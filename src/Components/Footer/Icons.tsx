import React, { PureComponent } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Colors } from '../../Theme';

interface Props {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  name: string;
  size: number;
  color: string;
}

interface State {}

class Icons extends PureComponent<Props, State> {
  static defaultProps: { onPress: () => void; style: {}; size: number; color: string };
  render() {
    return (
      <View style={this.props.style}>
        <Icon
          onPress={this.props.onPress}
          name={this.props.name}
          size={this.props.size}
          color={this.props.color}
        />
      </View>
    );
  }
}

Icons.defaultProps = {
  onPress: () => {},
  style: {},
  size: 24,
  color: Colors.snow,
};

export default Icons;
