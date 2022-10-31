import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderRegister from 'app/Components/Header/HeaderRegister';
import NavigationService from 'app/Services/NavigationService';
import { Colors, Metrics } from 'app/Theme';

interface Props {
  title: string;
  canNavigateBack?: boolean;
}

export class WhiteScreenTemplate extends React.PureComponent<Props> {
  navigateBack = () => NavigationService.goBack();

  render() {
    const { children, title, canNavigateBack } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.backgroundSecondary} barStyle="dark-content" translucent />
        <HeaderRegister title={title} onPressLeftIcon={this.navigateBack} leftIcon={canNavigateBack} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.contentContainer}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default WhiteScreenTemplate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: Metrics.mediumMargin,
    paddingBottom: Metrics.mediumMargin,
    backgroundColor: Colors.backgroundSecondary,
  },
});
