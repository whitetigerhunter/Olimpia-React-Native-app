import { put, call } from 'redux-saga/effects';

import AlertActions from 'app/State/AlertRedux';

import API from '../../../Services/Api';
import RequestResetPasswordActions from '../Redux/RequestPasswordRedux';

const api = API.create();

function attemptsToResetPassword({ payload }: any) {
  return new Promise((resolve, reject) => {
    api
      .requestResetPassword(payload)
      .then((response) => {
        console.log(response);
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

export function* requestResetPasswordWatcher(payload: any): any {
  try {
    const response: any = yield call(attemptsToResetPassword, payload);

    if (response.ok) {
      yield put(RequestResetPasswordActions.requestResetPasswordSuccess(response));
    } else {
      yield put(AlertActions.alertRequest({ title: 'Login failed', description: 'user error' }));
    }
  } catch (e) {
    console.log(e);
    yield put(RequestResetPasswordActions.requestResetPasswordFailure(e));
    yield put(AlertActions.alertRequest({ title: 'Reset Password failed', description: 'failed' }));
  }
}
