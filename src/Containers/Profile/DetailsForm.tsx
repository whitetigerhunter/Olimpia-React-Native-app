import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';

import * as types from 'app/Constants/types';
import UpdateUserActions from 'app/State/UpdateUserRedux';
import UserActions from 'app/State/UserRedux';

import Input from '../../Components/Input/Input';
import API from '../../Services/Api';
import { Colors, Metrics } from '../../Theme';
import { translate } from '../../translations/translationHelpers';
import { RootState } from '../App';

interface Props {
  edit: boolean;
  params: any;
}

const DetailsForm = ({ edit, params }: Props) => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.token.token);

  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [firstName, setFirstName] = useState(currentUser.first_name);
  const [lastName, setLastName] = useState(currentUser.last_name);
  const [birthday, setBirthday] = useState(currentUser.date_of_birth);
  const [gender, setGender] = useState(currentUser.gender);
  const [country, setCountry] = useState(currentUser.country);
  const [language, setLanguage] = useState(currentUser.language);
  const [interestedIn, setInterestedIn] = useState(currentUser.interested_in);
  const [allergies, setAllergies] = useState(currentUser.allergies);
  const [email, setEmail] = useState(currentUser.email);
  const [user, setUser] = useState(currentUser);
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [followed, setFollowed] = useState(
    currentUser &&
      currentUser.followings &&
      currentUser.followings.find((e: { id: any }) => e.id === currentUser.id)
      ? true
      : false,
  );

  useEffect(() => {
    getUser();
  }, [params]);

  const getUser = async () => {
    console.log('get user');

    setLoading(true);
    if (params?.userId && currentUser.id !== params.userId) {
      const testUser = await API.create().getUserByIdAndToken(params.userId, token);
      const fetchedUser: any = testUser.data;

      setIsCurrentUser(false);
      setUser(fetchedUser);
      setFirstName(fetchedUser.first_name);
      setLastName(fetchedUser.last_name);
      setBirthday(fetchedUser.date_of_birth);
      setGender(fetchedUser.gender);
      setCountry(fetchedUser.country);
      setLanguage(fetchedUser.language);
      setAllergies(fetchedUser.allergies);
      setInterestedIn(fetchedUser.interested_in);
      setEmail(fetchedUser.email);
      setFollowed(
        fetchedUser &&
          fetchedUser.followers &&
          fetchedUser.followers.find((e: { id: any }) => e.id === currentUser.id)
          ? true
          : false,
      );
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const dispatch = useDispatch();
  const saveUser = async () => {
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
      date_of_birth: birthday,
      allergies,
      country,
      language,
      interested_in: interestedIn,
    };
    await dispatch(
      UpdateUserActions.updateUserRequest({
        token,
        id: user.id,
        user: newUser,
        oldLanguage: user.language,
        selectedLanguage: language,
      }),
    );
  };

  return (
    <View
      style={{
        flex: 0.7,
        paddingTop: Metrics.baseMargin,
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {edit ? (
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 0.5,
            }}
          >
            <Input
              // @ts-ignore
              style={{
                flex: 1,
                alignSelf: 'flex-end',
              }}
              disabled={!edit}
              label={translate('firstName')}
              value={firstName}
              onChangeText={(value: string) => setFirstName(value)}
            />
            <Input
              // @ts-ignore
              style={{
                flex: 1,
                alignSelf: 'flex-end',
              }}
              disabled={!edit}
              label={translate('lastName')}
              value={lastName}
              onChangeText={(value: string) => setLastName(value)}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 0.5,
            }}
          >
            {/* <Text style={{ fontSize: 13, color: Colors.blue, marginRight: 80, flexBasis: '20%' }}>description:</Text> */}
            <Input
              // @ts-ignore
              style={{
                flex: 1,
                alignSelf: 'flex-end',
              }}
              label={translate('email')}
              value={email}
              onChangeText={(value: string) => setEmail(value)}
            />
          </View>
        </View>
      ) : (
        <>
          <Text
            style={{
              fontSize: 40,
              color: Colors.blue,
            }}
          >
            {' '}
            {firstName + ' ' + lastName}{' '}
          </Text>
          <Text style={{ fontSize: 16, color: Colors.main }}> {email} </Text>
        </>
      )}
    </View>
  );
};

const mapDispatchToProps = {
  updateUser: UserActions.userSuccess,
};

export default connect(null, mapDispatchToProps)(DetailsForm);
