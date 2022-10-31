import * as Sentry from '@sentry/react-native';
import { put, call } from 'redux-saga/effects';

import { Route } from 'app/Navigators';
import AlertActions from 'app/State/AlertRedux';
import notesSelectionActions from 'app/State/NotesSelectionRedux';
import RecipesActions from 'app/State/RecipesRedux';
import UserActions from 'app/State/UserRedux';

import API from '../Services/Api';
import NavigationService from '../Services/NavigationService';

// attempts to login
const api = API.create();
function attemptsToUpdateSelection({ payload }: any) {
  return new Promise((resolve, reject) => {
    api
      .notesSelection(payload)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((err: Error) => {
        Sentry.captureException(err);
        reject(err);
      });
  });
}

export function* notesSelectionWatcher(payload: any): any {
  try {
    const response = yield call(attemptsToUpdateSelection, payload);
    if (response.ok) {
      const redirect = payload.payload.redirectTo;

      if (redirect === Route.Dashboard) {
        yield put(notesSelectionActions.notesSelectionSuccess(response));
        yield put(RecipesActions.recipesRequest(payload.payload));
        return NavigationService.navigate(Route.Dashboard);
      } else if (redirect === Route.PersonalizedRecipeRecommendedPerfumes) {
        yield put(notesSelectionActions.notesSelectionSuccess(response));
        yield put(UserActions.setPerfumes(response.data.matched_perfumes));
        return NavigationService.navigate(Route.PersonalizedRecipeRecommendedPerfumes, {
          suggestionId: payload.payload.id,
          notes: [...payload.payload.selected_notes, ...payload.payload.added_notes],
          longitude: payload.payload.longitude,
          latitude: payload.payload.latitude,
          isFromPersonalizedRecipe: true,
        });
      } else if (redirect === Route.Perfumes) {
        yield put(notesSelectionActions.notesSelectionSuccess(response));
        yield put(UserActions.setPerfumes(response.data.matched_perfumes));
        return NavigationService.navigate(Route.Perfumes, {
          longitude: payload.payload.longitude,
          latitude: payload.payload.latitude,
        });
      }
    }
  } catch (e) {
    Sentry.captureException(e);
    console.log('error fetching perfumes', e);
    yield put(notesSelectionActions.notesSelectionFailure(e));
    yield put(AlertActions.alertRequest({ title: 'Failed', description: e.fallback_message }));
  }
}
