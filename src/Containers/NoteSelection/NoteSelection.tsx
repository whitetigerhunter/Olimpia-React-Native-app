import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { ProcessingManager } from 'react-native-video-processing';
import { connect } from 'react-redux';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';
import {
  AddNoteCard,
  Loader,
  NoteCard,
  Panel,
  PanelFooter,
  ProgressPanelHeader,
  ScreenTemplate,
  VideoUploadSlider,
} from 'app/Components';
import * as enums from 'app/Constants/enums';
import * as settings from 'app/Constants/settings';
import * as types from 'app/Constants/types';
import { RootState } from 'app/Containers/App';
import { Route } from 'app/Navigators';
import { AnalyticsService, AnalyticsEvent, CrashlyticsService } from 'app/Services';
import NotesSelectionActions from 'app/State/NotesSelectionRedux';
import UploadStoryActions from 'app/State/UploadStoryRedux';
import { Colors, Fonts, FontsTablet, Metrics, Metricstablet, Typography, TypographyTablet } from 'app/Theme';
import { isString } from 'app/helpers';
import { getPreferredLocale } from 'app/translations';
import { translate } from 'app/translations/translationHelpers';

interface Props {
  notes: types.Note[];
  user: types.User;
  suggestionId: number;
  token: string;
  notesFetching: boolean;
  perfumesFetching: boolean;
  updateNotes: ({
    selected_notes,
    added_notes,
    id,
    token,
    longitude,
    latitude,
  }: types.UpdateNotesPayload) => any;
  uploadStory: ({ story, token }: types.UploadStoryPayload) => any;
  addNewNote: ({ suggestionId, resultat }: types.AddNewNotePayload) => void;
  navigation: types.NavigationProp<Route.NoteSelection, types.NavigationParams[Route.NoteSelection]>;
}

interface State {
  loading: boolean;
  notes: types.Note[];
  selectedNotes: types.Note[];
  addedNotes: types.Note[];
  descriptionSelectedNotes: types.Note[];
  latitude: number;
  longitude: number;
}

class NoteSelection extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      notes: this.props.notes,
      selectedNotes: [],
      descriptionSelectedNotes: [],
      addedNotes: [],
      latitude: 0,
      longitude: 0,
    };
  }
  get isSavedRecipe(): boolean {
    return !!this.props.navigation.state.params?.recipe;
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (
      nextProps.notesFetching !== prevState.loading &&
      nextProps.notes[0]?.pk !== prevState.notes[0]?.pk
    ) {
      return {
        notes: nextProps.notes,
        loading: false,
      };
    }

    const selectedNotes = nextProps.navigation.getParam('selectedNotes');
    const isInNotes = selectedNotes?.map((note) => prevState.notes.includes(note));
    if (selectedNotes?.length > 0 && isInNotes.includes(false)) {
      return {
        notes: [...selectedNotes, ...prevState.notes],
        selectedNotes: [...selectedNotes, ...prevState.selectedNotes],
        addedNotes: [...selectedNotes, ...prevState.addedNotes],
      };
    }
    return null;
  }

  async componentDidMount() {
    this.getLocation();
    const { isTextStory, recipe } = this.props.navigation.state.params as types.NoteSelectionParams;
    if (recipe) {
      this.handleSavedRecipe();
      return;
    }
    if (isTextStory) {
      return;
    }
    await this.compressAndUploadStory();
  }

  compressAndUploadStory = async () => {
    const { videoPath, videoType, video, textStory, lang } = this.props.navigation.state
      .params as types.NoteSelectionParams;
    const token = this.props.token;

    this.setState({ loading: true });
    if (textStory) {
      return this.storyUpload(textStory, token);
    }

    const story = new FormData();

    if (videoType === 'library' && Platform.OS === 'android') {
      this.storyUpload(story, token, video, videoPath, lang);
    } else if (videoType === 'audio') {
      this.storyUpload(story, token, video, videoPath, lang);
    } else {
      let compressedVideoPath = '';
      try {
        const newSource = await ProcessingManager.compress(
          videoPath as string,
          settings.videoCompressionSettings,
        );
        compressedVideoPath = isString(newSource) ? newSource : newSource.source;
      } catch (error) {
        CrashlyticsService.logError(error, 'VIDEO_COMPRESSION_ERROR');
        Alert.alert(translate('videoCompressionError'), error.message);
      }
      this.storyUpload(story, token, video, compressedVideoPath, lang);
    }
  };

  handleSavedRecipe = () => {
    const { recipe } = this.props.navigation.state.params as types.NoteSelectionParams;
    if (recipe) {
      const notes = [...recipe.selected_notes, ...recipe.added_notes];
      this.setState({ notes, selectedNotes: notes });
    }
  };

  hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert(translate('unableToOpenSettings'));
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert(translate('locationPermissonDenied'));
    }

    if (status === 'disabled') {
      Alert.alert(translate('turnOnLocation'), '', [
        { text: translate('goToSettings'), onPress: openSetting },
        { text: translate('dontUseLocation'), onPress: () => null },
      ]);
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return await this.hasPermissionIOS();
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(translate('locationPermissionDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(translate('locationPermissionRevoked'), ToastAndroid.LONG);
    }

    return false;
  };

  getLocation = async () => {
    const hasPermission = await this.hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;
        const latitude = Number(coords.latitude.toFixed(2));
        const longitude = Number(coords.longitude.toFixed(2));
        this.setState({ latitude, longitude });
      },
      (error) => {
        CrashlyticsService.logError(error as any, 'GEOLOCATION_GET_CURRENT_POSITION_ERROR');
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  };

  storyUpload = (story: any, token: string, video?: string, videoPath?: string, lang?: string) => {
    try {
      if (videoPath) {
        const name = videoPath.toString().split('/')[videoPath.toString().split('/').length - 1];
        const type = name.toString().split('.')[1];
        if (type === 'aac') {
          console.log('not mp4');
          story.append('attached_file', {
            uri: 'file://' + videoPath,
            name,
            type: 'audio/aac',
          });
          story.append('type', 'voice');
        } else {
          console.log('mp4');
          story.append('attached_file', {
            uri: videoPath,
            name,
            type: 'video/' + type,
          });
          story.append('type', 'story');
        }

        const language = lang && lang !== 'auto' ? lang : getPreferredLocale();
        story.append('language', language);

        AsyncStorage.setItem('videoURL', video as string);
      }
      this.props.uploadStory({ story, token });
    } catch (error) {
      console.log('VIDEO_UPLOAD_ERROR', error);
    }
  };

  addNote = () => {
    this.props.navigation.navigate(Route.AddNote, {
      suggestionId: this.props.suggestionId,
      notes: this.state.notes,
      route: Route.NoteSelection,
    });
  };

  handlePressNoteCard = (note: types.Note) => {
    if (!this.state.selectedNotes.includes(note)) {
      return this.setState({
        selectedNotes: [...this.state.selectedNotes, note],
      });
    } else {
      if (this.state.addedNotes.includes(note)) {
        return this.setState({
          addedNotes: this.state.addedNotes.filter((n) => n.name !== note.name),
          selectedNotes: this.state.selectedNotes.filter((n) => n.name !== note.name),
        });
      }
      return this.setState({
        selectedNotes: this.state.selectedNotes.filter((n) => n.name !== note.name),
      });
    }
  };

  handleDetailsPressNoteCard = (note: types.Note) => {
    if (!this.state.descriptionSelectedNotes.includes(note)) {
      return this.setState({
          descriptionSelectedNotes: [...this.state.descriptionSelectedNotes, note],
      });
    } else {
      return this.setState({
          descriptionSelectedNotes: this.state.descriptionSelectedNotes.filter((n) => n.name !== note.name),
      });
    }
  };

  navigateToPerfumeList = () => {
    const { selectedNotes, addedNotes, latitude, longitude } = this.state;
    const { suggestionId, token } = this.props;
    const pksOfSelectedNotes = selectedNotes.map((note) => note.pk);
    const pksOfAddedNotes = addedNotes.map((note) => note.pk);
    pksOfAddedNotes.filter((item, index) => pksOfAddedNotes.indexOf(item) !== index);
    const pksOfSelectedNotesWithoutPksOfAddedNotes: number[] = [];
    pksOfSelectedNotes.map(
      (item) => !pksOfAddedNotes.includes(item) && pksOfSelectedNotesWithoutPksOfAddedNotes.push(item),
    );

    this.props.addNewNote({ suggestionId, resultat: [...selectedNotes] });
    this.props.updateNotes({
      selected_notes: pksOfSelectedNotesWithoutPksOfAddedNotes,
      added_notes: pksOfAddedNotes,
      id: suggestionId,
      token,
      latitude,
      longitude,
      redirectTo: this.isSavedRecipe ? Route.PersonalizedRecipeRecommendedPerfumes : Route.Perfumes,
    });
    AnalyticsService.logEvent(AnalyticsEvent.UserSelectIngredients);
  };

  handlePressLeftButton = () => this.props.navigation.goBack();

  render() {
    const isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    const { recipe } = this.props.navigation.state.params as types.NoteSelectionParams;
    const { perfumesFetching } = this.props;
    const { selectedNotes, notes } = this.state;
    const { descriptionSelectedNotes } = this.state;
    const loading = this.state.loading;

    return (
      <>
        <ScreenTemplate
          headerBlueProps={{
            title: translate('findPersonalizedRecipe'),
          }}
          containerStyle={styles.screenTemplateBackgroundColor}
          statusBarType="light-content"
          noScroll
        >
          <Panel isLoading={perfumesFetching}>
            <ProgressPanelHeader
              progress={
                !loading
                  ? enums.ProgressPanelHeaderStep.Ingredients
                  : enums.ProgressPanelHeaderStep.StoryTime
              }
              style={styles.progressPanelHeader}
            />
            {loading && (
              <>
                <View style={styles.loadingContainer}>
                  <Loader />
                  <View style={styles.loadingContentContainer}>
                    <Text style={styles.loadingText}>{translate('predictingScents')}</Text>
                    <Text style={styles.scientificTitle}>{translate('scientificTitle')}</Text>
                    <VideoUploadSlider />
                    <PanelFooter remove onPressLeftButton={this.handlePressLeftButton} disableRight next />
                  </View>
                </View>
              </>
            )}
            {!loading && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
              >
                {this.isSavedRecipe ? (
                  <Text style={styles.header}>{recipe?.recipe_name}</Text>
                ) : (
                  <Text style={styles.header}>{translate('suggestions')}</Text>
                )}
                <View style={styles.ingredientsContainer}>
                  {notes?.map((item) => (
                    <NoteCard
                      key={item.name}
                      note={item}
                      selected={selectedNotes.includes(item)}
                      detailsSelected={descriptionSelectedNotes.includes(item)}
                      onPress={this.handlePressNoteCard}
                      onDetailsPress={this.handleDetailsPressNoteCard}
                    />
                  ))}
                </View>
                {!this.isSavedRecipe && (
                  <View style={styles.addNoteCardContainer}>
                    <AddNoteCard onSelect={this.addNote} />
                  </View>
                )}
              </ScrollView>
            )}
          </Panel>
        </ScreenTemplate>
        <PanelFooter
          disableRight={selectedNotes?.length < enums.MinSelectedNotesLength.NoteSelection}
          next
          back
          onPressLeftButton={this.handlePressLeftButton}
          onPressRightButton={this.navigateToPerfumeList}
        />
      </>
    );
  }
}

const regularStyles = StyleSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  progressPanelHeader: { backgroundColor: Colors.backgroundSecondary },
  header: {
    ...Fonts.style.h3,
    color: Colors.greyScaleSix,
    lineHeight: Typography.lineHeight,
    marginTop: Metrics.mediumMargin,
    paddingHorizontal: Metrics.margin,
    paddingBottom: 12,
  },
  contentContainer: {
    paddingHorizontal: Metrics.smallerMargin,
    paddingBottom: 184,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'scroll'
  },
  addNoteCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  loadingContainer: {
    flex: 1,
  },
  loadingContentContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.greyScaleSix,
    ...Fonts.style.helper,
    paddingBottom: 10,
    textAlign: 'center',
  },
  scientificTitle: {
    ...Fonts.style.h3,
    color: Colors.greyScaleSix,
    lineHeight: Typography.lineHeight,
  },
});
const scaledStyles = ScaledSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  progressPanelHeader: { backgroundColor: Colors.backgroundSecondary },
  header: {
    ...FontsTablet.style.h3,
    color: Colors.greyScaleSix,
    lineHeight: TypographyTablet.lineHeight,
    marginTop: Metricstablet.mediumMargin,
    paddingHorizontal: Metricstablet.margin,
    paddingBottom: "12@ms",
  },
  contentContainer: {
    paddingHorizontal: Metricstablet.tinyMargin,
    paddingBottom: "184@ms",
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'scroll'
  },
  addNoteCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  loadingContainer: {
    flex: 1,
  },
  loadingContentContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.greyScaleSix,
    ...FontsTablet.style.regularBase,
    padding: "10@ms",
    textAlign: 'center',
  },
  scientificTitle: {
    ...FontsTablet.style.h2,
    marginTop:"10@ms",
    color: Colors.greyScaleSix,
    lineHeight: TypographyTablet.lineHeight,
  },
});
const mapStateToProps = (state: RootState, props: Props) => ({
  notes: state?.user?.notes?.resultat || [],
  user: state.user.user,
  suggestionId:
    props.navigation.state.params?.recipe?.id ||
    state?.user.notes?.id ||
    state?.user.notes?.suggestionId ||
    0,
  token: state.token.token,
  notesFetching: state.uploadStory.fetching,
  perfumesFetching: state.updateNotes.fetching,
});

const mapDispatchToProps = {
  updateNotes: NotesSelectionActions.notesSelectionRequest,
  uploadStory: UploadStoryActions.uploadStoryRequest,
  addNewNote: NotesSelectionActions.notesSelectionAddNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteSelection);
