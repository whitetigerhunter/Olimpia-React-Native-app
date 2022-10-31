import * as Sentry from '@sentry/react-native';
import { put } from 'redux-saga/effects';

import UserActions from 'app/State/UserRedux';

export function* addNoteWatcher(note: any) {
  const { newNotes } = note;
  try {
    yield put(UserActions.setNotes(newNotes));
  } catch (e) {
    Sentry.captureException(e);
    console.log('error updating notes', e);
  }
}
