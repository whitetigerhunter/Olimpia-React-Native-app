import { put, call } from 'redux-saga/effects';

import AlertActions from 'app/State/AlertRedux';
import collectionActions from 'app/State/CollectionRedux';
import UserActions from 'app/State/UserRedux';

import API from '../Services/Api';
import NavigationService from '../Services/NavigationService';
// attempts to login
const api = API.create();
function attemptsToUpdateSelection({ payload }: any) {
  const { notes, id, token, latitude, longitude } = payload;
  return new Promise((resolve, reject) => {
    api
      //@ts-ignore
      .collection(notes, id, token, latitude, longitude)
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

export function* collectionWatcher(payload: any): object {
  try {
    const response = yield call(attemptsToUpdateSelection, payload);

    console.log('response', response);
    if (response.ok) {
      yield put(collectionActions.collectionSuccess(response));
      yield put(UserActions.setPerfumes(response.data.matched_perfumes));
      NavigationService.navigate('Perfumes');
    }
  } catch (e) {
    // yield put(updateUserActions.updateUserFailure(e));
    console.log('error fetching perfumes', e);
    yield put(collectionActions.collectionFailure(e));
    yield put(AlertActions.alertRequest({ title: 'Failed', description: e.fallback_message }));
  }
}
