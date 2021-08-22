import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';
import languageProviderReducer from './containers/LanguageProvider/reducer';

export const createReducer = (injectedReducers = {}) => (state, action) => {
  return rootReducer(injectedReducers)(state, action);
};

const rootReducer = (injectedReducers) =>
  combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
