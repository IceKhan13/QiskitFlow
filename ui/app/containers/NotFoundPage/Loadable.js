/**
 * Asynchronously loads the component for NotFoundPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import { Spin } from 'antd';

export default loadable(() => import('./index'), {
  fallback: <Spin />,
});
