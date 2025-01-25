import { createSelector } from '@reduxjs/toolkit';
import { selectProjects } from './projectsSelector';

// Base selector to get projects data
const getProjects = state => selectProjects(state);
// Selector to get project by UUID
export const selectProjectsWithStatues = createSelector(
  [getProjects, (state, statusUuid) => statusUuid],
  (projects, statusUuid) => {
    return projects.filter(project => project.statusUuid === statusUuid);
  }
);
