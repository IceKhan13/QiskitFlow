/**
 *
 * SharedRunsList
 *
 */

import React, { memo, useEffect } from 'react';
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
  makeSelectSharedRunsTotal,
  makeSelectSharedRunsItems,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getRunsAction } from './actions';

const columns = [
  {
    title: 'Run id',
    dataIndex: 'uuid',
    key: 'uuid',
    render: uuid => <Link to={`/runs/${uuid}`}>{`Run [${uuid}]`}</Link>,
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
  {
    title: '# measurements',
    dataIndex: 'measurements',
    key: 'measurements',
    render: measurements => measurements.length,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
];

export function SharedRunsList({
  getRuns,
  items,
  total,
  page,
  loading,
  setPage,
}) {
  useInjectReducer({ key: 'sharedRunsList', reducer });
  useInjectSaga({ key: 'sharedRunsList', saga });

  useEffect(() => {
    if (items.length === 0) getRuns();
  });

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={items}
        onChange={p => setPage(p)}
        defaultCurrent={1}
        current={page}
        total={total}
      />
    </div>
  );
}

SharedRunsList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  getRuns: PropTypes.func,
  items: PropTypes.array,
  total: PropTypes.number,
  page: PropTypes.number,
  loading: PropTypes.bool,
  setPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectSharedRunsItems(),
  total: makeSelectSharedRunsTotal(),
  page: makeSelectSharedRunsPage(),
  loading: makeSelectSharedRunsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getRuns: () => dispatch(getRunsAction()),
    setPage: page => dispatch(getRunsAction(page)),
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
