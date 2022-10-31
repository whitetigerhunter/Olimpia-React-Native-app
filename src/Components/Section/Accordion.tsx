import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';

import Icons from '../../Components/Icons';
import styles from './Style/AccordionStyle';

export default class Accordion extends Component {
  public state: any;
  public value: any;
  public props: any;
  public setState: any;
  public item: any;
  public show: any;

  static defaultProps: { show: boolean };

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      iconPosition: false,
    };
    this.value = new Animated.Value(0);
  }

  UNSAFE_componentWillReceiveProps(nextProps: { show: boolean }) {
    this.animate(nextProps.show);
  }

  animate(callapse: any) {
    Animated.spring(this.value, {
      toValue: callapse ? 1 : 0,
      friction: 5,
      tension: 2,
      useNativeDriver: true,
    }).start();
  }

  togglePress(id: any, isALink: boolean, categotyTitle: any) {
    if (!isALink) {
      this.props.navigation.navigate('DetailCategory', { id, name: categotyTitle });
    } else {
      this.props.onPress(id);
      this.setState((previousState: { iconPosition: any }) =>
        this.setState({ iconPosition: !previousState.iconPosition }),
      );
    }
  }

  render() {
    const { item, show } = this.props;
    const interpolate = this.value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const animatedStyle = {
      transform: [{ scaleY: interpolate }],
      opacity: interpolate,
    };

    const iconPosition = this.state.iconPosition ? 'angle-down' : 'angle-right';
    return (
      <TouchableWithoutFeedback
        onPress={() => this.togglePress(item.id_categorie, !!item.children, item.name)}
      >
        <Animated.View style={[animatedStyle]}>
          {show ? (
            <View style={[styles.header, { paddingLeft: item.depth * 10 }]}>
              <Text style={[styles.headerTitle]}>{item.name}</Text>
              {item.children && (
                <Icons
                  onPress={() => this.togglePress(item.id_categorie, !!item.children, item.name)}
                  name={iconPosition}
                  size={18}
                />
              )}
            </View>
          ) : null}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

Accordion.defaultProps = {
  show: false,
};
