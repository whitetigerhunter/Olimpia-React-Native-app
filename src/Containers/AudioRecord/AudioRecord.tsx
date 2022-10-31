import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import SoundRecorder from 'react-native-sound-recorder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { Panel, ScreenTemplate, VideoRecordDescription } from 'app/Components';

import * as settings from '../../Constants/settings';
import * as types from '../../Constants/types';
import { Route } from '../../Navigators';
import { Colors, Metrics, Metricstablet, Fonts, FontsTablet } from '../../Theme';
import { translate } from '../../translations/translationHelpers';
import { RootState } from '../App';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';

interface Props {
  navigation: types.NavigationProp<Route.RecordAudio, types.NavigationParams[Route.RecordAudio]>;
}

function AudioRecord(props: Props) {
  let isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSecs, setPlaySecs] = useState(0);
  const [recordSecs, setRecordSecs] = useState(0);



  function useInterval(callback: any, delay: number | null) {
    const savedCallback: any = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(
    async () => {
      if (recordSecs == 60) {
        await SoundRecorder.stop();
        setIsRecording(false);
        Alert.alert(translate('audioLimit'), '');
      }

      setRecordSecs(recordSecs + 1);
    },
    isRecording ? 1000 : null,
  );

  useInterval(
    async () => {
      if (playSecs >= recordSecs) {
        if (!isPlaying) {
          setIsPlaying(false);
          setPlaySecs(0);
        }
      }

      setPlaySecs(playSecs + 1);
    },
    isPlaying ? 1000 : null,
  );

  const startRecording = async () => {
    setIsRecording(true);

    if (Platform.OS === 'android') {
      await SoundRecorder.start(
        SoundRecorder.PATH_DOCUMENT + '/voice_note.aac',
        settings.audioRecordSettings,
      );
    } else if (Platform.OS === 'ios') {
      await SoundRecorder.start(SoundRecorder.PATH_DOCUMENT + '/voice_note.aac');
    }
    setIsRecording(true);
  };

  const stopRecording = useCallback(async () => {
    const result = await SoundRecorder.stop();
    setIsRecording(false);
    props.navigation.navigate(Route.ConfirmUploadStory, {
      video: result.path,
      videoPath: result.path,
      videoType: 'audio'
    });
  }, [props.navigation]);


  const handleRecord = useCallback(async () => {
    if (isPlaying) {
      Alert.alert(translate('playbackTitle'), translate('playbackDescription'));
      return;
    }

    if (isRecording) {
      await stopRecording();
      return;
    }
    await startRecording();
  }, [isPlaying, isRecording, stopRecording]);

  return (
    <ScreenTemplate
      headerBlueProps={{
        title: translate('storyTime'),
      }}
      noScroll
      containerStyle={styles.screenTemplateBackgroundColor}
      contentContainerStyle={styles.container}
      statusBarType="light-content"
    >
      <Panel style={styles.panel}>
        <VideoRecordDescription style={styles.descriptionContainer} />

        <Text style={styles.counter}>{recordSecs}</Text>
        <TouchableOpacity onPress={handleRecord} style={[styles.button, styles.iconContainer]}>
          <Icon
            size={100}
            name={isRecording ? 'pause-circle' : 'record-rec'}
            style={[styles.icon, !isRecording && styles.iconAdditionalMargin]}
          />
        </TouchableOpacity>
      </Panel>
    </ScreenTemplate>
  );
}

const regularStyles = StyleSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  panel: { borderWidth: 0, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: Colors.navyBlue },
  descriptionContainer: {
    position: 'absolute',
    top: Metrics.smallerMargin,
    left: Metrics.smallerMargin,
    right: Metrics.smallerMargin,
  },
  button: {
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: Metrics.largeBorderRadius,
    width: 100,
    height: 100,
    borderColor: Colors.primaryGold,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.primaryGold,
  },
  iconAdditionalMargin: {
    marginStart: -Metrics.tinyMargin,
    marginBottom: Metrics.tinyMargin,
  },
  counter: {
    ...Fonts.style.helper,
    color: Colors.greyScaleSix,
  },

});
const scaledStyles = ScaledSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  panel: { borderWidth: 0, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: Colors.navyBlue },
  descriptionContainer: {
    position: 'absolute',
    top: Metricstablet.smallerMargin,
    left: Metricstablet.smallerMargin,
    right: Metricstablet.smallerMargin,
  },
  button: {
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: Metrics.largeBorderRadius,
    width: "100@ms",
    height: "100@ms",
    borderColor: Colors.primaryGold,
    borderWidth: "1@ms",
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.primaryGold,
  },
  iconAdditionalMargin: {
    marginStart: -Metrics.tinyMargin,
    marginBottom: Metricstablet.tinyMargin,
  },
  counter: {
    ...FontsTablet.style.helper,
    color: Colors.greyScaleSix,
  },

});

const mapStateToProps = (state: RootState) => ({
  perfumes: state.user.perfumes,
  user: state.user.user,
});

export default withNavigation(connect(mapStateToProps, null)(memo(AudioRecord)));
