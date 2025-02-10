import { createSelector } from '@reduxjs/toolkit';
import { selectProjectsFullData } from './projectsFullDataSelector';
const selectProjects = state => selectProjectsFullData(state);
export const selectProjectWithUuid = createSelector(
  [selectProjects, (state, uuid) => uuid],
  (projects, uuid) => {
    return projects.find(project => project?.uuid === uuid);
  }
);
