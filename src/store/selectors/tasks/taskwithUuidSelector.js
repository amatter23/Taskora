import { createSelector } from '@reduxjs/toolkit';
import { selectTasksFullData } from './tasksFallDataSelector';

// Base selector to get tasks data
const selectTasks = state => selectTasksFullData(state);

// Selector to get task by UUID
export const selectTaskWithUuid = createSelector(
  [selectTasks, (state, uuid) => uuid],
  (tasks, uuid) => {
    return tasks.find(task => task.uuid === uuid);
  }
);
