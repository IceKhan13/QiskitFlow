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
  loading: false,
  page: 1,
  total: 0,
  items: [], // experiments
};

/* eslint-disable default-case, no-param-reassign */
const experimentsListReducer = (state = initialState, action) =>
  produce(state, () => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_EXPERIMENTS:
        state.loading = true;
        state.page = action.page;
        break;
      case UPDATE_EXPERIMENTS:
        state.items = action.items;
        state.total = action.total;
        state.loading = false;
        break;
    }
  });

export default experimentsListReducer;
