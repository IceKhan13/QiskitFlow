/**
 *
 * ExperimentsList
 *
 */

import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Table, Card } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import FilterForm from 'containers/GeneralFilter';
import {
  makeSelectExperimentListFilter,
  makeSelectExperimentListResults,
  makeSelectExperimentListLoading,
  makeSelectExperimentListPage,
  makeSelectExperimentListCount,
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

const expandedRowRender = record => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: id => <Link to={`/runs/${id}`}>{`Run [${id}]`}</Link>,
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
      title: '# counts',
      dataIndex: 'counts',
      key: 'counts',
      render: counts => counts.length,
    },
  ];

  const rows = record.runs.map((run, i) => ({ ...run, key: i }));

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={rows}
      pagination={false}
    />
  );
};

const key = 'experiments';

export function ExperimentsList({
  loading,
  page,
  count,
  results,
  filter,
  getExperiments,
  setFilterDateStart,
  setFilterDateEnd,
  setFilterQuery,
  setPage,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const didMount = useRef(true);
  useEffect(() => {
    if (didMount.current) getExperiments(1);
    didMount.current = false;
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
    { title: 'Date', dataIndex: 'created_at', key: 'created_at', render: (date) => <span>{new Date(date).toDateString()}</span>},
  ];

  const rows = results.map((res, i) => ({ ...res, key: i }));

  return (
    <div>
      <Helmet>
        <title>Experiments</title>
        <meta name="description" content="QiskitFlow. Experiments list." />
      </Helmet>
      <Card title="Experiments list">
        <FilterForm
          setFilterDateStart={setFilterDateStart}
          setFilterDateEnd={setFilterDateEnd}
          setFilterQuery={setFilterQuery}
          filter={filter}
        />
      </Card>
      <Table
        loading={loading}
        columns={columns}
        expandable={{ expandedRowRender }}
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

ExperimentsList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number,
  count: PropTypes.number,
  results: PropTypes.array,
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
  count: makeSelectExperimentListCount(),
  results: makeSelectExperimentListResults(),
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
