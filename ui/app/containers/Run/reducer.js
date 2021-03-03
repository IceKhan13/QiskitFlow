/*
 *
 * Run reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_RUN,
  UPDATE_RUN,
  RUN_UPDATE_PUBLIC,
  RUN_SET_PUBLIC,
} from './constants';

export const initialState = {
  loading: true,
  id: false,
  runId: false,
  experiment: {
    name: '',
    runs: [],
    id: '',
  },
  metrics: [],
  parameters: [],
  counts: [],
  description: '...',
  is_public: false,
  state_vectors: [],
  version: 'NA',
};

/* eslint-disable default-case, no-param-reassign */
const runReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_RUN:
        draft.loading = true;
        draft.runId = action.runId;
        break;
      case RUN_UPDATE_PUBLIC:
        draft.is_public = action.is_public;
        break;
      case RUN_SET_PUBLIC:
        draft.is_public = action.is_public;
        break;
      case UPDATE_RUN:
        draft.metrics = action.metrics;
        draft.parameters = action.parameters;
        draft.counts = action.counts;
        draft.state_vectors = action.state_vectors;
        draft.description = action.description;
        draft.version = action.version;
        draft.is_public = action.is_public;
        break;
    }
  });

export default runReducer;
