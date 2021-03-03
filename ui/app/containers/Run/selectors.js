import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the run state domain
 */

const selectRunDomain = state => state.run || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Run
 */

const makeSelectRun = () =>
  createSelector(
    selectRunDomain,
    substate => substate,
  );

const makeSelectRunMetrics = () =>
  createSelector(
    selectRunDomain,
    state => state.metrics,
  );

const makeSelectRunParameters = () =>
  createSelector(
    selectRunDomain,
    state => state.parameters,
  );

const makeSelectRunCounts = () =>
  createSelector(
    selectRunDomain,
    state => state.counts,
  );

const makeSelectRunExperiment = () =>
  createSelector(
    selectRunDomain,
    state => state.experiment,
  );

const makeSelectRunId = () =>
  createSelector(
    selectRunDomain,
    state => state.runId,
  );

const makeSelectIsPublic = () =>
  createSelector(
    selectRunDomain,
    state => state.is_public,
  );

export default makeSelectRun;
export {
  selectRunDomain,
  makeSelectRunMetrics,
  makeSelectRunParameters,
  makeSelectRunCounts,
  makeSelectRunExperiment,
  makeSelectRunId,
  makeSelectIsPublic,
};
