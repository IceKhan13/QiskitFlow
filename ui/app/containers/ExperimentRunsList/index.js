/**
 *
 * ExperimentRunsList
 *
 */

import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { Table, Card } from 'antd';
import FilterForm from 'containers/GeneralFilter';
import {
  makeSelectExperimentRunsListResults,
  makeSelectExperimentRunsListLoading,
  makeSelectExperimentRunsListPage,
  makeSelectExperimentRunsListCount,
  makeSelectExperimentRunsListFilter,
} from './selectors';
import {
  getRunsAction,
  setExperimentIdAction,
  setFilterDateEndAction,
  setFilterDateStartAction,
  setFilterQueryAction,
  setPageAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'runs';

export function ExperimentRunsList({
  match,
  page,
  results,
  loading,
  count,
  filter,
  getRuns,
  setFilterDateStart,
  setFilterDateEnd,
  setFilterQuery,
  setPage,
  setExperimentId,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const id = match.params.experimentId;

  const didMount = useRef(true);
  useEffect(() => {
    setExperimentId(id);
    if (didMount.current) getRuns();
    didMount.current = false;
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // eslint-disable-next-line no-shadow
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

  const rows = results.map((run, i) => { return { ...run, key: i }});

  return (
    <div>
      <Helmet>
        <title>Runs for {id}</title>
        <meta name="description" content={`Runs for experiment ${id}`} />
      </Helmet>
      <Card title="Runs list">
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

ExperimentRunsList.propTypes = {
  match: PropTypes.object,
  results: PropTypes.array,
  loading: PropTypes.bool,
  page: PropTypes.number,
  count: PropTypes.number,
  filter: PropTypes.object,
  getRuns: PropTypes.func,
  setFilterDateStart: PropTypes.func,
  setFilterDateEnd: PropTypes.func,
  setFilterQuery: PropTypes.func,
  setPage: PropTypes.func,
  setExperimentId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  results: makeSelectExperimentRunsListResults(),
  loading: makeSelectExperimentRunsListLoading(),
  page: makeSelectExperimentRunsListPage(),
  count: makeSelectExperimentRunsListCount(),
  filter: makeSelectExperimentRunsListFilter(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getRuns: () => dispatch(getRunsAction()),
    setFilterDateStart: dateStart =>
      dispatch(setFilterDateStartAction(dateStart)),
    setFilterDateEnd: dateEnd => dispatch(setFilterDateEndAction(dateEnd)),
    setFilterQuery: query => dispatch(setFilterQueryAction(query)),
    setPage: page => dispatch(setPageAction(page)),
    setExperimentId: experimentId =>
      dispatch(setExperimentIdAction(experimentId)),
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
