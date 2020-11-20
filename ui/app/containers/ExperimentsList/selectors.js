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

const makeSelectExperimentListFilterQuery = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.filter.query,
  );

const makeSelectExperimentListFilterDateStart = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.filter.dateStart,
  );

const makeSelectExperimentListFilterDateEnd = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.filter.dateEnd,
  );

const makeSelectExperimentListFilter = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.filter,
  );

export {
  makeSelectExperimentListItems,
  makeSelectExperimentListPage,
  makeSelectExperimentListLoading,
  makeSelectExperimentListTotal,
  makeSelectExperimentListFilterQuery,
  makeSelectExperimentListFilterDateStart,
  makeSelectExperimentListFilterDateEnd,
  makeSelectExperimentListFilter,
};
