import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentsList = state => state.experiments || initialState;

const makeSelectExperimentListItems = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.items,
  );

const makeSelectExperimentListPage = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.page,
  );

const makeSelectExperimentListLoading = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.loading,
  );

const makeSelectExperimentListTotal = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.total,
  );

export {
  makeSelectExperimentListItems,
  makeSelectExperimentListPage,
  makeSelectExperimentListLoading,
  makeSelectExperimentListTotal,
};
