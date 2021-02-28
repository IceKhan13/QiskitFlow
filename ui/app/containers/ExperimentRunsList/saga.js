import { call, select, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import getBaseUrl from 'utils/urls';
import {
  makeSelectExperimentRunsListFilter,
  makeSelectExperimentRunsListPage,
  makeSelectExperimentRunsListExperimentId,
} from './selectors';
import { updateRunsAction } from './actions';

import {logoutAction, repoLoadingError} from '../App/actions';
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
  const offset = 10 * (page - 1);
  const limit = 10;
  const requestUrl = `${getBaseUrl()}/api/v1/core/runs/?experiment=${experimentId}&offset=${offset}&limit=${limit}`;
  const token = localStorage.getItem('token');

  try {
    const response = yield call(request, requestUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(updateRunsAction({ ...response, page }));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(logoutAction());
    } else {
      yield put(repoLoadingError(err));
    }
  }
}

export default function* runList() {
  yield takeLatest(SET_PAGE, getRuns);
  yield takeLatest(SET_FILTER_DATE_START, getRuns);
  yield takeLatest(SET_FILTER_DATE_END, getRuns);
  yield takeLatest(SET_FILTER_QUERY, getRuns);
  yield takeLatest(GET_RUNS, getRuns);
}
