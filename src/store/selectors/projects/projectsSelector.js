import { createSelector } from '@reduxjs/toolkit';
const getProjects = state =>
  state.projects.queries?.['getProjects(undefined)']?.data;
export const selectProjects = createSelector([getProjects], projects => {
  if (!projects?.data) return [];
  return projects?.data;
});
