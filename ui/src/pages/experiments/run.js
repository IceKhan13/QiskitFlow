import React from 'react';

import { Statistic, Row, Col, Card, Table, Tag, Space } from 'antd';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { SlidersOutlined } from '@ant-design/icons';


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
  
  const data = [
    {
      key: '1',
      metric: 'John Brown',
      value: 32
    },
    {
      key: '2',
      metric: 'Jim Green',
      value: 42
    },
    {
      key: '3',
      metric: 'Joe Black',
      value: 32
    },
  ];

  const options = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Measurement'
    },
    xAxis: {
        categories: ['0000', '0001', '0010', '0011'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Probability',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Measurement probability',
        data: [76, 2, 20, 2]
    }]
}

export default class RunWidget extends React.Component {
    render() {
        return(
            <div style={{ margin: "0 20px", overflow: "scroll", maxHeight: "70vh" }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Name" value={"Run #1"} prefix={<SlidersOutlined />} />                        
                    </Col>
                    <Col span={12}>
                        <Statistic title="Status" value={"Success"} suffix="/ Finished" />
                    </Col>
                </Row>

                <Card size="small" title="Parameters" style={{ marginTop: 10 }}>
                    <p><b>Alpha</b>: 0.9</p>
                    <p><b>Backend</b>: Almaden</p>
                    <p><b>Alpha</b>: 0.9</p>
                    <p><b>Backend</b>: Almaden</p>
                    <p><b>Alpha</b>: 0.9</p>
                    <p><b>Backend</b>: Almaden</p>
                    <p><b>Alpha</b>: 0.9</p>
                    <p><b>Backend</b>: Almaden</p>
                </Card>

                <Table columns={columns} dataSource={data} style={{ marginTop: 10 }}/>

                <Table columns={columns} dataSource={data} style={{ marginTop: 10 }}/>
                
                <Card size="small" style={{ marginTop: 10 }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </Card>

                <Card size="small" style={{ marginTop: 10 }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </Card>

                <Card size="small" style={{ marginTop: 10 }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </Card>
            </div>
        )
    }
}