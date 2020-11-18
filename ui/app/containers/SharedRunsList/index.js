/**
 *
 * SharedRunsList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Tag, Space, Button } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import makeSelectSharedRunsList from './selectors';
import reducer from './reducer';
import saga from './saga';

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
    key: 'author'
  },
];

export function SharedRunsList() {
  useInjectReducer({ key: 'sharedRunsList', reducer });
  useInjectSaga({ key: 'sharedRunsList', saga });

  const data = [...new Array(20).keys()].map(idx => {
    return {
      key: idx,
      uuid: idx,
      author: 'Admin',
      metrics: [
        {
          name: 'runtime',
          value: idx,
        },
      ],
      parameters: [
        {
          name: `parameter ${idx}`,
          value: `value ${idx}`,
        },
      ],
      measurements: [],
    };
  });

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

SharedRunsList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sharedRunsList: makeSelectSharedRunsList(),
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
)(SharedRunsList);
