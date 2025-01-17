import { configureStore } from '@reduxjs/toolkit';
import { projectsApi } from './services/projectsApi';
import { tasksApi } from './services/tasksApi';
import { tagsApi } from './services/tagsApi';
import { statusesApi } from './services/statusesApi';
export const additionalMiddleware = [
  projectsApi.middleware,
  tasksApi.middleware,
  tagsApi.middleware,
  statusesApi.middleware,
  // Add future middleware here
];
export const store = configureStore({
  reducer: {
    [projectsApi.reducerPath]: projectsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [statusesApi.reducerPath]: statusesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(additionalMiddleware),
});
