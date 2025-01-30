/**
 * Selector that combines project data with related tasks, status, and tag information.
 * Creates a new array of project objects with enriched data.
 *
 * @function selectProjectsFullData
 * @param {Object} state - The Redux state object
 * @returns {Array<Object>} Array of project objects with the following structure:
 *   @property {string} uuid - Project's unique identifier
 *   @property {Array<Object>} tasks - Array of tasks associated with the project
 *   @property {Object} status - Status object associated with the project
 *   @property {Object} tag - Tag object associated with the project
 *   @property {...any} other - All other original project properties
 *
 * @requires selectProjects - Selector for projects state
 * @requires selectTasks - Selector for tasks state
 * @requires selectStatuses - Selector for statuses state
 * @requires selectTags - Selector for tags state
 *
 * @example
 * const projectsWithFullData = useSelector(selectProjectsFullData);
 */

import { createSelector } from '@reduxjs/toolkit';
import { selectTasksFullData } from '../tasks/tasksFallDataSelector';
const selectProjects = state =>
  state.projects.queries?.['getProjects(undefined)']?.data;
const selectTasks = state => selectTasksFullData(state);
const selectStatuses = state =>
  state.statuses.queries?.['getStatuses(undefined)']?.data;
const selectTags = state => state.tags.queries?.['getTags(undefined)']?.data;

export const selectProjectsFullData = createSelector(
  [selectProjects, selectTasks, selectStatuses, selectTags],
  (projects, tasks, statuses, tags) => {
    if (!projects?.data || !tasks) return [];
    return projects.data.map(project => ({
      ...project,
      tasks: tasks.filter(task => task.projectUuid === project.uuid),
      status: statuses.data.find(status => status.uuid === project.statusUuid),
      tag: tags.data.find(tag => tag.uuid === project.tagUuid),
    }));
  }
);
