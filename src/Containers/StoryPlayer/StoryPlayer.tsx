/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-community/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, View, ScrollView } from 'react-native';

import Header from '../../Components/Header/HomeHeader';
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';
import * as types from '../../Constants/types';
import { Route } from '../../Navigators';
import { Metrics } from '../../Theme';
import { translate } from '../../translations/translationHelpers';

interface Props {
  navigation: types.NavigationProp<types.NavigationParams, Route.StoryPlayer>;
}

function StoryPlayer(props: Props) {
  const [recordedVideoURL, setRecordedVideoURL] = useState(null);

  const backPressed = useCallback(() => {
    props.navigation.goBack();
    return true;
  }, [props]);

  useEffect(() => {
    async function fetchStory() {
      await AsyncStorage.getItem('videoURL').then((file: any) => {
        console.log(file);
        if (file) {
          setRecordedVideoURL(file);
          console.log(recordedVideoURL);
        }
      });
    }
    fetchStory();

    BackHandler.addEventListener('hardwareBackPress', backPressed);
    return () => BackHandler.removeEventListener('hardwareBackPress', backPressed);
  }, [backPressed, recordedVideoURL]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={translate('myStory')}
        onPressLeftIcon={() => props.navigation.goBack()}
        leftIconName="keyboard-arrow-left"
        showRightIcon={false}
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: Metrics.doubleBaseMargin,
        }}
      >
        {recordedVideoURL && <VideoPlayer video={recordedVideoURL} />}
      </ScrollView>
    </View>
  );
}

export default StoryPlayer;
