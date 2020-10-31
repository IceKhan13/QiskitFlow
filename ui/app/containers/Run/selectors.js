import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the run state domain
 */

const selectRunDomain = state => state.run || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Run
 */

const makeSelectRun = () =>
  createSelector(
    selectRunDomain,
    substate => substate,
  );

export default makeSelectRun;
export { selectRunDomain };
