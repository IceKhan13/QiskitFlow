/**
 *
 * ExperimentRunsList
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
import FilterForm from 'containers/GeneralFilter';
import {
  makeSelectExperimentRunsListItems,
  makeSelectExperimentRunsListLoading,
  makeSelectExperimentRunsListPage,
  makeSelectExperimentRunsListTotal,
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
  items,
  loading,
  total,
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

  useEffect(() => {
    setExperimentId(id);
    if (items.length === 0) getRuns();
  });

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
    <div>
      <Helmet>
        <title>Runs for {id}</title>
        <meta name="description" content={`Runs for experiment ${id}`} />
      </Helmet>
      <FilterForm
        setFilterDateStart={setFilterDateStart}
        setFilterDateEnd={setFilterDateEnd}
        setFilterQuery={setFilterQuery}
        filter={filter}
      />
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

ExperimentRunsList.propTypes = {
  match: PropTypes.object,
  items: PropTypes.array,
  loading: PropTypes.bool,
  page: PropTypes.number,
  total: PropTypes.number,
  filter: PropTypes.object,
  getRuns: PropTypes.func,
  setFilterDateStart: PropTypes.func,
  setFilterDateEnd: PropTypes.func,
  setFilterQuery: PropTypes.func,
  setPage: PropTypes.func,
  setExperimentId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectExperimentRunsListItems(),
  loading: makeSelectExperimentRunsListLoading(),
  page: makeSelectExperimentRunsListPage(),
  total: makeSelectExperimentRunsListTotal(),
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
