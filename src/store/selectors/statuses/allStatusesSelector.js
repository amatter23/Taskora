import { createSelector } from '@reduxjs/toolkit';

const selectStatuses = state =>
  state.statuses.queries?.['getStatuses(undefined)']?.data;

export const selectAllStatuses = createSelector(
  [selectStatuses],
  statuses => statuses?.data ?? []
);
