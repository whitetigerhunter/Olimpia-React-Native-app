import { put, call } from 'redux-saga/effects';

import { Route } from 'app/Navigators';
import AlertActions from 'app/State/AlertRedux';
import uploadStoryActions from 'app/State/UploadStoryRedux';
import UserActions from 'app/State/UserRedux';
import { translate } from 'app/translations/translationHelpers';

import API from '../Services/Api';
import NavigationService from '../Services/NavigationService';
// attempts to login
const api = API.create();
function attemptsToUploadStory({ payload }: any) {
  console.log('attemptsToUploadStory');
  const { story, token } = payload;
  console.log('payload', JSON.stringify(payload));
  return new Promise((resolve, reject) => {
    api
      .uploadStory(story, token)
      .then((response) => {
        console.log('attemptsToUploadStory response', JSON.stringify(response));
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

export function* storyUploadWatcher(payload: any): object {
  const { videoURL } = payload;
  console.log('Story UPLOAD:', payload);
  console.log('Story UPLOAD payload', JSON.stringify(payload))
  try {
    const response = yield call(attemptsToUploadStory, payload);
    console.log('Story UPLOAD response', response);
    if (response.ok && response.status === 202) {
      yield put(
        AlertActions.alertRequest({ title: translate('failed'), description: translate('storyShort') }),
      );
      NavigationService.navigate(Route.SelectStoryType);
      return;
    }
    if (response.ok && response.status === 201) {
      yield put(uploadStoryActions.uploadStorySuccess(response.data));
      yield put(UserActions.setStory(videoURL));
      yield put(UserActions.setNotes(response.data));
    }
  } catch (e) {
    // yield put(updateUserActions.updateUserFailure(e));
    console.log('error upload story', e);
    yield put(uploadStoryActions.uploadStoryFailure(e));
    yield put(AlertActions.alertRequest({ title: translate('failed'), description: e.data[0] }));
    NavigationService.navigate(Route.SelectStoryType);
  }
}
