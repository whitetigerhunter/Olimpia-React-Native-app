import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from './../Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setToken: ['token'],
  removeToken: null,
});

export const TokenTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token: null,
});

/* ------------- Reducers ------------- */

// we've successfully logged in
export const setTokenReducer = (state: RootState, { token }: any) => {
  return state.merge({ token });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const removeTokenReducer = (state: RootState) => {
  return INITIAL_STATE;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TOKEN]: setTokenReducer,
  [Types.REMOVE_TOKEN]: removeTokenReducer,
});

// Selector

export const getTokenSelector = (loginState: RootState) => loginState.login.user;
