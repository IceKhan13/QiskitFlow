/**
 *
 * SharedRunsList
 *
 */

import React, {memo, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import {
  makeSelectSharedRunsPage,
  makeSelectSharedRunsLoading,
  makeSelectSharedRunsCount,
  makeSelectSharedRunsResults,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getRunsAction, setPageAction } from './actions';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: runId => <Link to={`/runs/${runId}`}>{`Run [${runId}]`}</Link>,
  },
  {
    title: 'Metrics',
    dataIndex: 'metrics',
    key: 'metrics',
    render: metrics => {
      const metricsList = metrics.map((m, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`metric_${m.name}_${i}`}>{`${m.name}: ${m.value}`}</div>
      ));
      return <span>{metricsList}</span>;
    },
  },
  {
    title: 'Parameters',
    dataIndex: 'parameters',
    key: 'parameters',
    render: parameters => {
      const parametersList = parameters.map((p, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`param_${p.name}_${i}`}>{`${p.name}: ${p.value}`}</div>
      ));
      return <span>{parametersList}</span>;
    },
  },
];

export function SharedRunsList({
  getRuns,
  results,
  count,
  page,
  loading,
  setPage,
}) {
  useInjectReducer({ key: 'sharedRunsList', reducer });
  useInjectSaga({ key: 'sharedRunsList', saga });
  const didMount = useRef(true);
  useEffect(() => {
    if (didMount.current) getRuns();
    didMount.current = false;
  });

  const rows = results.map((run, i) => { return { ...run, key: i}});

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={rows}
        pagination={{
          onChange: p => setPage(p),
          current: page,
          total: count,
        }}
      />
    </div>
  );
}

SharedRunsList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  getRuns: PropTypes.func,
  results: PropTypes.array,
  count: PropTypes.number,
  page: PropTypes.number,
  loading: PropTypes.bool,
  setPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  results: makeSelectSharedRunsResults(),
  count: makeSelectSharedRunsCount(),
  page: makeSelectSharedRunsPage(),
  loading: makeSelectSharedRunsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getRuns: () => dispatch(getRunsAction()),
    setPage: page => dispatch(setPageAction(page)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SharedRunsList);
