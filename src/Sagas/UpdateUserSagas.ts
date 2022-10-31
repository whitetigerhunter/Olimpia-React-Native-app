import AsyncStorage from '@react-native-community/async-storage';
// @ts-ignore: no TS definition for external library
import RNRestart from 'react-native-restart';
import { put, call } from 'redux-saga/effects';

import API from 'app/Services/Api';
import AlertActions from 'app/State/AlertRedux';
import updateUserActions from 'app/State/UpdateUserRedux';
import UserActions from 'app/State/UserRedux';

const api = API.create();
function attemptsToUpdateUser({ payload }: any) {
  const { token, id, user } = payload;
  return new Promise((resolve, reject) => {
    api
      .updateUser(token, id, user)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function* userUpdateWatcher(payload: any): object {
  try {
    const response = yield call(attemptsToUpdateUser, payload);
    const { oldLanguage, selectedLanguage } = payload.payload;
    if (response.ok) {
      yield put(updateUserActions.updateUserSuccess(response.data));
      yield put(UserActions.userSuccess(response.data));
      AsyncStorage.setItem('selectedLanguage', selectedLanguage);
      if (selectedLanguage !== oldLanguage) {
        RNRestart.Restart();
      }
    }
  } catch (e) {
    yield put(updateUserActions.updateUserFailure(e));
    yield put(AlertActions.alertRequest({ title: 'Update failed', description: e.fallback_message }));
  }
}
