import React from 'react';

import { Statistic, Row, Col, Card, Table, Tag, Collapse } from 'antd';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { SlidersOutlined } from '@ant-design/icons';
const { Panel } = Collapse;


const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
      render: text => <b>{text}</b>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    }
  ];
  
class RunWrapper extends React.Component {
    render() {
        let run = this.props.run;

        let parameters = run.parameters.map((parameter, i) => {
            return(<p key={i}><b>{parameter.name}</b>: {parameter.value}</p>)
        })
        
        let metrics = run.metrics.map((metric, i) => {
            return {
                key: i,
                metric: metric.name,
                value: metric.value
            }
        })

        let measurements = run.measurements.map((meas, i) => {
            console.log(meas)

            let cats = meas.measures.map(m => m.key)
            let values = meas.measures.map(m => m.value)

            const options = {
                chart: { type: 'bar' },
                title: {  text: 'Measurement' },
                xAxis: { categories: cats, title: { text: null } },
                yAxis: {
                    min: 0,
                    title: { text: 'Counts', align: 'high' },
                    labels: {  overflow: 'justify' }
                },
                tooltip: { valueSuffix: '' },
                plotOptions: { bar: { dataLabels: { enabled: true  } }  },
                credits: { enabled: false },
                series: [{
                    name: 'Measurements',
                    data: values,
                    color: "#6929C2"
                }]
            }
            
            return(
                <Card size="small" style={{ marginTop: 10 }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </Card>
            )
        })


        return(
            <div style={{ margin: "0 20px", overflow: "scroll", maxHeight: "70vh" }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Statistic title="Run" value={run.uuid} prefix={<SlidersOutlined />} />                        
                    </Col>
                </Row>

                <Collapse defaultActiveKey={[]} style={{ marginTop: 10 }}>
                    <Panel header="Docker image" key="docker_image">
                        <b>{`docker run qiskitflow:experiment_${run.uuid}`}</b>
                    </Panel>
                    <Panel header="BibTeX" key="bibtex">
                    <p>
                        {`@software{QiskitFlow,
                        author = {Admin},
                        title = {Quantum experiment ${run.uuid}},
                        url = {https://qiskitflow.com/experiments/${run.experiment}},
                        version = {0.20.2},
                        date = {2020-10-08}
                        }`}
                    </p>
                    </Panel>
                    <Panel header="Sourcecode" key="code">
                    <   a>{`experiment${run.experiment}.py`}</a>
                    </Panel>
                </Collapse>

                <Card size="small" title="Parameters" style={{ marginTop: 10 }}>
                    {parameters}
                </Card>

                <Table columns={columns} dataSource={metrics} style={{ marginTop: 10 }}/>
                
                <div>{measurements}</div>
            </div>
        )
    }
}

export default class RunWidget extends React.Component {
    render() {
        console.log(this.props)
        return(
            this.props.run ? <RunWrapper run={this.props.run} /> : <div></div>
        )
    }
}