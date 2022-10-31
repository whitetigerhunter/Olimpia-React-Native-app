import { Icon } from 'native-base';
import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, StyleProp, ViewStyle, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { AirbnbRating } from 'react-native-ratings';
import { connect } from 'react-redux';

import { Button, Input } from 'app/Components';
import * as types from 'app/Constants/types';
import { RootState } from 'app/Containers/App';
import Api from 'app/Services/Api';
import { Colors, Metrics, Fonts } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

import storyStyles from './storyStyles';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

interface Props {
  show?: boolean;
  style?: StyleProp<ViewStyle>;
  user?: types.User;
  token?: string;
  onHideModal: () => void;
}

const RatingModal = (props: Props) => {
  const [show, setShow] = useState(false);

  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    props.show && setShow(props.show);
  }, [props]);

  useEffect(() => {
    !show && props.onHideModal();
  }, [show, props]);

  const ratingCompleted = useCallback(
    (rating: number) => {
      setRating(rating);
    },
    [setRating],
  );

  const handleFeedback = async () => {
    await Api.create().feedBack(
      {
        rate: rating.toString(),
        comment: text,
        client: props?.user?.id,
      },
      props.token,
    );

    setShow(false);
    setRating(0);
    setText('');
  };

  const hideModal = useCallback(() => setShow(false), [setShow]);

  return (
    <Modal isVisible={show} avoidKeyboard useNativeDriver onBackdropPress={hideModal}>
      <View style={styles.modalContainer}>
        <Icon name="close" onPress={hideModal} style={storyStyles.btnClose} />
        <AirbnbRating defaultRating={4} onFinishRating={ratingCompleted} />
        <Input
          numberOfLines={6}
          multiline
          inputContainerStyle={styles.input}
          textStyle={styles.inputText}
          onChangeText={setText}
          defaultValue={text}
          placeholder={translate('whatToEnhance')}
          underlineColorAndroid={'transparent'}
        />
        <Text style={styles.text}>{translate('weNeedYourHelp')}</Text>
        <Button secondary style={styles.btn} text={translate('send')} onPress={handleFeedback} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: Metrics.largeBorderRadius,
    paddingHorizontal: Metrics.largeMargin,
    paddingTop: Metrics.tinyMargin,
    overflow: 'hidden',
    height: fullHeight * 0.55,
    bottom: 0,
    alignSelf: 'center',
    width: fullWidth * 0.95,
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
  },
  input: { height: 120, paddingVertical: Metrics.margin, width: fullWidth - 60 },
  text: {
    marginBottom: Metrics.mediumMargin,
    textAlign: 'center',
    ...Fonts.style.normal,
    color: Colors.greyScaleSix,
  },
  btn: { width: '100%', marginBottom: Metrics.largeMargin },
  inputText: { textAlignVertical: 'top' },
});

const mapStateToProps = (state: RootState) => ({
  token: state.token.token,
  user: state.user.user,
});

export default connect(mapStateToProps)(RatingModal);
