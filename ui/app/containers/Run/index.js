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
import {
  Row,
  Col,
  Table,
  Divider,
  Card,
  Skeleton,
  Typography,
  Tree,
} from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { InfoCircleOutlined, DownOutlined } from '@ant-design/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRun from './selectors';
import { getRunAction } from './actions';
import reducer from './reducer';
import saga from './saga';

const { Text, Paragraph } = Typography;

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
      <Card key={`measurements_chart_${idx}`} style={{ margin: '20px 0' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Divider />
      </Card>
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
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Information" extra={<InfoCircleOutlined />}>
              <b>Backend</b>: Aer
              <br />
              <b>Qiskit version</b>: 0.23.1
              <br />
              <b>QiskitFlow version</b>: 0.0.1-aplha
              <br />
              <br />
              <b>Execute experiment</b>:{' '}
              <Text code>{`docker run qiskitflow:experiment_${runId}`}</Text>
              <br />
              <br />
              <b>BibTeX</b>:
              <Paragraph copyable>
                {`@software{QiskitFlow,
                        author = {Admin},
                        title = {Quantum experiment ${runId}},
                        url = {http://localhost:3000/runs/${runId}},
                        version = {0.0.0-alpha},
                        date = {2020-10-08}
                        }`}
              </Paragraph>
            </Card>
            <Card title="Parameters" style={{ margin: '20px 0' }}>
              <Table
                key="parameters_table"
                dataSource={run.parameters}
                columns={columns}
                pagination={false}
              />
            </Card>
            <Card title="Metrics" style={{ margin: '20px 0' }}>
              <Table
                key="metrics_table"
                dataSource={run.metrics}
                columns={columns}
                pagination={false}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Experiment description"
              style={{ margin: '0 0 20px 0' }}
            >
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
            <Card title="Files">
              <Tree
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={['0-0-0']}
                treeData={[
                  {
                    title: 'root',
                    key: '0-0',
                    children: [
                      {
                        title: 'utils',
                        key: '0-0-0',
                        children: [
                          {
                            title: 'utils.py',
                            key: '0-0-0-0',
                          },
                          {
                            title: '__init__.py',
                            key: '0-0-0-1',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    title: 'quantum_teleportation.py',
                    key: '0-1',
                  },
                ]}
              />
            </Card>
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
