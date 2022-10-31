import React from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  StatusBar,
  StatusBarStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { Loader } from 'app/Components';
import { Colors } from 'app/Theme';

import HeaderBlue, { HeaderBlueProps } from '../Header/HeaderBlue';
import Header, { HeaderProps } from '../Header/HomeHeader';

interface Props {
  headerProps?: Partial<HeaderProps>;
  headerBlueProps?: Partial<HeaderBlueProps>;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isLoading?: boolean;
  noScroll?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  statusBarType?: null | StatusBarStyle;
  safeAreaEdges?: ReadonlyArray<Edge>;
}

class ScreenTemplate extends React.PureComponent<Props> {
  render() {
    const {
      headerProps,
      headerBlueProps,
      children,
      footer,
      header,
      isLoading,
      containerStyle,
      contentContainerStyle,
      noScroll,
      statusBarType,
      safeAreaEdges,
    } = this.props;
    const Container = noScroll ? View : ScrollView;
    return (
      <SafeAreaView edges={safeAreaEdges} style={[styles.container, containerStyle]}>
        <StatusBar
          backgroundColor="transparent"
          barStyle={statusBarType ? statusBarType : 'dark-content'}
          translucent
        />
        {headerProps ? <Header {...headerProps} /> : <HeaderBlue {...headerBlueProps} />}
        {header}
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          <Container
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          >
            {children}
          </Container>
        )}
        {footer}
      </SafeAreaView>
    );
  }
}

export default ScreenTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
});
