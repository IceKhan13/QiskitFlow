/**
 *
 * Asynchronously loads the component for SharedRunsList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
