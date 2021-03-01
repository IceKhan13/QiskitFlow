import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import getBaseUrl from 'utils/urls';
import { GET_SHARED_RUNS, SET_PAGE, SET_FILTER_QUERY } from './constants';
import { makeSelectSharedRunsPage, makeSelectSharedFilter } from './selectors';
import { updateRunsAction } from './actions';
import { repoLoadingError, logoutAction } from '../App/actions';

export function* getRuns() {
  const page = yield select(makeSelectSharedRunsPage());
  const filter = yield select(makeSelectSharedFilter());
  const offset = 10 * (page - 1);
  const limit = 10;
  const requestUrl = `${getBaseUrl()}/api/v1/core/runs/public/?offset=${offset}&limit=${limit}`;

  try {
    const response = yield call(request, requestUrl);
    yield put(updateRunsAction({ ...response, page }));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(logoutAction());
    } else {
      yield put(repoLoadingError(err));
    }
  }
}

export default function* sharedRunsListSaga() {
  yield takeLatest(SET_PAGE, getRuns);
  yield takeLatest(SET_FILTER_QUERY, getRuns);
  yield takeLatest(GET_SHARED_RUNS, getRuns);
}
