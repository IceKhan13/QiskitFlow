/**
 *
 * Run
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRun from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Run() {
  useInjectReducer({ key: 'run', reducer });
  useInjectSaga({ key: 'run', saga });

  return (
    <div>
      <Helmet>
        <title>Run</title>
        <meta name="description" content="Description of Run" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Run.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  run: makeSelectRun(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Run);
