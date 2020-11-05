/*
 *
 * ExperimentRunsList actions
 *
 */

import { DEFAULT_ACTION, GET_RUNS, UPDATE_RUNS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getRunsAction(
  page,
  query = '',
  dateStart = false,
  dateEnd = false,
) {
  return {
    type: GET_RUNS,
    page,
    query,
    dateStart,
    dateEnd,
  };
}

export function updateRunsAction(items, total) {
  return {
    type: UPDATE_RUNS,
    total,
    items,
  };
}
