/**
 *
 * ExperimentRunsList
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
import makeSelectExperimentRunsList from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ExperimentRunsList() {
  useInjectReducer({ key: 'experimentRunsList', reducer });
  useInjectSaga({ key: 'experimentRunsList', saga });

  return (
    <div>
      <Helmet>
        <title>ExperimentRunsList</title>
        <meta name="description" content="Description of ExperimentRunsList" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ExperimentRunsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  experimentRunsList: makeSelectExperimentRunsList(),
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
)(ExperimentRunsList);
