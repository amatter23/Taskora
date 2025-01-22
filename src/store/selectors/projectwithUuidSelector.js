import { createSelector } from '@reduxjs/toolkit';
import { selectProjectsFullData } from './projectsFullDataSelector';

// Base selector to get projects data
const selectProjects = state => selectProjectsFullData(state);

// Selector to get project by UUID
export const selectProjectWithUuid = createSelector(
  [selectProjects, (state, uuid) => uuid],
  (projects, uuid) => {
    return projects.find(project => project.uuid === uuid);
  }
);
