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

/**
 * Default selector used by SharedRunsList
 */

const makeSelectSharedRunsList = () =>
  createSelector(
    selectSharedRunsListDomain,
    substate => substate,
  );

export default makeSelectSharedRunsList;
export { selectSharedRunsListDomain };
