import { createSelector } from '@reduxjs/toolkit';
import { selectTasks } from './tasksSelector';

// Base selector to get projects data
const getTasks = state => selectTasks(state);
// Selector to get tasks by UUID
export const selectTasksWithStatues = createSelector(
  [getTasks, (state, statusUuid) => statusUuid],
  (tasks, statusUuid) => {
    return tasks.filter(task => task.statusUuid === statusUuid);
  }
);
