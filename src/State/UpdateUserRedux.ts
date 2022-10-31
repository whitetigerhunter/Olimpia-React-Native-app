import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from './../Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateUserRequest: ['payload'],
  updateUserSuccess: ['users'],
  updateUserFailure: ['error'],
});

export const updateUserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  users: null,
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_USER_REQUEST]: request,
  [Types.UPDATE_USER_SUCCESS]: success,
  [Types.UPDATE_USER_FAILURE]: failure,
});
