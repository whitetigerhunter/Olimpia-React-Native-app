import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';

import Images from '../../Theme/Images';
import Style from './styles';

interface State {
  icEye: string;
  checked: boolean;
}
export default class Checkbox extends React.PureComponent<null, State> {
  state = {
    icEye: 'visibility-off',
    checked: true,
  };

  changePwdType = () => {
    let newState;
    if (this.state.checked) {
      newState = {
        icEye: 'visibility',
        checked: false,
      };
    } else {
      newState = {
        icEye: 'visibility-off',
        checked: true,
      };
    }

    // set new state value
    this.setState(newState);
  };

  render() {
    const icon = this.state.checked ? Images.unCheck : Images.check;
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.changePwdType}>
          <Image source={icon} style={Style.image} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
