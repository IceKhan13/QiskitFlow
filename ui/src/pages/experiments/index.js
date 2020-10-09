import React from 'react';
import axios from 'axios';
import { Table, Badge, Menu, Dropdown, Space, notification, Row, Col, Divider, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import RunWidget from './run';

const menu = (
  <Menu>
    <Menu.Item>Delete</Menu.Item>
    <Menu.Item>Archive</Menu.Item>
  </Menu>
);



const experimentsColumns = [
  { title: 'Experiment', dataIndex: 'experiment', key: 'experiment' },
  {
    title: 'Run status', dataIndex: 'runs', key: 'runs', render: (runs) => {
      let renderedRuns = runs.map((run, i) => <span key={i}><Badge status="success" /></span>)
      return (<span>{renderedRuns}</span>)
    }
  },
  { title: 'Author', dataIndex: 'author', key: 'author' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Action', key: 'operation', render: () => <a>Share</a> },
];

export default class ExperimentsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      run: false,
      loading: false,
      experiments: [],
      run: false
    }
  }

  componentDidMount() {
    this.getExperiments()
  }

  getExperiments(query = "") {
    axios.get(`http://localhost:8000/experiments/`, {
      params: {
        query: query
      }
    }).then((response) => {
      this.setState({
        ...this.state, experiments: response.data
      })
    }).catch((err) => {
      notification.open({ message: 'Error', description: err.message, style: { backgroundColor: 'red' } });
    });
  }

  expandedRowRender(experiment) {
    let runs = experiment.runs.map((run, i) => {
      return {
        key: i,
        date: run.created_at,
        name: run.uuid,
        operation: run
      }
    })

    const runColumns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Run', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: 'Tags', dataIndex: 'tags', key: 'tags', render: () => <Tag>Qiskit</Tag> },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (run) => (
          <Space size="middle">
            <a onClick={() => {
              this.setState({...this.state, run: run})
            }}>View</a>
            <a>Rerun</a>
          </Space>
        ),
      },
    ];
  
    return <Table 
                columns={runColumns}
                dataSource={runs} 
                pagination={false} />;
  }

  
  render() {
    let experiments = this.state.experiments;
    let data = experiments.map((experiment, i) => {
      return {
        key: i,
        experiment: experiment.name,
        author: 'Admin',
        runs: experiment.runs,
        createdAt: experiment.created_at,
      }
    })

    return (
      <div>
        <Row>
          <Col span={this.state.run ? 12 : 24}>
            <div style={{ margin: "0 20px" }}>
              <Table
                className="components-table-demo-nested"
                columns={experimentsColumns}
                expandable={{ expandedRowRender: this.expandedRowRender.bind(this) }}
                dataSource={data}
              />
            </div>
          </Col>
          <Col span={this.state.run ? 12 : 0}>
            <RunWidget run={this.state.run} />
          </Col>
        </Row>
      </div>
    )
  }
}