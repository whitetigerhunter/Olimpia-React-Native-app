import * as Sentry from '@sentry/react-native';
import { put } from 'redux-saga/effects';

import UserActions from 'app/State/UserRedux';

export function* locationWatcher(payload: any) {
  try {
    yield put(UserActions.setLocation(payload.location));
  } catch (e) {
    Sentry.captureException(e);
    console.log('ERROR LOCATION SAGAS', e);
  }
}
