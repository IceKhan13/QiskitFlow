/**
 *
 * ExperimentsList
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
import makeSelectExperimentsList from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ExperimentsList() {
  useInjectReducer({ key: 'experimentsList', reducer });
  useInjectSaga({ key: 'experimentsList', saga });

  return (
    <div>
      <Helmet>
        <title>ExperimentsList</title>
        <meta name="description" content="Description of ExperimentsList" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ExperimentsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  experimentsList: makeSelectExperimentsList(),
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
)(ExperimentsList);
