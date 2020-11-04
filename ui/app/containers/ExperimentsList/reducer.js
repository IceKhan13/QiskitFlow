/*
 *
 * ExperimentsList reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_EXPERIMENTS,
  UPDATE_EXPERIMENTS,
} from './constants';

export const initialState = {
  loading: true,
  page: 1,
  total: 0,
  items: [], // experiments
  filter: {
    query: '',
    startDate: '',
    endDate: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const experimentsListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_EXPERIMENTS:
        draft.loading = true;
        draft.page = action.page;
        break;
      case UPDATE_EXPERIMENTS:
        draft.items = action.items;
        draft.total = action.total;
        draft.loading = false;
        break;
    }
  });

export default experimentsListReducer;
