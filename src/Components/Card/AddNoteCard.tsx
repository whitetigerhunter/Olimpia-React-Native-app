import React, { useCallback, memo } from 'react';
import { View, Text } from 'react-native';

import { Button } from 'app/Components';
import { translate } from 'app/translations/translationHelpers';
import DeviceInfo from 'react-native-device-info';
import regularStyles from './Style/AddNoteCardStyle';
import scaledStyles from './Style/AddNoteCardStyleTablet';

interface Props {
  onSelect: () => void;
}

const AddNoteCard = ({ onSelect }: Props) => {
  const handlePress = useCallback(() => onSelect(), [onSelect]);
  let isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {translate('addNote')} <Text style={styles.textBolder}>{translate('addIt')}</Text>
        </Text>
      </View>
      <View style={styles.buttonConatiner}>
        <Button iconName="plus" iconOnlyBig iconOnlyBigSize={21.3} primary style={styles.button} onPress={handlePress} />
      </View>
    </View>
  );
};

export default memo(AddNoteCard);
