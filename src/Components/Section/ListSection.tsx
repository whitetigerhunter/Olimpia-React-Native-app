import React from 'react';
import { View, Text } from 'react-native';

import styles from './Style/ListSectionStyle';

const ListSection = ({ title }: any) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

ListSection.defaultProps = {
  title: 'section',
};

export default ListSection;
