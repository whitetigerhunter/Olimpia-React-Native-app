import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { ScreenTemplate, Panel, VideoRecordDescription, Footer } from 'app/Components';
import VideoPlayer from 'app/Components/VideoPlayer/VideoPlayer';
import * as types from 'app/Constants/types';
import { AppDispatch, RootState } from 'app/Containers/App';
import { Route } from 'app/Navigators';
import UploadStoryActions from 'app/State/UploadStoryRedux';
import { Colors, Metrics, Metricstablet } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';
import { ScaledSheet } from 'react-native-size-matters';
import DeviceInfo from 'react-native-device-info';

interface Props {
  navigation: types.NavigationProp<
    Route.ConfirmUploadStory,
    types.NavigationParams[Route.ConfirmUploadStory]
  >;
  token: string;
  user: types.User;
  fetching: boolean;
  uploadStory: (story: any, token: string, videoURL: string, callback: (res: any) => void) => void;
}

interface State {
  loading: boolean;
}

interface LangProps {
    key: string,
    name: string
}

class ConfirmUploadStory extends React.PureComponent<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      isSelectedLang: 'auto'
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.fetching !== prevState.loading) {
      return { loading: nextProps.fetching };
    }
    return null;
  }

  navigateNoteSelection = () => {
    const { videoPath, videoType, video, language } = this.props.navigation.state.params as any;
    const lang = this.state.isSelectedLang;
    this.props.navigation.navigate(Route.NoteSelection, { videoPath, videoType, video, language, lang });
  };

  render() {
    let isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    const { videoPath, videoType, textStory } = this.props.navigation.state.params as any;
    const { loading } = this.state;
    const { navigation } = this.props;


    const languages = [
      {
        key: 'auto',
        name: 'Auto'
      },
      {
        key: 'en',
        name: 'English'
      },
      {
        key: 'fr',
        name: 'French'
      },
      {
        key: 'ar',
        name: 'Arabic'
      },
      {
        key: 'ch',
        name: 'Chinese'
      },
    ];
      const languageItem = (lang: LangProps) => {
        const isSelected = this.state.isSelectedLang == lang.key;
        return (
          <TouchableOpacity
              key={lang.key}
              onPress={() => handleLangPress(lang)}
              style={[styles.languageItem, isSelected && styles.languageItemSelected]}>
              <Text style={[ styles.languageItemText, isSelected && styles.languageItemTextSelected ]}>{ lang.name }</Text>
          </TouchableOpacity>
        )
      }

      const handleLangPress = (lang: LangProps) => {
          this.setState(prevState => ({
              isSelectedLang: lang.key
          }));
      };


    return (
      <ScreenTemplate
        headerBlueProps={{
          title: loading ? translate('findPersonalizedRecipe') : translate('storyTime'),
        }}
        noScroll
        containerStyle={styles.screenTemplateBackgroundColor}
        contentContainerStyle={styles.container}
        statusBarType="light-content"
      >

        <Panel style={styles.panel}>
          {videoPath && videoType !== 'audio' && <VideoPlayer video={videoPath} />}
          {(videoPath || textStory) && (
            <>



              <VideoRecordDescription style={styles.descriptionContainer} />

              <View style={styles.footerContainer}>
                  <View style={styles.selectLanguageWrapper}>
                      <Text style={styles.selectLanguageText}>Please select a language:</Text>
                      <ScrollView  horizontal={true} style={styles.scrollView}>
                          <View style={styles.languageWrapper}>
                              <View style={styles.languageList}>
                                  { languages.map(lang => languageItem(lang)) }
                              </View>
                          </View>
                      </ScrollView>
                  </View>
                <Footer upload navigation={navigation} onPressRightIcon={this.navigateNoteSelection} />
              </View>
            </>
          )}
        </Panel>
      </ScreenTemplate>
    );
  }
}

const regularStyles = StyleSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  panel: { borderWidth: 0 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.navyBlue },
  descriptionContainer: {
    position: 'absolute',
    top: Metrics.smallerMargin,
    left: Metrics.smallerMargin,
    right: Metrics.smallerMargin,
  },
  footerContainer: {
    bottom: Metrics.videoRecordCameraBottom,
    position: 'absolute',
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
    languageWrapper: {
      display: 'flex',
      marginTop: 15,
    },
    languageList: {
      flexDirection: 'row',
      justifyContent:'space-between',

    },
    languageItem: {
      padding: Metrics.doubleMediumMargin - 20,
      margin: 10,
      color: Colors.blue,
      backgroundColor: Colors.white,
      borderColor: Colors.blue,
      borderWidth: 3,
      borderRadius: Metrics.marginHorizontal,
    },
    languageItemSelected: {
        color: Colors.white,
        backgroundColor: Colors.blue,
    },
    languageItemText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    languageItemTextSelected: {
        color: Colors.white
    },
    scrollView: {
      flex: 1
    },
    selectLanguageWrapper: {
        position: 'absolute',
        bottom: 130,
        left: 0,
        right: 0,
        flex: 0.25,
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    selectLanguageText: {
      padding: 10,
      fontSize: 18,
      fontWeight: "bold"
    }
});
const scaledStyles = ScaledSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  panel: { borderWidth: 0 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.navyBlue },
  descriptionContainer: {
    position: 'absolute',
    top: Metricstablet.smallerMargin,
    left: Metricstablet.smallerMargin,
    right: Metricstablet.smallerMargin,
  },
  footerContainer: {
    bottom: Metricstablet.videoRecordCameraBottom,
    position: 'absolute',
    width: Metricstablet.screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
    languageWrapper: {
      display: 'flex',
      marginTop: "15@ms",
    },
    languageList: {
      flexDirection: 'row',
      justifyContent:'space-between',

    },
    languageItem: {
      padding: Metrics.doubleMediumMargin - 20,
      margin: "10@ms",
      color: Colors.blue,
      backgroundColor: Colors.white,
      borderColor: Colors.blue,
      borderWidth: "3@ms",
      borderRadius: Metricstablet.marginHorizontal,
    },
    languageItemSelected: {
        color: Colors.white,
        backgroundColor: Colors.blue,
    },
    languageItemText: {
        textAlign: 'center',
        fontSize: "14@ms",
        fontWeight: 'bold',
    },
    languageItemTextSelected: {
        color: Colors.white
    },
    scrollView: {
      flex: 1
    },
    selectLanguageWrapper: {
        position: 'absolute',
        bottom: "130@ms",
        left: 0,
        right: 0,
        flex: 0.25,
        padding: "10@ms",
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    selectLanguageText: {
      padding: "10@ms",
      fontSize: "18@ms",
      fontWeight: "bold"
    }
});

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  token: state.token.token,
  fetching: state.uploadStory.fetching,
  lang: state.isSelectedLang
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  uploadStory: (story: any, token: any, videoURL: any, callback: any, lang: string) =>
    dispatch(
      UploadStoryActions.uploadStoryRequest({
        story,
        token,
        videoURL,
        callback,
        lang
      }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUploadStory as any);
