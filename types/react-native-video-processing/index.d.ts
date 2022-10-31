declare module 'react-native-video-processing' {
  export interface VideoCompressionSettings {
    width: number;
    height: number;
    bitrateMultiplier: number;
    minimumBitrate: number;
  }

  interface AndroidVideoSource {
    source: string;
  }

  export type VideoSource = string | AndroidVideoSource;

  const compress: (videoPath: string, settings: VideoCompressionSettings) => Promise<VideoSource>;
  export const ProcessingManager = {
    compress,
  };
}
