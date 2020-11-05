/**
 *
 * ExperimentRunsList
 *
 */

import React, { memo } from 'react';
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
import {
  makeSelectExperimentRunsListItems,
  makeSelectExperimentRunsListLoading,
  makeSelectExperimentRunsListPage,
  makeSelectExperimentRunsListTotal,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'runs';

export function ExperimentRunsList({
  match,
  page,
  items,
  loading,
  total,
  getRuns,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const id = match.params.experimentId;

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
      <Table
        loading={loading}
        columns={columns}
        dataSource={items}
        onChange={p => getRuns(p)}
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
  getRuns: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectExperimentRunsListItems(),
  loading: makeSelectExperimentRunsListLoading(),
  page: makeSelectExperimentRunsListPage(),
  total: makeSelectExperimentRunsListTotal(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getRuns: (page, query, dateStart, dateEnd) =>
      console.log(page, query, dateStart, dateEnd),
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
