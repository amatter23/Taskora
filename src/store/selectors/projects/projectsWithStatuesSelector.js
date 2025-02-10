import { createSelector } from '@reduxjs/toolkit';
import { selectProjects } from './projectsSelector';
const getProjects = state => selectProjects(state);
export const selectProjectsWithStatues = createSelector(
  [getProjects, (state, statusUuid) => statusUuid],
  (projects, statusUuid) => {
    return projects.filter(project => project?.statusUuid === statusUuid);
  }
);
