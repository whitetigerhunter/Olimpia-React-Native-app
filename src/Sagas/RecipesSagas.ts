import { put, call } from 'redux-saga/effects';

import AlertActions from 'app/State/AlertRedux';
import RecipesActions from 'app/State/RecipesRedux';

import API from '../Services/Api';
// attempts to login
const api = API.create();

function attemptsToFetchRecipes({ payload }: any) {
  return new Promise((resolve, reject) => {
    api
      .getRecipes(payload)
      .then((response: any) => {
        if (response?.ok) {
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

export function* recipesWatcher(payload: any): Record<string, any> {
  try {
    const response = yield call(attemptsToFetchRecipes, payload);

    yield put(RecipesActions.recipesSuccess(response));
  } catch (e) {
    yield put(RecipesActions.recipesFailure(e));
    console.log('RECIPES_FAILURE', e);
    yield put(
      AlertActions.alertRequest({ title: 'Fetching recipes failed', description: e.fallback_message }),
    );
  }
}
