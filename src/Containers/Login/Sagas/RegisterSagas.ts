import { put, call } from 'redux-saga/effects';

import * as types from 'app/Constants/types';
import API from 'app/Services/Api';
import AlertActions from 'app/State/AlertRedux';
import TokenActions from 'app/State/TokenRedux';
import userActions from 'app/State/UserRedux';

import RegisterActions from '../Redux/RegisterRedux';
// attempts to login
const api = API.create();

function attemptsToRegister(payload: types.RegistrationPayload) {
  return new Promise((resolve, reject) => {
    api
      .register(payload)
      .then((response) => {
        console.log(response);
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

export function* registerWatcher({ payload }: { payload: types.RegistrationPayload }): any {
  try {
    const response: any = yield call(attemptsToRegister, payload);
    console.log(response);

    /* yield put(RegisterActions.registerSuccess(response)); */

    yield put(TokenActions.setToken(response.key));
    yield put(userActions.userRequest({ token: response.key }));
  } catch (e) {
    console.log(e);
    yield put(RegisterActions.registerFailure(e));
    yield put(AlertActions.alertRequest({ title: 'register failed', description: e.fallback_message }));
  }
}
