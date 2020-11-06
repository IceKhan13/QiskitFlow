/*
 *
 * Run actions
 *
 */

import { DEFAULT_ACTION, GET_RUN, UPDATE_RUN } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getRunAction(runId) {
  return {
    type: GET_RUN,
    runId,
  };
}

export function updateRunAction({ metrics, parameters, measurements }) {
  return {
    type: UPDATE_RUN,
    metrics,
    parameters,
    measurements,
  };
}
