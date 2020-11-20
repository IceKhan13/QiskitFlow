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
} from './constants';

export const initialState = {
  loading: true,
  page: 1,
  total: 0,
  items: [],
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
        draft.total = action.total;
        draft.items = action.items;
        draft.page = action.page;
        break;
      case SET_FILTER_QUERY:
        draft.filter = { ...state.filter, query: action.query };
        break;
    }
  });

export default sharedRunsListReducer;
