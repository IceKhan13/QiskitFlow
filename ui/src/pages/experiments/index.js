import React from 'react';
import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import { Row, Col, Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import RunWidget from './run';

const menu = (
  <Menu>
    <Menu.Item>Delete</Menu.Item>
    <Menu.Item>Archive</Menu.Item>
  </Menu>
);

function NestedTable() {
  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
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
      { title: 'Tags', dataIndex: 'tags', key: 'tags' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Rerun</a>
            <a>Share</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: `Quantum experiment run #${i + 1}`,
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: 'Experiment', dataIndex: 'experiment', key: 'experiment' },
    { title: 'Run status', dataIndex: 'runs', key: 'runs', render: (runs) => {
        let renderedRuns = runs.map(run => <span><Badge status="success" /></span>)
        return(<span>{renderedRuns}</span>)
    }},
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Share</a> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      experiment: `Quantum experiment #${i + 1}`,
      author: 'Admin',
      runs: [
          { name: "run #1", status: "finished" },
          { name: "run #2", status: "finished" },
          { name: "run #3", status: "finished" }
      ],
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={data}
    />
  );
}

export default class ExperimentsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            run: false
        }
    }

    render() {
        return(
            <div>
                <Row>
                    <Col flex={1}>
                        <div style={{ margin: "0 20px" }}>
                            <NestedTable />
                        </div>
                    </Col>
                    <Col flex={4}>
                        <RunWidget />
                    </Col>
                </Row>  
            </div>
        )
    }
}