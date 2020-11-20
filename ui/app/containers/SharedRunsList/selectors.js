import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sharedRunsList state domain
 */

const selectSharedRunsListDomain = state =>
  state.sharedRunsList || initialState;

/**
 * Other specific selectors
 */

const makeSelectSharedRunsItems = () =>
  createSelector(
    selectSharedRunsListDomain,
    state => state.items,
  );

const makeSelectSharedRunsLoading = () =>
  createSelector(
    selectSharedRunsListDomain,
    state => state.loading,
  );

const makeSelectSharedRunsPage = () =>
  createSelector(
    selectSharedRunsListDomain,
    state => state.page,
  );

const makeSelectSharedRunsTotal = () =>
  createSelector(
    selectSharedRunsListDomain,
    state => state.total,
  );

const makeSelectSharedFilder = () =>
  createSelector(
    selectSharedRunsListDomain,
    state => state.filter,
  );

/**
 * Default selector used by SharedRunsList
 */

const makeSelectSharedRunsList = () =>
  createSelector(
    selectSharedRunsListDomain,
    substate => substate,
  );

export default makeSelectSharedRunsList;
export {
  selectSharedRunsListDomain,
  makeSelectSharedRunsItems,
  makeSelectSharedRunsLoading,
  makeSelectSharedRunsPage,
  makeSelectSharedRunsTotal,
  makeSelectSharedFilder
};
