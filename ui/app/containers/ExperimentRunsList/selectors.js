import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentsRunsList = state => state.runs || initialState;

const makeSelectExperimentRunsListResults = () =>
  createSelector(
    selectExperimentsRunsList,
    state => state.results,
  );

const makeSelectExperimentRunsListPage = () =>
  createSelector(
    selectExperimentsRunsList,
    state => state.page,
  );

const makeSelectExperimentRunsListLoading = () =>
  createSelector(
    selectExperimentsRunsList,
    state => state.loading,
  );

const makeSelectExperimentRunsListCount = () =>
  createSelector(
    selectExperimentsRunsList,
    state => state.count,
  );

const makeSelectExperimentRunsListFilter = () =>
  createSelector(
    selectExperimentsRunsList,
    state => state.filter,
  );

const makeSelectExperimentRunsListExperimentId = () =>
  createSelector(
    selectExperimentsRunsList,
    state => state.experimentId,
  );

export {
  makeSelectExperimentRunsListResults,
  makeSelectExperimentRunsListPage,
  makeSelectExperimentRunsListLoading,
  makeSelectExperimentRunsListCount,
  makeSelectExperimentRunsListFilter,
  makeSelectExperimentRunsListExperimentId,
};
