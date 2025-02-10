import { createSelector } from '@reduxjs/toolkit';
import { selectTasksFullData } from './tasksFallDataSelector';
const selectTasks = state => selectTasksFullData(state);
export const selectTaskWithUuid = createSelector(
  [selectTasks, (state, uuid) => uuid],
  (tasks, uuid) => {
    return tasks.find(task => task?.uuid === uuid);
  }
);
