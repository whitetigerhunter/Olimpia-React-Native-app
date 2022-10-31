// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { RootState } from './../Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['payload'],
  userSuccess: ['user'],
  userFailure: ['error'],
  setStory: ['story'],
  setNotes: ['notes'],
  setPerfumes: ['perfumes'],
  setLocation: ['location'],
  removeUser: null,
});

export const userTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  error: null,
  fetching: false,
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: RootState) => state.merge({ fetching: true });

// we've successfully logged in
export const success = (state: RootState, { user }: any) =>
  state.merge({ fetching: false, error: null, user });

// we've had a problem logging in
export const failure = (state: RootState, { error }: any) => state.merge({ fetching: false, error });
// save story
export const setStoryReducer = (state: RootState, { story }: any) => state.merge({ story });
// save notes
export const setNotesReducer = (state: RootState, { notes }: any) => state.merge({ notes });
// save perfumes
export const setPerfumesReducer = (state: RootState, { perfumes }: any) => state.merge({ perfumes });

export const removeUserReducer = (state: RootState) => {
  return INITIAL_STATE;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.SET_STORY]: setStoryReducer,
  [Types.SET_NOTES]: setNotesReducer,
  [Types.SET_PERFUMES]: setPerfumesReducer,
  [Types.REMOVE_USER]: removeUserReducer,
});
