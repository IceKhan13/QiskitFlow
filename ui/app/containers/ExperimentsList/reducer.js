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
  SET_FILTER_DATE_END,
  SET_FILTER_DATE_START,
  SET_FILTER_QUERY,
  SET_PAGE,
} from './constants';

export const initialState = {
  loading: true,
  page: 1,
  count: 0,
  results: [], // experiments
  filter: {
    query: '',
    dateStart: false,
    dateEnd: false,
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
        break;
      case UPDATE_EXPERIMENTS:
        draft.results = action.results;
        draft.count = action.count;
        draft.page = action.page;
        draft.loading = false;
        break;
      case SET_PAGE:
        draft.page = action.page;
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

export default experimentsListReducer;
