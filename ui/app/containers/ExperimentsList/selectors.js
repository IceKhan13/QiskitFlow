import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentsListItems = state => state.items || initialState;
const selectExperimentsListPage = state => state.page || initialState;
const selectExperimentsListLoading = state => state.loading || initialState;
const selectExperimentsListTotal = state => state.total || initialState;

const makeSelectExperimentListItems = () =>
  createSelector(
    selectExperimentsListItems,
    experimentsListState => experimentsListState.items,
  );

const makeSelectExperimentListPage = () =>
  createSelector(
    selectExperimentsListPage,
    experimentsListState => experimentsListState.page,
  );

const makeSelectExperimentListLoading = () =>
  createSelector(
    selectExperimentsListLoading,
    experimentsListState => experimentsListState.loading,
  );

const makeSelectExperimentListTotal = () =>
  createSelector(
    selectExperimentsListTotal,
    experimentsListState => experimentsListState.total,
  );

export {
  makeSelectExperimentListItems,
  makeSelectExperimentListPage,
  makeSelectExperimentListLoading,
  makeSelectExperimentListTotal,
};
