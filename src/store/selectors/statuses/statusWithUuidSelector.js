import { createSelector } from '@reduxjs/toolkit';

const selectStatuses = state =>
  state.statuses?.queries?.['getStatuses(undefined)']?.data ?? { data: [] };

export const selectStatusWithUuid = createSelector(
  [selectStatuses, (state, uuid) => uuid],
  (statuses, uuid) => {
    return statuses?.data?.find(status => status?.uuid === uuid);
  }
);
