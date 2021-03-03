/*
 *
 * Run actions
 *
 */

import { DEFAULT_ACTION, GET_RUN, UPDATE_RUN, RUN_SET_PUBLIC, RUN_UPDATE_PUBLIC } from './constants';

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

export function setPublic(isPublic) {
  console.log(isPublic)

  return {
    type: RUN_SET_PUBLIC,
    is_public: isPublic,
  };
}

export function updatePublic(isPublic) {
  return {
    type: RUN_UPDATE_PUBLIC,
    is_public: isPublic,
  };
}

export function updateRunAction({
  metrics,
  parameters,
  counts,
  version,
  // eslint-disable-next-line camelcase
  state_vectors,
  description,
  // eslint-disable-next-line camelcase
  is_public,
}) {
  return {
    type: UPDATE_RUN,
    metrics,
    parameters,
    counts,
    version,
    state_vectors,
    description,
    is_public,
  };
}
