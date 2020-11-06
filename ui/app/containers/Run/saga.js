import { call, select, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { repoLoadingError } from 'containers/App/actions';
import { GET_RUN } from './constants';
import { makeSelectRunId } from './selectors';
import { updateRunAction } from './actions';

export function* getRun() {
  const runId = yield select(makeSelectRunId());
  console.log(`Request for run [${runId}]`);
  const requestUrl =
    'https://run.mocky.io/v3/118dfb56-ff18-47c4-85a6-c4ad1d475bbf';

  try {
    const response = yield call(request, requestUrl);
    yield put(updateRunAction(response));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* runSaga() {
  yield takeLatest(GET_RUN, getRun);
}
