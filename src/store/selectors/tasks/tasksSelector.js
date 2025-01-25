import { createSelector } from '@reduxjs/toolkit';
// Import necessary data selectors
const getPTasks = state => state.tasks.queries?.['getTasks(undefined)']?.data;
// Selector to get projects
export const selectTasks = createSelector([getPTasks], tasks => {
  if (!tasks?.data) return [];
  return tasks.data;
});
