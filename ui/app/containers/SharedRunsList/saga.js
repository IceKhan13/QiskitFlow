import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_SHARED_RUNS, SET_PAGE, SET_FILTER_QUERY } from './constants';
import { makeSelectSharedRunsPage, makeSelectSharedFilder } from './selectors';
import { updateRunsAction } from './actions';
import { repoLoadingError } from '../App/actions';

export function* getRuns() {
  const page = yield select(makeSelectSharedRunsPage());
  const filter = yield select(makeSelectSharedFilder());
  const requestUrl = `https://run.mocky.io/v3/2caa3027-f547-48eb-80ba-91bce13b3763`;

  try {
    const response = yield call(request, requestUrl);
    yield put(updateRunsAction({ ...response, page }));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* sharedRunsListSaga() {
  yield takeLatest(SET_PAGE, getRuns);
  yield takeLatest(SET_FILTER_QUERY, getRuns);
  yield takeLatest(GET_SHARED_RUNS, getRuns);
}
