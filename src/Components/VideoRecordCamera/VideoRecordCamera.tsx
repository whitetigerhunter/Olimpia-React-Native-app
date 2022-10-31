import React from 'react';
import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { Panel, Footer, VideoRecordDescription } from 'app/Components';
import { Metrics } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

import * as settings from '../../Constants/settings';
import * as types from '../../Constants/types';
import { Route } from '../../Navigators';

interface Props {
  navigation: types.NavigationProp<Route.RecordVideo, types.NavigationParams[Route.RecordVideo]>;
}

interface State {
  recording: boolean;
  languageKey: string;
  cameraSideFront: boolean;
  elapsed: number;
}

class VideoRecordCamera extends React.PureComponent<Props, State> {
  cameraRef = React.createRef<RNCamera>();
  _recordingTimer: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      recording: false,
      cameraSideFront: true,
      languageKey: '',
      elapsed: 0,
    };
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE as any,
    ).then((res) => console.log('ANDROID_PERMISSONS', res));
  }

  startRecording = async () => {
    if (!this.cameraRef.current) {
      return;
    }
    this.setState({ recording: true });

    if (this._recordingTimer) {
      clearInterval(this._recordingTimer);
      this._recordingTimer = null;
    }
    this.setState({ elapsed: 0 });
    this._recordingTimer = setInterval(() => {
      this.setState({ elapsed: this.state.elapsed + 1 });
    }, 1000);

    const res = await this.cameraRef.current.recordAsync(settings.videoRecordSettings);
    const { uri } = res;

    const fileName = 'storage/emulated/0/DCIM/Camera/voice_note.aac';

    this.props.navigation.navigate(Route.ConfirmUploadStory, {
      video: '/' + fileName,
      videoPath: uri,
      language: this.state.languageKey,
    });
  };

  stopRecording = () => {
    if (this._recordingTimer) {
      clearInterval(this._recordingTimer);
      this._recordingTimer = null;
    }
    if (this.cameraRef.current) {
      this.cameraRef.current.stopRecording();
    } else {
      console.log('STOP_RECORDING');
    }
  };

  switchCamera = () => {
    if (this._recordingTimer) {
      clearInterval(this._recordingTimer);
      this._recordingTimer = null;
    }
    this.setState({ cameraSideFront: !this.state.cameraSideFront });
  };

  render() {
    const { cameraSideFront } = this.state;
    const { navigation } = this.props;
    return (
      <Panel style={styles.panel}>
        <RNCamera
          ref={this.cameraRef}
          style={styles.preview}
          type={cameraSideFront ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: translate('permissionCameraTitle'),
            message: translate('permissionCameraMsg'),
            buttonPositive: translate('ok'),
            buttonNegative: translate('cancel'),
          }}
          androidRecordAudioPermissionOptions={{
            title: translate('permissionAudioTitle'),
            message: translate('permissionAudioMsg'),
            buttonPositive: translate('ok'),
            buttonNegative: translate('cancel'),
          }}
        >
          <VideoRecordDescription />
          <View style={styles.footerContainer}>
            <Footer
              navigation={navigation}
              onPressStart={this.startRecording}
              onPressStop={this.stopRecording}
              onPressLeftIcon={this.switchCamera}
              elapsed={this.state.recording ? this.state.elapsed : undefined}
            />
          </View>
        </RNCamera>
      </Panel>
    );
  }
}

const styles = StyleSheet.create({
  panel: { borderWidth: 0 },
  preview: {
    flex: 1,
    paddingTop: Metrics.smallerMargin,
    paddingHorizontal: Metrics.smallMargin,
    zIndex: 1,
  },
  footerContainer: {
    bottom: Metrics.videoRecordCameraBottom,
    position: 'absolute',
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default VideoRecordCamera;
