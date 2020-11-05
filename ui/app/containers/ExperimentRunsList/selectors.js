import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentsRunsList = state => state.runs || initialState;

const makeSelectExperimentRunsListItems = () =>
  createSelector(
    selectExperimentsRunsList,
    experimentsListState => experimentsListState.items,
  );

const makeSelectExperimentRunsListPage = () =>
  createSelector(
    selectExperimentsRunsList,
    experimentsListState => experimentsListState.page,
  );

const makeSelectExperimentRunsListLoading = () =>
  createSelector(
    selectExperimentsRunsList,
    experimentsListState => experimentsListState.loading,
  );

const makeSelectExperimentRunsListTotal = () =>
  createSelector(
    selectExperimentsRunsList,
    experimentsListState => experimentsListState.total,
  );

export {
  makeSelectExperimentRunsListItems,
  makeSelectExperimentRunsListPage,
  makeSelectExperimentRunsListLoading,
  makeSelectExperimentRunsListTotal,
};
