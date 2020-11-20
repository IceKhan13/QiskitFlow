import { call, select, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  makeSelectExperimentRunsListFilter,
  makeSelectExperimentRunsListPage,
  makeSelectExperimentRunsListExperimentId,
} from './selectors';
import { updateRunsAction } from './actions';

import { repoLoadingError } from '../App/actions';
import {
  GET_RUNS,
  SET_FILTER_DATE_END,
  SET_FILTER_DATE_START,
  SET_FILTER_QUERY,
  SET_PAGE,
} from './constants';

export function* getRuns() {
  const parameters = yield select(makeSelectExperimentRunsListFilter());
  const page = yield select(makeSelectExperimentRunsListPage());
  const experimentId = yield select(makeSelectExperimentRunsListExperimentId());
  console.log(
    `Request for runs ${experimentId} with params ${parameters} for page ${page}`,
  );
  const requestUrl = `https://run.mocky.io/v3/2caa3027-f547-48eb-80ba-91bce13b3763`;

  try {
    const response = yield call(request, requestUrl);
    yield put(updateRunsAction({ ...response, page }));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* runList() {
  yield takeLatest(SET_PAGE, getRuns);
  yield takeLatest(SET_FILTER_DATE_START, getRuns);
  yield takeLatest(SET_FILTER_DATE_END, getRuns);
  yield takeLatest(SET_FILTER_QUERY, getRuns);
  yield takeLatest(GET_RUNS, getRuns);
}
