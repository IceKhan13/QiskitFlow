/*
 *
 * ExperimentRunsList reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_RUNS, UPDATE_RUNS } from './constants';

export const initialState = {
  loading: true,
  experimentId: '',
  page: 1,
  total: 0,
  items: [],
  filter: {
    query: '',
    dateStart: false,
    dateEnd: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const experimentRunsListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_RUNS:
        draft.loading = true;
        draft.page = action.page;
        break;
      case UPDATE_RUNS:
        draft.loading = false;
        draft.total = action.total;
        draft.items = action.items;
        break;
    }
  });

export default experimentRunsListReducer;
