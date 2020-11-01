/**
 *
 * ExperimentsList
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Table, Button, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import makeSelectExperimentsList from './selectors';
import reducer from './reducer';
import saga from './saga';

const expandedRowRender = record => {
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
      title: 'Actions',
      key: 'actions',
      render: () => (
        <span>
          <Button danger size="small" type="text" icon={<DeleteOutlined />}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={record.runs} pagination={false} />
  );
};

const data = [...Array(20).keys()].map(idx => ({
    key: idx,
    id: idx,
    createdAt: '2014-12-24 23:12:00',
    name: 'This is production name',
    tags: ['Qiskit', 'Teleportation'],
    version: '0.0.1',
    author: 'Admin',
    n_runs: 10,
    runs: [
      {
        uuid: '123123123asdasdasd',
        name: 'Name',
        metrics: [
          {
            name: 'runtime',
            value: 10000,
          },
          {
            name: 'somename',
            value: 100,
          },
        ],
        parameters: [
          {
            name: 'backend',
            value: 'Tashkent',
          },
        ],
        measurements: [],
        entrypoint: null,
      },
      {
        uuid: '123123123asdasdasd123',
        name: 'Name',
        metrics: [
          {
            name: 'runtime',
            value: 10000,
          },
          {
            name: 'somename',
            value: 100,
          },
        ],
        parameters: [
          {
            name: 'backend',
            value: 'Tashkent',
          },
        ],
        measurements: [],
        entrypoint: null,
      },
    ],
  }));

export function ExperimentsList() {
  useInjectReducer({ key: 'experimentsList', reducer });
  useInjectSaga({ key: 'experimentsList', saga });

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [experiments, setExperiments] = useState(data);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, row) => <Link to={`/experiments/${row.id}`}>{name}</Link>,
    },
    {
      title: '# of runs',
      dataIndex: 'runs',
      key: 'runs',
      render: runs => runs.length,
    },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Tags',
      key: 'tags',
      render: row => {
        const tagsList = row.tags.map((tag, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tag key={`tags_${tag}_${i}`}>{tag}</Tag>
        ));
        return <div>{tagsList}</div>;
      },
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Experiments</title>
        <meta name="description" content="QiskitFlow. Experiments list." />
      </Helmet>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={experiments}
      />
    </div>
  );
}

ExperimentsList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
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
