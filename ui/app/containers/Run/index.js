/**
 *
 * Run
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Table, Divider } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRun from './selectors';
import { getRunAction } from './actions';
import reducer from './reducer';
import saga from './saga';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];

export function Run({ run, match, getRun }) {
  useInjectReducer({ key: 'run', reducer });
  useInjectSaga({ key: 'run', saga });

  const runId = match.params.id;

  useEffect(() => {
    if (!run.runId) getRun(runId);
  });

  const measurements = run.measurements.map((meas, idx) => {
    const cats = meas.measures.map(m => m.key);
    const values = meas.measures.map(m => m.value);
    const options = {
      chart: { type: 'column' },
      title: { text: `Measurement [${meas.name}]` },
      xAxis: { categories: cats, title: { text: null } },
      yAxis: {
        min: 0,
        title: { text: 'Value', align: 'middle' },
        labels: { overflow: 'justify' },
      },
      tooltip: { valueSuffix: '' },
      plotOptions: { bar: { dataLabels: { enabled: true } } },
      credits: { enabled: false },
      series: [
        {
          name: meas.name,
          data: values,
          color: '#6929C2',
        },
      ],
    };

    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`measurements_chart_${idx}`}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Divider />
      </div>
    );
  });

  return (
    <div>
      <Helmet>
        <title>Run</title>
        <meta name="description" content="Description of Run" />
      </Helmet>
      <div>
        <h1>{`Run [${runId}]`}</h1>
        <Divider />
        <Row gutter={[30, 16]}>
          <Col span={12}>
            <h2>Parameters</h2>
            <Table
              key="parameters_table"
              dataSource={run.parameters}
              columns={columns}
              pagination={false}
            />
            <Divider />
            <h2>Metrics</h2>
            <Table
              key="metrics_table"
              dataSource={run.metrics}
              columns={columns}
              pagination={false}
            />
          </Col>
          <Col span={12}>
            <h2>Measurements</h2>
            {measurements}
          </Col>
        </Row>
      </div>
    </div>
  );
}

Run.propTypes = {
  match: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  getRun: PropTypes.func,
  run: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  run: makeSelectRun(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getRun: runId => dispatch(getRunAction(runId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Run);
