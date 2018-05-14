import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistCombineReducers } from 'redux-persist';

import RootReducer from '../Reducers/RootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
    debug: true
};

const reducer = persistCombineReducers(persistConfig, RootReducer);

export default () => {
    const store = createStore(reducer, applyMiddleware(thunk, logger));
    const persistor = persistStore(store);

    return { store, persistor };
};