import { createSelector } from '@reduxjs/toolkit';
import { selectTasks } from './tasksSelector';
const getTasks = state => selectTasks(state);
export const selectTasksWithStatues = createSelector(
  [getTasks, (state, statusUuid) => statusUuid],
  (tasks, statusUuid) => {
    return tasks.filter(task => task?.statusUuid === statusUuid);
  }
);
