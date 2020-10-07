import React from 'react';

import { Statistic, Row, Col } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';


export default class RunWidget extends React.Component {
    render() {
        return(
            <div style={{ margin: "0 20px" }}>
                <Row gutter={16}>
                    <Col span={12}>
                    <Statistic title="Name" value={"Run #1"} prefix={<SlidersOutlined />} />
                    </Col>
                    <Col span={12}>
                    <Statistic title="Status" value={"Success"} suffix="/ Finished" />
                    </Col>
                </Row>
            </div>
        )
    }
}