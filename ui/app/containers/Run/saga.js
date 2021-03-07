import { call, select, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import getBaseUrl from 'utils/urls';

import { repoLoadingError, logoutAction } from 'containers/App/actions';
import { GET_RUN, RUN_SET_PUBLIC } from './constants';
import { makeSelectRunId, makeSelectIsPublic } from './selectors';
import { updateRunAction, updatePublic } from './actions';

export function* getRun() {
  const runId = yield select(makeSelectRunId());
  const requestUrl = `${getBaseUrl()}/api/v1/core/runs/${runId}/`;
  const token = localStorage.getItem('token');

  try {
    const response = yield call(request, requestUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(updateRunAction(response));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(logoutAction());
    } else {
      yield put(repoLoadingError(err));
    }
  }
}

export function* setPublic() {
  const runId = yield select(makeSelectRunId());
  const requestUrl = `${getBaseUrl()}/api/v1/core/runs/${runId}/set_public/`;
  const token = localStorage.getItem('token');
  const isPublic = yield select(makeSelectIsPublic());

  try {
    const response = yield call(request, requestUrl, {
      method: 'POST',
      body: JSON.stringify({
        public: isPublic,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    yield put(updatePublic(isPublic));
  } catch (err) {
    yield put(updatePublic(!isPublic));
  }
}

export default function* runSaga() {
  yield takeLatest(GET_RUN, getRun);
  yield takeLatest(RUN_SET_PUBLIC, setPublic);
}
