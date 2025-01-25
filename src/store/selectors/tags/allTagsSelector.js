import { createSelector } from '@reduxjs/toolkit';

const selectTags = state => state.tags.queries?.['getTags(undefined)']?.data;

export const selectAllTags = createSelector(
  [selectTags],
  statuses => statuses?.data ?? []
);
