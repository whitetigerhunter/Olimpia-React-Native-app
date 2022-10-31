import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { Colors } from '../../Theme';
import regularStyles from './Style';
import scaledStyles from './TabletStyle';
import DeviceInfo from 'react-native-device-info';

interface Props extends TextInputProps {
  ref?: any;
  disabled?: boolean;
  textColor?: string;
  tintColor?: string;
  label?: string;
  labelStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  password?: boolean;
  errorText?: string;
  helperText?: string;
  onSubmitEditing?: () => void;
  onChangeText: (text: string) => void;
  value?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

interface State {
  icEye: string;
  password?: boolean;
  value?: string;
  focused: boolean;
}

export default class Input extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      icEye: 'visibility-off',
      password: this.props.password,
      value: this.props.value,
      focused: false,
    };
  }

  inputRef = React.createRef<TextInput>();
  onTextChange(value: string) {
    this.setState({ value });
    this.props.onChangeText(value);
  }
  changePwdType = () => {
    let newState;
    if (this.state.password) {
      newState = {
        icEye: 'visibility',
        password: false,
      };
    } else {
      newState = {
        icEye: 'visibility-off',
        password: true,
      };
    }
    this.setState(newState);
  };

  focus() {
    this.inputRef?.current?.focus();
  }

  handleOnFocus = () => this.setState({ focused: true });

  handleOnBlur = () => this.setState({ focused: false });

  render() {
    let isTablet = DeviceInfo.isTablet();
    const Style = isTablet ? scaledStyles : regularStyles;
    const icon = this.state.password
      ? require('../../Assets/Images/hide.png')
      : require('../../Assets/Images/view.png');
    const {
      label,
      disabled,
      onSubmitEditing,
      placeholder,
      inputContainerStyle,
      errorText,
      helperText,
      password,
      textStyle,
    } = this.props;
    const { focused } = this.state;
    return (
      <View style={[Style.container, this.props.containerStyle]}>
        {label && <Text style={Style.label}>{label.toUpperCase()}</Text>}
        <View
          style={[
            Style.inputContainer,
            inputContainerStyle,
            focused && Style.focused,
            !!errorText && Style.errorFocused,
          ]}
        >
          <TextInput
            ref={this.inputRef}
            {...this.props}
            editable={!disabled}
            secureTextEntry={this.state.password}
            onChangeText={(value: string) => this.onTextChange(value)}
            returnKeyType="next"
            onSubmitEditing={onSubmitEditing}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            blurOnSubmit={false}
            placeholder={placeholder}
            placeholderTextColor={Colors.greyScaleFour}
            style={[Style.input, textStyle, !!errorText && Style.errorFontColor]}
          />
          {password && (
            <TouchableOpacity style={Style.iconContainer} onPress={this.changePwdType}>
              <Image source={icon} style={Style.icon} />
            </TouchableOpacity>
          )}
        </View>
        {!!errorText && <Text style={Style.error}>{errorText}</Text>}
        {!!helperText && !errorText && <Text style={Style.helper}>{helperText}</Text>}
      </View>
    );
  }
}
