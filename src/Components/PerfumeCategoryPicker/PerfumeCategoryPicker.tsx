import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import FemaleIcon from 'app/Assets/Images/female.svg';
import MaleIcon from 'app/Assets/Images/male.svg';
import UnisexIcon from 'app/Assets/Images/unisex.svg';
import * as enums from 'app/Constants/enums';

import { translate } from '../../translations/translationHelpers';
import regularStyles from './styles';
import scaledStyles from './stylesTablet';
import DeviceInfo from 'react-native-device-info';

interface Props {
  onPress: (categories: string[]) => void;
}

const PerfumeCategoryPicker = ({ onPress }: Props) => {
  let isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  const [pressed, setPressed] = useState<string[]>([enums.PerfumeCategories.Normal]);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    if (pressed.length > 0 && !initialLoad) onPress(pressed);
  }, [pressed, initialLoad, onPress]);

  const handlePress = useCallback(
    (category: string) => {
      if (initialLoad) {
        setInitialLoad(false);
      }

      if (category === enums.PerfumeCategories.Normal) {
        return setPressed([enums.PerfumeCategories.Normal]);
      }

      if (pressed.includes(enums.PerfumeCategories.Normal)) {
        const updatedArr = pressed.filter((item) => item !== enums.PerfumeCategories.Normal);
        setPressed(updatedArr);
      }

      if (
        (category === enums.PerfumeCategories.Premium && pressed.includes(enums.PerfumeCategories.Niche)) ||
        (category === enums.PerfumeCategories.Niche && pressed.includes(enums.PerfumeCategories.Premium))
      ) {
        return;
      }

      const multiSelectBehaviour = false;

      if (multiSelectBehaviour) {
          if (pressed.includes(category)) {
              const updatedArr = pressed.filter((item) => item !== category);
              setPressed(updatedArr);
          } else {
              setPressed((oldArray) => [...oldArray, category]);
          }
      } else {
          setPressed([category]);
      }
    },
    [pressed, initialLoad],
  );

  const buttonCategories = [
    enums.PerfumeCategories.Normal,
    enums.PerfumeCategories.Perfume,
    enums.PerfumeCategories.Hair,
    enums.PerfumeCategories.Body,
    enums.PerfumeCategories.Home,
    enums.PerfumeCategories.Oil,
    enums.PerfumeCategories.Unisex,
    enums.PerfumeCategories.Female,
    enums.PerfumeCategories.Male,
    // enums.PerfumeCategories.Premium,
    // enums.PerfumeCategories.Niche,
    // enums.PerfumeCategories.Clean,
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {buttonCategories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[styles.pickerButton, pressed.includes(category) && styles.pickerButtonPressed]}
          onPress={() => handlePress(category)}
        >
          {category === 'female' ? (
            <FemaleIcon style={pressed.includes(category) ? styles.iconActive : styles.icon} />
          ) : category === 'male' ? (
            <MaleIcon style={pressed.includes(category) ? styles.iconActive : styles.icon} />
          ) : category === 'unisex' ? (
            <UnisexIcon style={pressed.includes(category) ? styles.iconActive : styles.icon} />
          ) : (
            <Text
              style={[
                styles.pickerButtonTextStyle,
                pressed.includes(category) && styles.pickerButtonTextStylePressed,
              ]}
            >
              {translate(category)}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PerfumeCategoryPicker;
