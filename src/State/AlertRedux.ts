import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { RootState } from './../Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  alertRequest: ['content'],
  alertDismiss: [],
});

export const AlertTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  show: false,
  content: null,
});

/* ------------- Reducers ------------- */

// we've successfully logged in
export const alert = (state: RootState, { content }: any) => ({ show: true, content });
// we've logged out
export const hide = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALERT_REQUEST]: alert,
  [Types.ALERT_DISMISS]: hide,
});
