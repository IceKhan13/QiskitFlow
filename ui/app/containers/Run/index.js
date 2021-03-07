/**
 *
 * Run
 *
 */

import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Table, Divider, Card, Typography, Tree, List, Switch } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DownOutlined } from '@ant-design/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRun from './selectors';
import { getRunAction, setPublic } from './actions';
import reducer from './reducer';
import saga from './saga';

const { Text, Paragraph } = Typography;

const columns = [
  {
    title: 'Metric',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];

export function Run({ run, match, getRun, setPublic }) {
  useInjectReducer({ key: 'run', reducer });
  useInjectSaga({ key: 'run', saga });

  const runId = match.params.id;
  const didMount = useRef(true);
  useEffect(() => {
    if (didMount.current) getRun(runId);
    didMount.current = false;
  });

  const counts = run.counts.map((cnt, idx) => {
    const cats = cnt.entries.map(m => m.key);
    const values = cnt.entries.map(m => m.value);
    const options = {
      chart: { type: 'column' },
      title: { text: `Count [${cnt.name}]` },
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
          name: cnt.name,
          data: values,
          color: '#6929C2',
        },
      ],
    };

    return (
      // eslint-disable-next-line react/no-array-index-key
      <Card key={`counts_chart_${idx}`} style={{ margin: '20px 0' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Divider />
      </Card>
    );
  });

  const parameters = run.parameters.map((param, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={`parameter_${param.name}_${param.value}_${i}`}>
      <b>{param.name}</b>: {param.value}
      <br />
    </div>
  ));

  const description = run.description ? (
    <p>{run.description}</p>
  ) : (
    <p>No description provided...</p>
  );

  const metrics = run.metrics.map((metric, i) => ({ ...metric, key: i }));

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
            <Card
              title="Information & parameters"
              extra={
                <Switch
                  checkedChildren="public"
                  unCheckedChildren="private"
                  checked={run.is_public}
                  onClick={setPublic}
                />
              }
            >
              <b>QiskitFlow version</b>: {run.version}
              <br />
              <br />
              {parameters}
              <br />
              <b>Execute experiment</b>: <Text code>...</Text>
              <br />
              <br />
              <b>BibTeX</b>:
              <Paragraph copyable>
                {`...`}
              </Paragraph>
            </Card>
            <br />
            <Table
              key="metrics_table"
              dataSource={metrics}
              columns={columns}
              pagination={false}
            />
            <br />
            <Card title="State vectors">
              <List
                size="small"
                dataSource={run.state_vectors}
                renderItem={sv => {
                  const vector = sv.vector
                    .map(c => `${c.real}+j${c.img} `)
                    .concat();

                  return (
                    <List.Item>
                      <b>{sv.name}</b>: {vector}
                    </List.Item>
                  );
                }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Experiment description"
              style={{ margin: '0 0 20px 0' }}
            >
              {description}
            </Card>
            <Card title="Files">
              <Tree
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={['0-0-0']}
                treeData={[
                  {
                    title: 'run.json',
                    key: '0-0',
                  },
                ]}
              />
            </Card>
            {counts}
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
  setPublic: PropTypes.func,
  run: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  run: makeSelectRun(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getRun: runId => dispatch(getRunAction(runId)),
    setPublic: flag => dispatch(setPublic(flag)),
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
