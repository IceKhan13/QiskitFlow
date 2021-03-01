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

const makeSelectSharedRunsResults = () =>
  createSelector(
    selectSharedRunsListDomain,
    state => state.results,
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

const makeSelectSharedRunsCount = () =>
  createSelector(
    selectSharedRunsListDomain,
    state => state.count,
  );

const makeSelectSharedFilter = () =>
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
  makeSelectSharedRunsResults,
  makeSelectSharedRunsLoading,
  makeSelectSharedRunsPage,
  makeSelectSharedRunsCount,
  makeSelectSharedFilter,
};
