import React from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { ScreenTemplate, VideoRecordCamera } from 'app/Components';

import * as types from '../../Constants/types';
import { Route } from '../../Navigators';
import { Colors } from '../../Theme';
import { translate } from '../../translations/translationHelpers';
import { RootState } from '../App';

interface Props {
  navigation: types.NavigationProp<Route.RecordVideo, types.NavigationParams[Route.RecordVideo]>;
}

class VideoRecord extends React.PureComponent<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <ScreenTemplate
        headerBlueProps={{ title: translate('storyTime') }}
        noScroll
        containerStyle={styles.screenTemplateBackgroundColor}
        contentContainerStyle={styles.screenTemplateBackgroundColor}
        statusBarType="light-content"
      >
        <VideoRecordCamera navigation={navigation} />
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
});

const mapStateToProps = (state: RootState) => ({
  perfumes: state.user.perfumes,
  user: state.user.user,
});

export default withNavigation(connect(mapStateToProps, null)(VideoRecord as any));
