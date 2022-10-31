import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import AddNote from 'app/Containers/AddNote/AddNote';
import AudioRecord from 'app/Containers/AudioRecord/AudioRecord';
import ConfirmUploadStory from 'app/Containers/ConfirmUploadStory/ConfirmUploadStory';
import Dashboard from 'app/Containers/Dashboard/Dashboard';
import MyCollection from 'app/Containers/MyCollection/MyCollection';
import NoteSelection from 'app/Containers/NoteSelection/NoteSelection';
import Onboarding from 'app/Containers/Onboarding/Onboarding';
import PerfumeDetails from 'app/Containers/PerfumeDetails/PerfumeDetails';
import Profile from 'app/Containers/Profile/ProfileScreen';
import RecommendedPerfumes from 'app/Containers/RecommendedPerfumes/RecommendedPerfumes';
import SaveRecipe from 'app/Containers/SaveRecipe/SaveRecipe';
import SelectStoryType from 'app/Containers/SelectStoryType/SelectStoryType';
import Selections from 'app/Containers/Selections/Selections';
import StoryPlayer from 'app/Containers/StoryPlayer/StoryPlayer';
import TextStory from 'app/Containers/TextStory/TextStory';
import VideoRecord from 'app/Containers/VideoRecord/VideoRecord';

import SideMenu from './SideMenu';

const VitrineStack = createStackNavigator(
  {
    // new routes
    Dashboard: { screen: Dashboard },
    Selections: { screen: Selections as any },
    PersonalizedRecipeNoteSelection: { screen: NoteSelection },
    PersonalizedRecipeRecommendedPerfumes: { screen: RecommendedPerfumes },
    SelectStoryType: { screen: SelectStoryType },
    Onboarding: { screen: Onboarding },
    SaveRecipe: { screen: SaveRecipe },
    // old routes to review
    ConfirmUploadStory: { screen: ConfirmUploadStory },
    PerfumeDetails: { screen: PerfumeDetails },
    Perfumes: { screen: RecommendedPerfumes },
    Profile: { screen: Profile },
    NoteSelection: { screen: NoteSelection },
    AddNote: { screen: AddNote },
    RecordVideo: { screen: VideoRecord },
    RecordAudio: { screen: AudioRecord },
    storyPlayer: { screen: StoryPlayer },
    TextStory: { screen: TextStory },
    MyCollection: { screen: MyCollection as any },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Dashboard',
  },
);
const HomeStack = createDrawerNavigator(
  {
    Home: { screen: VitrineStack },
  },
  {
    initialRouteName: 'Home',
    contentComponent: (props) => <SideMenu {...props} />,
  },
);

export default HomeStack;
