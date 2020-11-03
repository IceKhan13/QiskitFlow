/*
 *
 * ExperimentsList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_EXPERIMENTS,
  UPDATE_EXPERIMENTS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateExperimentsAction(response) {
  return {
    type: UPDATE_EXPERIMENTS,
    items: response.items,
    total: response.total,
  };
}

export function getExperimentsAction(page) {
  return {
    type: GET_EXPERIMENTS,
    page
  };
}
