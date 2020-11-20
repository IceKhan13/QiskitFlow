import { call, select, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  makeSelectExperimentListFilter,
  makeSelectExperimentListPage,
} from './selectors';
import { updateExperimentsAction } from './actions';

import { repoLoadingError } from '../App/actions';
import {
  GET_EXPERIMENTS,
  SET_FILTER_DATE_END,
  SET_FILTER_DATE_START,
  SET_FILTER_QUERY,
  SET_PAGE,
} from './constants';

export function* getExperiments() {
  const parameters = yield select(makeSelectExperimentListFilter());
  const page = yield select(makeSelectExperimentListPage());
  console.log(
    `Request for experiments with params ${parameters} for page ${page}`,
  );
  const requestUrl = `https://run.mocky.io/v3/c21c6c4f-1164-46a6-849c-720b84b3cce0`;

  try {
    const response = yield call(request, requestUrl);
    yield put(updateExperimentsAction({ ...response, page }));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* experimentsList() {
  yield takeLatest(SET_PAGE, getExperiments);
  yield takeLatest(SET_FILTER_DATE_START, getExperiments);
  yield takeLatest(SET_FILTER_DATE_END, getExperiments);
  yield takeLatest(SET_FILTER_QUERY, getExperiments);
  yield takeLatest(GET_EXPERIMENTS, getExperiments);
}
