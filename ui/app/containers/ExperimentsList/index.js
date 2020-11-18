/**
 *
 * ExperimentsList
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Table, Button, Tag, Pagination, Card, Skeleton } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import FilterForm from 'containers/GeneralFilter';
import {
  makeSelectExperimentListFilter,
  makeSelectExperimentListItems,
  makeSelectExperimentListLoading,
  makeSelectExperimentListPage,
  makeSelectExperimentListTotal,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getExperimentsAction,
  setFilterDateEndAction,
  setFilterDateStartAction,
  setFilterQueryAction,
  setPageAction,
} from './actions';
import Login from '../Login';

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
    <Table
      size="small"
      columns={columns}
      dataSource={record.runs}
      pagination={false}
    />
  );
};

const key = 'experiments';

export function ExperimentsList({
  loading,
  page,
  total,
  items,
  filter,
  getExperiments,
  setFilterDateStart,
  setFilterDateEnd,
  setFilterQuery,
  setPage,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (items.length === 0) getExperiments(1);
  });

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
    { title: 'Date', dataIndex: 'created_at', key: 'created_at' },
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
      <Card title="Experiments list">
        <Skeleton avatar paragraph={{ rows: 2 }} />
      </Card>
      <FilterForm
        setFilterDateStart={setFilterDateStart}
        setFilterDateEnd={setFilterDateEnd}
        setFilterQuery={setFilterQuery}
        filter={filter}
      />
      <Table
        loading={loading}
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={items}
        pagination={
          <Pagination
            onChange={p => setPage(p)}
            defaultCurrent={1}
            current={page}
            total={total}
          />
        }
      />
    </div>
  );
}

ExperimentsList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number,
  total: PropTypes.number,
  items: PropTypes.array,
  filter: PropTypes.object,
  getExperiments: PropTypes.func,
  setFilterDateStart: PropTypes.func,
  setFilterDateEnd: PropTypes.func,
  setFilterQuery: PropTypes.func,
  setPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectExperimentListLoading(),
  page: makeSelectExperimentListPage(),
  total: makeSelectExperimentListTotal(),
  items: makeSelectExperimentListItems(),
  filter: makeSelectExperimentListFilter(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getExperiments: () => dispatch(getExperimentsAction()),
    setFilterDateStart: dateStart =>
      dispatch(setFilterDateStartAction(dateStart)),
    setFilterDateEnd: dateEnd => dispatch(setFilterDateEndAction(dateEnd)),
    setFilterQuery: query => dispatch(setFilterQueryAction(query)),
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
)(ExperimentsList);
