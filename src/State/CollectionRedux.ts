import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from './../Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  collectionRequest: ['payload'],
  collectionSuccess: ['success'],
  collectionFailure: ['error'],
});

export const collectionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  collection: null,
  error: null,
  fetching: false,
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: RootState) => state.merge({ fetching: true });

// we've successfully logged in
export const success = (state: RootState, { collection }: any) =>
  state.merge({ fetching: false, error: null, collection });

// we've had a problem logging in
export const failure = (state: RootState, { error }: any) => state.merge({ fetching: false, error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COLLECTION_REQUEST]: request,
  [Types.COLLECTION_SUCCESS]: success,
  [Types.COLLECTION_FAILURE]: failure,
});
