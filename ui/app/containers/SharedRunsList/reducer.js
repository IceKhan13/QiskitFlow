/*
 *
 * SharedRunsList reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  UPDATE_SHARED_RUNS,
  SET_FILTER_QUERY,
  SET_PAGE,
} from './constants';

export const initialState = {
  loading: true,
  page: 1,
  count: 0,
  results: [],
  filter: {
    query: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const sharedRunsListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case UPDATE_SHARED_RUNS:
        draft.loading = false;
        draft.count = action.count;
        draft.results = action.results;
        draft.page = action.page;
        break;
      case SET_PAGE:
        draft.page = action.page;
        break;
      case SET_FILTER_QUERY:
        draft.filter = { ...state.filter, query: action.query };
        break;
    }
  });

export default sharedRunsListReducer;
