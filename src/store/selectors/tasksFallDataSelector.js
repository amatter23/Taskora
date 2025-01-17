import { createSelector } from '@reduxjs/toolkit';
// Import necessary data selectors
const selectTasks = state => state.tasks.queries?.['getTasks(undefined)']?.data;
const selectTags = state => state.tags.queries?.['getTags(undefined)']?.data;
const selectStatuses = state =>
  state.statuses.queries?.['getStatuses(undefined)']?.data;
console.log('taskes render');
// Selector to get tasks and add status data, tags data and to each task
export const selectTasksFullData = createSelector(
  [selectTasks, selectTags, selectStatuses],
  (tasks, tags, statuses) => {
    return tasks.data.map(task => ({
      ...task,
      tags: tags.data.find(tag => task.tagUuid === tag.uuid),
      status: statuses.data.find(status => status.uuid === task.statusUuid),
    }));
  }
);
