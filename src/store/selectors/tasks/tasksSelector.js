import { createSelector } from '@reduxjs/toolkit';
const getPTasks = state => state.tasks.queries?.['getTasks(undefined)']?.data;
export const selectTasks = createSelector([getPTasks], tasks => {
  if (!tasks?.data) return [];
  return tasks?.data;
});
