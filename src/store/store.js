import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { projectsApi } from './services/projectsApi';
import { tasksApi } from './services/tasksApi';
import { tagsApi } from './services/tagsApi';
import { statusesApi } from './services/statusesApi';
import { authApi } from './services/authApi';
import typeViewReducer from './slice/typeViewSlice';
import themeReducer from './slice/themeSlice';
import modalReducer from './slice/modalSlice';
import modalComponentReducer from './slice/modalComponentSlice';
import authReducer from './slice/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'], 
};

const rootReducer = combineReducers({
  [projectsApi.reducerPath]: projectsApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [statusesApi.reducerPath]: statusesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  modal: modalReducer,
  modalComponent: modalComponentReducer,
  typeView: typeViewReducer,
  theme: themeReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      projectsApi.middleware,
      tasksApi.middleware,
      tagsApi.middleware,
      statusesApi.middleware,
      authApi.middleware,
    ]),
});

export const persistor = persistStore(store);
