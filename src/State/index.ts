import { applyMiddleware, combineReducers, compose, createStore, Middleware, Store } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../Sagas';
import persistConfig from './ReduxPersist';

export interface ApplicationState {
  [key: string]: any;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

function bindMiddleware(middleware: Middleware[]) {
  if (__DEV__) {
    const composeEnhancers = (global as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return composeEnhancers(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middlewares);
}

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const rootReducer = combineReducers({
  login: require('../Containers/Login/Redux/LoginRedux').reducer,
  loginGoogle: require('../Containers/Login/Redux/LoginGoogleRedux'),
  loginApple: require('../Containers/Login/Redux/LoginAppleRedux'),
  resetPassword: require('../Containers/ResetPassword/Redux/RequestPasswordRedux'),
  token: require('./TokenRedux').reducer,
  alert: require('./AlertRedux').reducer,
  user: require('./UserRedux').reducer,
  register: require('../Containers/Login/Redux/RegisterRedux').reducer,
  updateUser: require('./UpdateUserRedux').reducer,
  uploadStory: require('./UploadStoryRedux').reducer,
  updateNotes: require('./NotesSelectionRedux').reducer,
  collection: require('./CollectionRedux').reducer,
  recipes: require('./RecipesRedux').reducer,
  perfumes: require('./PerfumesRedux').reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

const configureStore = (): Store<ApplicationState> => {
  const localStore: Store<ApplicationState> = createStore(persistedReducer, bindMiddleware(middlewares));

  sagaMiddleware.run(rootSaga);
  return localStore;
};

export const store = configureStore();
export const persistor = persistStore(store);
