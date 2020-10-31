import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the experimentsList state domain
 */

const selectExperimentsListDomain = state =>
  state.experimentsList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExperimentsList
 */

const makeSelectExperimentsList = () =>
  createSelector(
    selectExperimentsListDomain,
    substate => substate,
  );

export default makeSelectExperimentsList;
export { selectExperimentsListDomain };
