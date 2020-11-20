/*
 *
 * ExperimentsList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_EXPERIMENTS,
  UPDATE_EXPERIMENTS,
  SET_FILTER_DATE_END,
  SET_FILTER_DATE_START,
  SET_FILTER_QUERY,
  SET_PAGE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateExperimentsAction({ items, total, page }) {
  return {
    type: UPDATE_EXPERIMENTS,
    items,
    total,
    page,
  };
}

export function getExperimentsAction() {
  return {
    type: GET_EXPERIMENTS,
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
