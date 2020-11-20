/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  loggedIn: false,
  loginError: false,
  user: {
    username: '',
    email: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case USER_LOGIN_SUCCESS:
        draft.loggedIn = true;
        draft.user = action.user;
        break;

      case USER_LOGIN_ERROR:
        draft.loggedIn = false;
        draft.loginError = action.error;
        draft.user = initialState.user;
        break;

      case USER_LOGOUT:
        console.log("LOGGING OUT!")
        draft.loggedIn = false;
        draft.loginError = false;
        draft.user = initialState.user;
        break;
    }
  });

export default appReducer;
