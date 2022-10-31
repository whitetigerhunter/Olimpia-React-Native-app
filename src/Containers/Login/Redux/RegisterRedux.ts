// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { RootState } from 'app/Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ['payload'],
  registerSuccess: ['user'],
  registerFailure: ['error'],
});

export const RegisterTypes = Types;
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure,
});

/* ------------- Selectors ------------- */
