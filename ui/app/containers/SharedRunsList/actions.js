/*
 *
 * SharedRunsList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_SHARED_RUNS,
  UPDATE_SHARED_RUNS,
  SET_PAGE,
  SET_FILTER_QUERY,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getRunsAction(page, query = '') {
  return {
    type: GET_SHARED_RUNS,
    page,
    query,
  };
}

export function updateRunsAction({ results, count, page }) {
  return {
    type: UPDATE_SHARED_RUNS,
    count,
    results,
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
