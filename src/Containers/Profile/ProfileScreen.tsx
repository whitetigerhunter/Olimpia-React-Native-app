import React, { useEffect, useState, useCallback, memo } from 'react';
import { BackHandler, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker/src';
// import * as ImagePicker from 'react-native-image-picker';
// import { ImagePickerResponse } from 'react-native-image-picker/src';
// @ts-ignore
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect, useDispatch, useSelector } from 'react-redux';

import { ScreenTemplate } from 'app/Components';
import * as types from 'app/Constants/types';
import UpdateUserActions from 'app/State/UpdateUserRedux';
import UserActions from 'app/State/UserRedux';
import { translate } from 'app/translations';

import RegisterOrEditProfileForm from '../../Containers/Login/RegisterOrEditProfileForm';
import API from '../../Services/Api';
import { Colors, Metrics, Metricstablet } from '../../Theme';
import { RootState } from '../App';
import DeviceInfo from 'react-native-device-info';
import { ScaledSheet } from "react-native-size-matters";

function Profile(props: any) {
  const isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  const currentUser = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.token.token);

  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [firstName, setFirstName] = useState(currentUser.first_name);
  const [lastName, setLastName] = useState(currentUser.last_name);
  const [age, setAge] = useState(currentUser.age);
  const [skinType, setSkinType] = useState(currentUser.skin_type);
  const [gender, setGender] = useState(currentUser.gender);
  const [country, setCountry] = useState(currentUser.country);
  const [language, setLanguage] = useState(currentUser.language);
  const [interestedIn, setInterestedIn] = useState(currentUser.interested_in);
  const [allergies, setAllergies] = useState(currentUser.allergies);
  const [email, setEmail] = useState(currentUser.email);
  const [image, setImage] = useState(currentUser.image);
  const [user, setUser] = useState(currentUser);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, [props.navigation.state.params]);

  useEffect(() => {
    return;
  }, []);

  const getUser = async () => {
    setLoading(true);
    if (
      props.navigation.state.params &&
      props.navigation.state.params.userId &&
      currentUser.id !== props.navigation.state.params.userId
    ) {
      const fetchedUser: types.User = await getUserByTokenAndId();
      setIsCurrentUser(false);
      setUser(fetchedUser);
      setImage(fetchedUser.image);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getUserByTokenAndId = async () => {
    try {
      const user: any = await API.create().getUserByIdAndToken(currentUser.id, token);
      return user.data;
    } catch (error) {
      console.log('ERROR_GET_USER_BY_ID_AND_TOKEN', error);
    }
  };

  const uploadImage = async () => {
    if (isCurrentUser) {
      const options: any = {
        noData: true,
        mediaType: 'image',
      };
      // ImagePicker.launchImageLibrary(options, async (response: ImagePickerResponse) => {
      //   if (response.uri) {
      //     setLoadingImage(true);
      //     const image = new FormData();
      //     image.append('image', {
      //       uri: response.uri,
      //       name: response.fileName,
      //       type: response.type,
      //     });
      //     const upload: any = await API.create().uploadUserPhoto(image, token);
      //     setImage(upload.data.image);
      //     await dispatch(UserActions.userSuccess(upload.data));
      //     setLoadingImage(false);
      //   }
      // });
    } else {
      console.log('current user : ', isCurrentUser);
    }
  };

  const dispatch = useDispatch();
  const saveUser = async () => {
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      age,
      gender,
      skin_type: skinType,
      allergies,
      country,
      language,
      interested_in: interestedIn,
    };

    const { id } = currentUser;
    const request = await dispatch(
      UpdateUserActions.updateUserRequest({
        token,
        id,
        user: newUser,
        oldLanguage: language,
        selectedLanguage: language,
      }),
    );
    props.navigation.goBack();
    if (request.payload) {
      await getUserByTokenAndId;
    }
  };

  const handleAction = (
    email: string,
    firstname: string,
    lastname: string,
    allergies: string | undefined,
    interestedIn: string | undefined,
    age: string | undefined,
    gender: string | undefined,
    skinType: string | undefined,
  ) => {
    setEmail(email);
    setFirstName(firstname);
    setLastName(lastname);
    setAllergies(allergies);
    setInterestedIn(interestedIn);
    setAge(age);
    setGender(gender);
    setSkinType(skinType);
  };

  const backPressed = useCallback(() => {
    console.log(props.navigation, 'navigation');
    props.navigation.goBack();
    return true;
  }, [props]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backPressed);
    return () => BackHandler.removeEventListener('hardwareBackPress', backPressed);
  }, [backPressed, user]);

  return (
    <ScreenTemplate
      headerProps={{
        title: translate('profile'),
        leftIconName: 'chevron-left',
        rightIcon: isCurrentUser && (
          <TouchableOpacity style={styles.button} onPress={saveUser}>
            <Text style={styles.buttonText}>{translate('save')}</Text>
            <Icon size={isTablet?36:20} color={'#434343'} name={'floppy-o'} />
          </TouchableOpacity>
        ),
        showRightIcon: false,
        onPressRightIcon: saveUser,
        onPressLeftIcon: () => props.navigation.goBack(),
      }}
      isLoading={loading || loadingImage}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={uploadImage} style={styles.avatarContainer}>
            {!loadingImage && <UserAvatar size={isTablet?180:100} name={firstName} src={image} />}
          </TouchableOpacity>
          <RegisterOrEditProfileForm
            user={user}
            loading={loading}
            onAction={handleAction}
            navigation={props.navigation}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
}

const regularStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: Metrics.doubleBaseMargin,
  },
  innerContainer: {
    width: '100%',
    flex: 0.2,
    padding: 10,
    backgroundColor: Colors.backgroundSecondary,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: Metrics.screenWidth / 3,
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.profileButtonColor,
    marginRight: 5,
  },
  avatarContainer: {
    backgroundColor: Colors.transparent,
    width: Metrics.screenWidth * 0.25,
    alignSelf: 'center',
  },
});
const scaledStyles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: Metricstablet.doubleBaseMargin,
  },
  innerContainer: {
    width: '100%',
    flex: 0.2,
    padding: "10@ms",
    backgroundColor: Colors.backgroundSecondary,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: Metricstablet.screenWidth / 3,
    padding: "20@ms",
  },
  buttonText: {
    fontSize: "16@ms",
    color: Colors.profileButtonColor,
    marginRight: "5@ms",
  },
  avatarContainer: {
    backgroundColor: Colors.transparent,
    // width: Metricstablet.screenWidth * 0.25,
    alignSelf: 'center',
  },
});

const mapDispatchToProps = {
  updateUser: UserActions.userSuccess,
};

export default connect(null, mapDispatchToProps)(memo(Profile));
