import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentsRunsList = state => state.runs || initialState;

const makeSelectExperimentRunsListItems = () =>
  createSelector(
    selectExperimentsRunsList,
    state => state.items,
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

const makeSelectExperimentRunsListTotal = () =>
  createSelector(
    selectExperimentsRunsList,
    state => state.total,
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
  makeSelectExperimentRunsListItems,
  makeSelectExperimentRunsListPage,
  makeSelectExperimentRunsListLoading,
  makeSelectExperimentRunsListTotal,
  makeSelectExperimentRunsListFilter,
  makeSelectExperimentRunsListExperimentId,
};
