import React, { useCallback, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as types from 'app/Constants/types';
import { Colors } from 'app/Theme';
import DeviceInfo from 'react-native-device-info';

interface Props {
  onPressAction: () => void;
  small?: boolean;
  fav?: boolean | types.Perfume;
  collecionName?: any;
}

const PerfumeCardHeart = ({ onPressAction, small, fav, collecionName }: Props) => {
  const isTablet = DeviceInfo.isTablet();
  const handlePress = useCallback(() => onPressAction(), [onPressAction]);
  const Container: any = small ? TouchableOpacity : View;
  const styles = collecionName ? isCollectStyles : regularStyles;

  return (
    <Container onPress={handlePress} style={styles.heartContainer}>
      <Icon size={isTablet? 30 : 20} name={fav ? 'heart' : 'heart-o'} color={Colors.navyBlue} />
    </Container>
  );
};
const regularStyles = StyleSheet.create({
  heartContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    right: 17,
  },
});
const isCollectStyles = StyleSheet.create({
  heartContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 28,
    right: 17,
  },
});

export default memo(PerfumeCardHeart);
