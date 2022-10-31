import React, { useEffect, useState, useCallback, memo } from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';
import Video from 'react-native-video';

import RecordPlayButton from 'app/Assets/Images/record_play_button.svg';

import { Metrics, Metricstablet, Colors } from '../../Theme';
import Icons from '../Icons';
import { ScaledSheet } from 'react-native-size-matters';
import DeviceInfo from 'react-native-device-info';

const VideoPlayer = ({ video }: any) => {
  let isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  const [thumbnail, setThumbnail] = useState(null);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const [currentTime, setCurrentTime] = useState(0.0);
  const [paused, setPaused] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [ignoreSilentSwitch, setIgnoreSilentSwitch] = useState(null);

  useEffect(() => {
    try {
      createThumbnail({
        url: video,
        timeStamp: 10000,
      })
        .then((response: any) => {
          setThumbnail(response.path);
          setShowThumbnail(true);
        })
        .catch((err) => console.log({ err }, 'create thimb'));
    } catch (e) {
      console.log(e);
    }
  }, [video]);

  const onLoad = useCallback((data: { duration: React.SetStateAction<number> }) => {
    setDuration(data.duration);
    setShowThumbnail(true);
  }, []);

  const onProgress = useCallback((data: { currentTime: React.SetStateAction<number> }) => {
    setCurrentTime(data.currentTime);
  }, []);

  const handlePress = useCallback(() => {
    setPaused(!paused);
    setTimeout(() => {
      setShowButton(false);
    }, 5000);
  }, [paused]);

  return (
    <View style={styles.container}>
      {
        <Video
          source={{ uri: video}}
          style={styles.video}
          rate={1}
          paused={paused}
          volume={volume}
          muted={muted}
          // @ts-ignore
          ignoreSilentSwitch={ignoreSilentSwitch}
          resizeMode="cover"
          onLoad={onLoad}
          onProgress={onProgress}
          repeat
        />
      }
      {thumbnail && showThumbnail && currentTime === 0.0 && (
        <Image
          style={styles.thumbnail}
          // @ts-ignore
          source={{ uri: thumbnail }}
        />
      )}
      <TouchableOpacity style={styles.iconContainer} onPress={handlePress}>
        {paused ? (
          <RecordPlayButton width={72} height={72} />
        ) : (
          <Icons size={40} name={'pause'} onPress={handlePress} color={Colors.greyScaleOne} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const regularStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Metrics.screenWidth,
    height: '100%',
    borderTopLeftRadius: Metrics.largeBorderRadius,
    borderTopRightRadius: Metrics.largeBorderRadius,
  },
  thumbnail: {
    top: 0,
    width: Metrics.screenWidth,
    minWidth: '100%',
    height: Metrics.screenHeight,
    backgroundColor: Colors.greyScaleOne,
    borderTopLeftRadius: Metrics.largeBorderRadius,
    borderTopRightRadius: Metrics.largeBorderRadius,
  },
  iconContainer: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 80,
    height: 80,
  },
});
const scaledStyles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Metricstablet.screenWidth,
    height: '100%',
    borderTopLeftRadius: Metricstablet.largeBorderRadius,
    borderTopRightRadius: Metricstablet.largeBorderRadius,
  },
  thumbnail: {
    top: 0,
    width: Metricstablet.screenWidth,
    minWidth: '100%',
    height: Metricstablet.screenHeight,
    backgroundColor: Colors.greyScaleOne,
    borderTopLeftRadius: Metricstablet.largeBorderRadius,
    borderTopRightRadius: Metricstablet.largeBorderRadius,
  },
  iconContainer: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "50@ms",
    width: "80@ms",
    height: "80@ms",
  },
});

export default memo(VideoPlayer);
