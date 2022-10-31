import { put, call } from 'redux-saga/effects';

import { CrashlyticsService } from 'app/Services';
import API from 'app/Services/Api';
import AlertActions from 'app/State/AlertRedux';
import TokenActions from 'app/State/TokenRedux';
import userActions from 'app/State/UserRedux';
import { translate } from 'app/translations/translationHelpers';

import LoginAppleActions from '../Redux/LoginAppleRedux';
// attempts to login
const api = API.create();

function attemptsToLoginApple({ payload }: any) {
  return new Promise((resolve, reject) => {
    api
      .authenticateWithApple(payload)
      .then((response) => {
        if (response.ok) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((err) => {
        CrashlyticsService.logError(err, 'APPLE_SIGNIN_SAGAS_WORKER_ERROR');
        reject(err);
      });
  });
}

export function* loginAppleWatcher(payload: any): any {
  try {
    const response = yield call(attemptsToLoginApple, payload);
    if (response.key) {
      yield put(LoginAppleActions.loginAppleSuccess(response));
      yield put(TokenActions.setToken(response.key));
      yield put(userActions.userRequest({ token: response.key }));
    } else {
      yield put(
        AlertActions.alertRequest({
          title: translate('appleLoginFailed'),
          description: translate('userError'),
        }),
      );
    }
  } catch (e) {
    console.log('apple login error', e);
    CrashlyticsService.logError(e, 'APPLE_SIGNIN_SAGAS_WATCHER_ERROR');
    yield put(LoginAppleActions.loginAppleFailure(e));
    yield put(
      AlertActions.alertRequest({
        title: translate('appleLoginFailed'),
        description: translate('"errorFailedDesc"'),
      }),
    );
  }
}
