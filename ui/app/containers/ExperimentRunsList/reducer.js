/*
 *
 * ExperimentRunsList reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_RUNS,
  UPDATE_RUNS,
  SET_FILTER_DATE_END,
  SET_FILTER_DATE_START,
  SET_FILTER_QUERY,
  SET_EXPERIMENT_ID,
} from './constants';

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
        break;
      case UPDATE_RUNS:
        draft.loading = false;
        draft.total = action.total;
        draft.items = action.items;
        draft.page = action.page;
        break;
      case SET_EXPERIMENT_ID:
        draft.experimentId = action.experimentId;
        break;
      case SET_FILTER_QUERY:
        draft.filter = { ...state.filter, query: action.query };
        break;
      case SET_FILTER_DATE_START:
        draft.filter = { ...state.filter, dateStart: action.dateStart };
        break;
      case SET_FILTER_DATE_END:
        draft.filter = { ...state.filter, dateEnd: action.dateEnd };
        break;
    }
  });

export default experimentRunsListReducer;
