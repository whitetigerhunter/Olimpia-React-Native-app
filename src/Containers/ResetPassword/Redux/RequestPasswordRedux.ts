// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from 'Containers/App';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestResetPasswordRequest: ['payload'],
  requestResetPasswordSuccess: ['user'],
  requestResetPasswordFailure: ['error'],
});

export const RequestResetPasswordTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  error: null,
  fetching: false,
});

/* ------------- Reducers ------------- */

export const request = (state: RootState) => state.merge({ fetching: true });

export const success = (state: RootState, { user }: any) =>
  state.merge({ fetching: false, error: null, user });

export const failure = (state: RootState, { error }: any) => state.merge({ fetching: false, error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_RESET_PASSWORD_REQUEST]: request,
  [Types.REQUEST_RESET_PASSWORD_SUCCESS]: success,
  [Types.REQUEST_RESET_PASSWORD_FAILURE]: failure,
});
