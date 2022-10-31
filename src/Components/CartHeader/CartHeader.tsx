import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { View, Text, ViewStyle, StyleProp } from 'react-native';

import styles from './styles';

interface Props {
  number: number;
}

interface State {
  number1: StyleProp<ViewStyle>;
  number2: StyleProp<ViewStyle>;
  number3: StyleProp<ViewStyle>;
  number4: StyleProp<ViewStyle>;
  separator1: StyleProp<ViewStyle>;
  separator2: StyleProp<ViewStyle>;
  separator3: StyleProp<ViewStyle>;
}
export default class CartHeader extends React.PureComponent<Props, State> {
  number1: View | null | undefined;
  number2: View | null | undefined;
  number3: View | null | undefined;
  number4: View | null | undefined;
  constructor(props: Props) {
    super(props);

    this.state = {
      number1: styles.numberInactive,
      number2: styles.numberInactive,
      number3: styles.numberInactive,
      number4: styles.numberInactive,
      separator1: styles.separatorInactive,
      separator2: styles.separatorInactive,
      separator3: styles.separatorInactive,
    };
  }
  UNSAFE_componentWillMount() {
    if (this.props.number === 1) {
      this.setState({ number1: styles.numberActive });
      this.setState({ number2: styles.numberInactive });
      this.setState({ number3: styles.numberInactive });
      this.setState({ number4: styles.numberInactive });
      this.setState({ separator1: styles.separatorInactive });
      this.setState({ separator2: styles.separatorInactive });
      this.setState({ separator3: styles.separatorInactive });
    }
    if (this.props.number === 2) {
      this.setState({ number1: styles.numberActive });
      this.setState({ number2: styles.numberActive });
      this.setState({ number3: styles.numberInactive });
      this.setState({ number4: styles.numberInactive });
      this.setState({ separator1: styles.separatorActive });
      this.setState({ separator2: styles.separatorInactive });
      this.setState({ separator3: styles.separatorInactive });
    }
    if (this.props.number === 3) {
      this.setState({ number1: styles.numberActive });
      this.setState({ number2: styles.numberActive });
      this.setState({ number3: styles.numberActive });
      this.setState({ number4: styles.numberInactive });
      this.setState({ separator1: styles.separatorActive });
      this.setState({ separator2: styles.separatorActive });
      this.setState({ separator3: styles.separatorInactive });
    }
    if (this.props.number === 4) {
      this.setState({ number1: styles.numberActive });
      this.setState({ number2: styles.numberActive });
      this.setState({ number3: styles.numberActive });
      this.setState({ number4: styles.numberActive });
      this.setState({ separator1: styles.separatorActive });
      this.setState({ separator2: styles.separatorActive });
      this.setState({ separator3: styles.separatorActive });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          ref={(c) => {
            this.number1 = c;
          }}
          style={this.state.number1}
        >
          <Text style={styles.text}>1</Text>
        </View>
        <View style={this.state.separator1} />
        <View
          ref={(c) => {
            this.number2 = c;
          }}
          style={this.state.number2}
        >
          <Text style={styles.text}>2</Text>
        </View>
        <View style={this.state.separator2} />
        <View
          ref={(c) => {
            this.number3 = c;
          }}
          style={this.state.number3}
        >
          <Text style={styles.text}>3</Text>
        </View>
        <View style={this.state.separator3} />
        <View
          ref={(c) => {
            this.number4 = c;
          }}
          style={this.state.number4}
        >
          <Text style={styles.text}>4</Text>
        </View>
      </View>
    );
  }
}
