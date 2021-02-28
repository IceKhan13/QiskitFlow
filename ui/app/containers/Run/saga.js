import { call, select, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import getBaseUrl from 'utils/urls';

import { repoLoadingError, logoutAction } from 'containers/App/actions';
import { GET_RUN } from './constants';
import { makeSelectRunId } from './selectors';
import { updateRunAction } from './actions';

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

export default function* runSaga() {
  yield takeLatest(GET_RUN, getRun);
}
