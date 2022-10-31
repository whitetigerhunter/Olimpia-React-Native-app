import React, { useState, useCallback, memo } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import RecordButton from 'app/Assets/Images/record_button.svg';
import RecordStopButton from 'app/Assets/Images/record_stop_button.svg';
import SideSwitchCamera from 'app/Assets/Images/side_switch_camera.svg';
import { Button } from 'app/Components';
import { translate } from 'app/translations/translationHelpers';

import * as types from '../../Constants/types';
import { Route } from '../../Navigators';
import { Colors, Fonts, FontsTablet, Metrics, Metricstablet } from '../../Theme';
import Icons from './Icons';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';

interface Props {
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  onPressStart?: () => void;
  onPressStop?: () => void;
  upload?: boolean;
  elapsed?: number | undefined;
  navigation:
    | types.NavigationProp<Route.RecordVideo, types.NavigationParams[Route.RecordVideo]>
    | types.NavigationProp<Route.ConfirmUploadStory, types.NavigationParams[Route.ConfirmUploadStory]>;
}

const Footer = ({
  onPressStart,
  onPressStop,
  onPressLeftIcon,
  onPressRightIcon,
  upload,
  elapsed,
  navigation,
}: Props) => {
  const [recording, setRecording] = useState(false);

  const handleRecordVideo = useCallback(() => {
    setRecording(true);
    onPressStart && onPressStart();
  }, [onPressStart]);

  const handleStopRecording = useCallback(() => {
    setRecording(false);
    onPressStop && onPressStop();
  }, [onPressStop]);

  const handleSwitchCamera = useCallback(() => {
    onPressLeftIcon && onPressLeftIcon();
  }, [onPressLeftIcon]);

  const handleGoBack = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);

  const handlePressRightIcon = useCallback(() => {
    onPressRightIcon && onPressRightIcon();
  }, [onPressRightIcon]);

  const isTablet = DeviceInfo.isTablet();
  const styles = isTablet? scaledStyles : regularStyles;

  return (
    <View>
      <Text style={styles.elapsedTime}>{elapsed}</Text>
      <View style={styles.container}>
        {!upload ? (
          <View style={styles.cameraButtonsContainer}>
            <TouchableOpacity style={[styles.button, styles.marginRight]} onPress={handleSwitchCamera}>
              {isTablet?
              <SideSwitchCamera height={120} width={120} />
              :<SideSwitchCamera height={50} width={50} />
              }
            </TouchableOpacity>
            {recording ? (
              <TouchableOpacity style={[styles.button]} onPress={handleStopRecording}>
                {isTablet?
                  <RecordStopButton width={100} height={100}/>
                  :<RecordStopButton/>
                }
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleRecordVideo}>
                {isTablet?
                  <RecordButton width={100} height={100}/>
                  :<RecordButton/>
                }
              </TouchableOpacity>
            )}
            <Icons
              style={styles.button}
              color={Colors.greyScaleOne}
              size={isTablet?53:22}
              onPress={handleGoBack}
              name={'camera-off'}
            />
          </View>
        ) : (
          onPressRightIcon && (
            <>
              <Button style={styles.button} ghost text={translate('tryAgain')} onPress={handleGoBack} />
              <Button
                style={styles.button}
                secondary
                text={translate('upload')}
                onPress={handlePressRightIcon}
              />
            </>
          )
        )}
      </View>
    </View>
  );
};

const regularStyles = StyleSheet.create({
  container: {
    paddingBottom: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Metrics.screenWidth,
  },
  cameraButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 14,
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    bottom: Metrics.bootomMarginCameraRecord,
  },
  elapsedTime: {
    color: Colors.greyScaleOne,
    ...Fonts.style.headerTitle,
    width: '100%',
    textAlign: 'center',
    paddingBottom: 40,
  },
  marginRight: { marginRight: -14 },
});
const scaledStyles = ScaledSheet.create({
  container: {
    paddingBottom: Metricstablet.doubleBaseMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Metricstablet.screenWidth,
  },
  cameraButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: "14@ms",
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    bottom: Metricstablet.bootomMarginCameraRecord,
  },
  elapsedTime: {
    color: Colors.greyScaleOne,
    ...FontsTablet.style.headerTitle,
    width: '100%',
    textAlign: 'center',
    paddingBottom: "40@ms",
  },
  marginRight: { marginRight: "-24@ms" },
});

export default memo(Footer);
