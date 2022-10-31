// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from 'Containers/App';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginGoogleRequest: ['payload'],
  loginGoogleSuccess: ['user'],
  loginGoogleFailure: ['error'],
  logoutGoogle: null,
});

export const LoginGoogleTypes = Types;
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
  [Types.LOGIN_GOOGLE_REQUEST]: request,
  [Types.LOGIN_GOOGLE_SUCCESS]: success,
  [Types.LOGIN_GOOGLE_FAILURE]: failure,
  [Types.LOGOUT_GOOGLE]: logout,
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: RootState) => loginState.user !== null;

export const getToken = (loginState: RootState) => loginState.login.user;
