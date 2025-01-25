import { createSelector } from '@reduxjs/toolkit';
import { selectTasksFullData } from '../tasks/tasksFallDataSelector';
// Import necessary data selectors
const selectProjects = state =>
  state.projects.queries?.['getProjects(undefined)']?.data;
const selectTasks = state => selectTasksFullData(state);
const selectStatuses = state =>
  state.statuses.queries?.['getStatuses(undefined)']?.data;
// Selector to get projects and add status data and tasks data to each project
export const selectProjectsFullData = createSelector(
  [selectProjects, selectTasks, selectStatuses],
  (projects, tasks, statuses) => {
    if (!projects?.data || !tasks) return [];
    return projects.data.map(project => ({
      ...project,
      tasks: tasks.filter(task => task.projectUuid === project.uuid),
      status: statuses.data.find(status => status.uuid === project.statusUuid),
    }));
  }
);
