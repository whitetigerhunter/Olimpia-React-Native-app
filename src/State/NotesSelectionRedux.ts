import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from '../Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notesSelectionRequest: ['payload'],
  notesSelectionSuccess: ['success'],
  notesSelectionFailure: ['error'],
  notesSelectionAddNote: ['newNotes'],
});

export const updateNotesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  notes: null,
  error: null,
  fetching: false,
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: RootState) => state.merge({ fetching: true });

// we've successfully logged in
export const success = (state: RootState, { notes }: any) =>
  state.merge({ fetching: false, error: null, notes });

// we've had a problem logging in
export const failure = (state: RootState, { error }: any) => state.merge({ fetching: false, error });

export const addNote = (state: RootState, newNotes: any) =>
  state.merge({ fetching: false, error: null, notes: newNotes });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTES_SELECTION_REQUEST]: request,
  [Types.NOTES_SELECTION_SUCCESS]: success,
  [Types.NOTES_SELECTION_FAILURE]: failure,
  [Types.NOTES_SELECTION_ADD_NOTE]: addNote,
});
