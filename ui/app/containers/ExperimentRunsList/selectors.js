import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the experimentRunsList state domain
 */

const selectExperimentRunsListDomain = state =>
  state.experimentRunsList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExperimentRunsList
 */

const makeSelectExperimentRunsList = () =>
  createSelector(
    selectExperimentRunsListDomain,
    substate => substate,
  );

export default makeSelectExperimentRunsList;
export { selectExperimentRunsListDomain };
