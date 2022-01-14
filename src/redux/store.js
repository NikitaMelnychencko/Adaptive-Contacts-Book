import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import contactsReducer from './contacts/phonebook-reducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  REGISTER,
  PURGE,
  PERSIST,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'contacts',
  storage,
};
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];
const rootReducer = combineReducers({
  contacts: contactsReducer,
});
const persisterReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persisterReducer,
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});
const persistor = persistStore(store);

export default { store, persistor };
