import AsyncStorage from '@react-native-community/async-storage';
import { put, call } from 'redux-saga/effects';

import AlertActions from 'app/State/AlertRedux';
import UserActions from 'app/State/UserRedux';

import API from '../Services/Api';
import NavigationService from '../Services/NavigationService';
// attempts to login
const api = API.create();

function attemptsToFetchUser({ payload }: any) {
  const { token } = payload;
  return new Promise((resolve, reject) => {
    api
      .getUser(token)
      .then((response) => {
        if (response.ok) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function* userWatcher(payload: any): Record<string, any> {
  try {
    const response = yield call(attemptsToFetchUser, payload);
    console.log('user fetching', response.client);
    //Toast.show('F =>' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()+ ':' + today.getMilliseconds())

    if (response) {
      AsyncStorage.setItem('selectedLanguage', response.language);
    }
    yield put(UserActions.userSuccess(response));
    //later I will refactor this when I know detials
    return NavigationService.navigateAndReset('HomeStack');
  } catch (e) {
    yield put(UserActions.userFailure(e));
    console.log('e user', e);
    yield put(
      AlertActions.alertRequest({ title: 'Fetching user failed', description: e.fallback_message }),
    );
  }
}
