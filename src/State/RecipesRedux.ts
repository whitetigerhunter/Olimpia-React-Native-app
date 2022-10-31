import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from 'app/Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  recipesRequest: ['payload'],
  recipesSuccess: ['success'],
  recipesFailure: ['error'],
});

export const recipesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  recipes: null,
  error: null,
  fetching: false,
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: RootState) => state.merge({ fetching: true });

// we've successfully logged in
export const success = (state: RootState, recipes: any) => {
  const recipesArray = recipes.success.recipes;
  return state.merge({ fetching: false, error: null, recipes: recipesArray });
};

// we've had a problem logging in
export const failure = (state: RootState, { error }: any) => state.merge({ fetching: false, error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RECIPES_REQUEST]: request,
  [Types.RECIPES_SUCCESS]: success,
  [Types.RECIPES_FAILURE]: failure,
});
