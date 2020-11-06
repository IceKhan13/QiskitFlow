/*
 *
 * Run reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_RUN, UPDATE_RUN } from './constants';

export const initialState = {
  loading: true,
  runId: false,
  experiment: {
    name: '',
    runs: [],
    id: '',
  },
  metrics: [],
  parameters: [],
  measurements: [],
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
        draft.measurements = action.measurements;
        break;
    }
  });

export default runReducer;
