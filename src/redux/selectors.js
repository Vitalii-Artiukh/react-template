import { createSelector } from '@reduxjs/toolkit';

export const selectItems = state => state.tasks.items;

export const selectIsLoading = state => state.tasks.isLoading;

export const selectError = state => state.tasks.error;

export const selectStatusFilter = state => state.filters.status;

export const selectTasks = state => state.tasks;

export const selectVisibleItems = createSelector(
  [selectItems, selectStatusFilter],
  (items, statusFilter) => {
    switch (statusFilter) {
      case 'active':
        return items.filter(task => !task.completed);
      case 'completed':
        return items.filter(task => task.completed);
      default:
        return items;
    }
  }
);

export const selectTaskCount = createSelector([selectItems], items => {
  return items.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }
      return acc;
    },
    { active: 0, completed: 0 }
  );
});
