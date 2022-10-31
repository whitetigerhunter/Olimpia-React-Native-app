import { Platform } from 'react-native';
import { RNCamera, RecordOptions } from 'react-native-camera';
import SoundRecorder from 'react-native-sound-recorder';

export const audioRecordSettings = {
  bitRate: 128000,
  channels: 2,
  sampleRate: 44100,
  // @ts-ignore: Property 'FORMAT_AAC_ADTS'  does not exist on type 'typeof import("react-native-sound-recorder")'.ts(2339)
  format: SoundRecorder.FORMAT_AAC_ADTS,
  // @ts-ignore: Property 'ENCODER_AAC'  does not exist on type 'typeof import("react-native-sound-recorder")'.ts(2339)
  encoder: SoundRecorder.ENCODER_AAC,
};

export const videoRecordSettings: RecordOptions = {
  videoBitrate: 1 * 1000 * 1000,
  quality: RNCamera.Constants.VideoQuality['480p'],
  maxDuration: 30,
  mirrorVideo: false,
  codec: Platform.OS === 'ios' ? RNCamera.Constants.VideoCodec['H264'] : undefined,
};

export const videoCompressionSettings = {
  width: 480,
  height: 720,
  bitrateMultiplier: 3,
  minimumBitrate: 300000,
};
