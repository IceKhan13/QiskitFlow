import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentsList = state => state.experiments || initialState;

const makeSelectExperimentListResults = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.results,
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

const makeSelectExperimentListCount = () =>
  createSelector(
    selectExperimentsList,
    experimentsListState => experimentsListState.count,
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
  makeSelectExperimentListResults,
  makeSelectExperimentListPage,
  makeSelectExperimentListLoading,
  makeSelectExperimentListCount,
  makeSelectExperimentListFilterQuery,
  makeSelectExperimentListFilterDateStart,
  makeSelectExperimentListFilterDateEnd,
  makeSelectExperimentListFilter,
};
