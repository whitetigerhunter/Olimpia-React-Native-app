import * as Sentry from '@sentry/react-native';
import { put, call, select } from 'redux-saga/effects';

import API from 'app/Services/Api';
import AlertActions from 'app/State/AlertRedux';
import TokenActions from 'app/State/TokenRedux';
import userActions from 'app/State/UserRedux';
import { translate } from 'app/translations/translationHelpers';

import LoginActions, { getToken } from '../Redux/LoginRedux';
// attempts to login
const api = API.create();

function attemptsToLogin({ payload }: any) {
  console.log(payload);
  return new Promise((resolve, reject) => {
    api
      .authenticate(payload)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((err) => {
        Sentry.captureException(err);
        reject(err);
      });
  });
}

export function* loginWatcher(payload: any): any {
  try {
    const response: any = yield call(attemptsToLogin, payload);
    console.log(response);
    if (response.key) {
      yield put(LoginActions.loginSuccess(response));
      const userPayload = yield select(getToken);
      const { key } = userPayload;
      yield put(TokenActions.setToken(key));
      yield put(userActions.userRequest({ token: key }));
    } else {
      yield put(AlertActions.alertRequest({ title: 'Login failed', description: 'user error' }));
    }
  } catch (e) {
    console.log(e);
    Sentry.captureException(e);
    if (e.problem === 'TIMEOUT_ERROR') {
      yield put(LoginActions.loginFailure(e));
      yield put(
        AlertActions.alertRequest({
          title: translate('loginFailed'),
          description: translate('userError'),
        }),
      );
    }
    yield put(LoginActions.loginFailure(e));
    yield put(
      AlertActions.alertRequest({ title: translate('loginFailed'), description: e.data.fallback_message }),
    );
  }
}
