import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { updateExperimentsAction } from './actions';

import { repoLoadingError } from '../App/actions';
import { GET_EXPERIMENTS } from './constants';

export function* getExperiments({ page }) {
  // eslint-disable-next-line no-console
  console.log(`Request for experiments page ${page}`);
  const requestUrl = `https://run.mocky.io/v3/c21c6c4f-1164-46a6-849c-720b84b3cce0`;

  try {
    const response = yield call(request, requestUrl);
    yield put(updateExperimentsAction(response));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* experimentsData() {
  yield takeLatest(GET_EXPERIMENTS, getExperiments);
}
