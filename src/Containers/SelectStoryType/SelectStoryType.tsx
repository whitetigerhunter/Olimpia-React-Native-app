import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker/src';
// import * as ImagePicker from 'react-native-image-picker';

// import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { ScreenTemplate, SelectStoryTypeItem, Panel } from 'app/Components';
import * as types from 'app/Constants/types';
import { Route } from 'app/Navigators';
import { AnalyticsService, AnalyticsEvent } from 'app/Services';
import { Colors, Metrics, Metricstablet, Fonts, FontsTablet } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';
import { RootState } from '../App';

interface Props {
  user: types.User;
  asComponent?: boolean;
  navigation: types.NavigationProp<Route.SelectStoryType, types.NavigationParams[Route.SelectStoryType]>;
}

class SelectStoryType extends React.PureComponent<Props> {
  handleSelect = (type: string) => {
    if (type === 'video') {
      AnalyticsService.logEvent(AnalyticsEvent.UserChooseStoryType, { type });
      this.props.navigation.navigate(Route.RecordVideo);
    } else if (type === 'audio') {
      AnalyticsService.logEvent(AnalyticsEvent.UserChooseStoryType, { type });
      this.props.navigation.navigate(Route.RecordAudio);
    } else if (type === 'text') {
      AnalyticsService.logEvent(AnalyticsEvent.UserChooseStoryType, { type });
      this.props.navigation.navigate(Route.TextStory);
    } else if (type === 'gallery') {
      AnalyticsService.logEvent(AnalyticsEvent.UserChooseStoryType, { type });
      this.handleChooseVideo();
    }
  };

  handleChooseVideo = async () => {
    const options: any = {
      noData: true,
      videoQuality: 'low',
      mediaType: 'video',
    };
    // ImagePicker.launchImageLibrary(options, async (response: any) => {
    //   if (response.uri) {
    //     const { uri } = response;
    //     const fileName = 'storage/emulated/0/DCIM/Camera/voice_note.aac';
    //     this.props.navigation.navigate(Route.ConfirmUploadStory, {
    //       video: '/' + fileName,
    //       videoPath: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
    //       videoType: 'library',
    //     });
    //   }
    // });
  };

  render() {
    const isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    const { user, asComponent } = this.props;
    const Container = asComponent ? View : (ScreenTemplate as any);
    const InnerContainer = asComponent ? View : Panel;
    return (
      <Container
        headerProps={{
          title: translate('dashboardTitle') + ' ' + user?.first_name + '!',
          showRightIcon: false,
          avatar: user?.image,
        }}
        containerStyle={styles.screenTemplateBackgroundColor}
        contentContainerStyle={styles.screenTemplateBackgroundColor}
      >
        <InnerContainer style={asComponent ? styles.innerContainer : styles.panel}>
          <Text style={styles.title}>{translate('selectStoryType')}</Text>
          <View style={styles.container}>
            <View style={styles.column}>
              <View style={styles.infoTextContainer}>
                <Icon name="alert-circle" size={isTablet ? 26 : 16} color={Colors.lightBlue} />
                <Text style={styles.infoText}>{translate('selectStoryTypeInfoText')}</Text>
              </View>
              <SelectStoryTypeItem
                type="video"
                iconName="video"
                text={translate('selectStoryTypeRecordVideoText')}
                onSelect={this.handleSelect}
              />

            </View>
            <View style={styles.column}>
              <SelectStoryTypeItem
                type="audio"
                iconName="mic"
                text={translate('selectStoryTypeRecordAudioText')}
                onSelect={this.handleSelect}
              />
                <SelectStoryTypeItem
                    type="text"
                    iconName="edit-3"
                    text={translate('selectStoryTypeCompleteFormText')}
                    onSelect={this.handleSelect}
                />
              {/*<SelectStoryTypeItem*/}
                {/*type="gallery"*/}
                {/*iconName="image"*/}
                {/*text={translate('selectStoryTypeGalleryText')}*/}
                {/*onSelect={this.handleSelect}*/}
              {/*/>*/}
            </View>
          </View>
        </InnerContainer>
      </Container>
    );
  }
}

const regularStyles = StyleSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.backgroundPrimary },
  panel: {
    padding: Metrics.largeMargin,
  },
  title: {
    color: Colors.greyScaleSix,
    ...Fonts.style.h2,
  },
  innerContainer: {
    paddingHorizontal: 8,
  },
  container: {
    paddingTop: Metrics.xxlMargin,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    color: Colors.red,
    ...Fonts.style.helper,
    marginStart: 9.5,
  },
  column: { alignItems: 'center' },
  infoTextContainer: {
    flexDirection: 'row',
    width: Metrics.selectStoryTypeItemWidth,
    paddingEnd: Metrics.mediumMargin,
    paddingBottom: Metrics.margin,
  },
});
const scaledStyles = ScaledSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.backgroundPrimary },
  panel: {
    padding: Metricstablet.largeMargin,
  },
  title: {
    color: Colors.greyScaleSix,
    ...FontsTablet.style.h2,
  },
  innerContainer: {
    paddingHorizontal: 8,
  },
  container: {
    paddingTop: Metricstablet.xxlMargin,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    color: Colors.red,
    ...FontsTablet.style.helper,
    marginStart: 9.5,
  },
  column: { alignItems: 'center' },
  infoTextContainer: {
    flexDirection: 'row',
    width: Metricstablet.selectStoryTypeItemWidth,
    paddingEnd: Metricstablet.mediumMargin,
    paddingBottom: Metricstablet.margin,
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(SelectStoryType);
