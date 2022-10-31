import { takeLatest, all } from 'redux-saga/effects';

import { collectionTypes } from 'app/State/CollectionRedux';
import { updateNotesTypes } from 'app/State/NotesSelectionRedux';
import { recipesTypes } from 'app/State/RecipesRedux';
import { StartupTypes } from 'app/State/StartupRedux';
import { updateUserTypes } from 'app/State/UpdateUserRedux';
import { uploadStoryTypes } from 'app/State/UploadStoryRedux';
import { userTypes } from 'app/State/UserRedux';

import { LoginAppleTypes } from '../Containers/Login/Redux/LoginAppleRedux';
import { LoginGoogleTypes } from '../Containers/Login/Redux/LoginGoogleRedux';
import { LoginTypes } from '../Containers/Login/Redux/LoginRedux';
import { RegisterTypes } from '../Containers/Login/Redux/RegisterRedux';
import { loginAppleWatcher } from '../Containers/Login/Sagas/LoginAppleSagas';
import { loginGoogleWatcher } from '../Containers/Login/Sagas/LoginGoogleSagas';
import { loginWatcher } from '../Containers/Login/Sagas/LoginSagas';
import { registerWatcher } from '../Containers/Login/Sagas/RegisterSagas';
import { RequestResetPasswordTypes } from '../Containers/ResetPassword/Redux/RequestPasswordRedux';
import { requestResetPasswordWatcher } from '../Containers/ResetPassword/Sagas/RequestResetPasswordSagas';
import { collectionWatcher } from './CollectionSagas';
import { notesSelectionWatcher } from './NotesSelectionSagas';
import { recipesWatcher } from './RecipesSagas';
import { startup } from './StartupSagas';
import { userUpdateWatcher } from './UpdateUserSagas';
import { storyUploadWatcher } from './UploadStorySagas';
import { userWatcher } from './UserSagas';
import { addNoteWatcher } from './addNewNoteSagas';

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, loginWatcher),
    takeLatest(RequestResetPasswordTypes.REQUEST_RESET_PASSWORD_REQUEST, requestResetPasswordWatcher),
    takeLatest(LoginAppleTypes.LOGIN_APPLE_REQUEST, loginAppleWatcher),
    takeLatest(LoginGoogleTypes.LOGIN_GOOGLE_REQUEST, loginGoogleWatcher),
    takeLatest(RegisterTypes.REGISTER_REQUEST as any, registerWatcher),
    takeLatest(userTypes.USER_REQUEST, userWatcher),
    takeLatest(updateUserTypes.UPDATE_USER_REQUEST, userUpdateWatcher),
    takeLatest(uploadStoryTypes.UPLOAD_STORY_REQUEST, storyUploadWatcher),
    takeLatest(updateNotesTypes.NOTES_SELECTION_ADD_NOTE, addNoteWatcher),
    takeLatest(collectionTypes.COLLECTION_REQUEST, collectionWatcher),
    takeLatest(updateNotesTypes.NOTES_SELECTION_REQUEST, notesSelectionWatcher),
    takeLatest(recipesTypes.RECIPES_REQUEST, recipesWatcher),

    // some sagas receive extra parameters in addition to an action
  ]);
}
