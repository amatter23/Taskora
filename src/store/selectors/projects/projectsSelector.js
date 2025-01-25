import { createSelector } from '@reduxjs/toolkit';
// Import necessary data selectors
const getProjects = state =>
  state.projects.queries?.['getProjects(undefined)']?.data;
// Selector to get projects
export const selectProjects = createSelector([getProjects], projects => {
  if (!projects?.data) return [];
  return projects.data;
});
