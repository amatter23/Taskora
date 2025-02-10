import { createSelector } from '@reduxjs/toolkit';
const selectTasks = state => state.tasks.queries?.['getTasks(undefined)']?.data;
const selectTags = state => state.tags.queries?.['getTags(undefined)']?.data;
const selectStatuses = state =>
  state.statuses.queries?.['getStatuses(undefined)']?.data;
const selectProjects = state =>
  state.projects.queries?.['getProjects(undefined)']?.data;
export const selectTasksFullData = createSelector(
  [selectTasks, selectTags, selectStatuses, selectProjects],
  (tasks, tags, statuses, projects) => {
    return tasks?.data.map(task => ({
      ...task,
      tag: tags?.data.find(tag => task?.tagUuid === tag?.uuid),
      status: statuses?.data.find(status => status?.uuid === task?.statusUuid),
      project: projects?.data.find(project => task?.projectUuid === project?.uuid),
    }));
  }
);
