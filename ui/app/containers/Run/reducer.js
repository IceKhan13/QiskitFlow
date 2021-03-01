/*
 *
 * Run reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_RUN, UPDATE_RUN } from './constants';

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
      case UPDATE_RUN:
        draft.metrics = action.metrics;
        draft.parameters = action.parameters;
        draft.counts = action.counts;
        draft.version = action.version;
        break;
    }
  });

export default runReducer;
