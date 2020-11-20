/*
 *
 * ExperimentRunsList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_RUNS,
  UPDATE_RUNS,
  SET_FILTER_DATE_END,
  SET_FILTER_DATE_START,
  SET_FILTER_QUERY,
  SET_PAGE, SET_EXPERIMENT_ID,
} from './constants';

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

export function updateRunsAction({ items, total, page }) {
  return {
    type: UPDATE_RUNS,
    total,
    items,
    page,
  };
}

export function setPageAction(page) {
  return {
    type: SET_PAGE,
    page,
  };
}

export function setFilterQueryAction(query) {
  return {
    type: SET_FILTER_QUERY,
    query,
  };
}

export function setFilterDateStartAction(dateStart) {
  return {
    type: SET_FILTER_DATE_START,
    dateStart,
  };
}

export function setFilterDateEndAction(dateEnd) {
  return {
    type: SET_FILTER_DATE_END,
    dateEnd,
  };
}

export function setExperimentIdAction(experimentId) {
  return {
    type: SET_EXPERIMENT_ID,
    experimentId,
  };
}
