// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { RootState } from 'app/Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['payload'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  logout: null,
});

export const LoginTypes = Types;
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

// we've logged out
export const logout = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: RootState) => loginState.user !== null;

export const getToken = (loginState: RootState) => loginState.login.user;
