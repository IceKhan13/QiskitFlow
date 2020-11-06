/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ExperimentsList from '../ExperimentsList/Loadable';
import ExperimentRunsList from '../ExperimentRunsList/Loadable';
import Run from '../Run/Loadable';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const logoStyle = {
  height: '32px',
  margin: '16px',
  background: 'rgba(255, 255, 255, 0.3)',
};

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Helmet
        titleTemplate="%s - QiskitFlow"
        defaultTitle="QiskitFlow. Reproducible quantum experiments."
      >
        <meta
          name="description"
          content="QiskitFlow. Reproducible quantum experiments."
        />
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div style={logoStyle} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="home" icon={<PieChartOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="experiments" icon={<DesktopOutlined />}>
              <Link to="/experiments">Experiments</Link>
            </Menu.Item>
            <SubMenu key="profile" icon={<UserOutlined />} title="Profile">
              <Menu.Item key="profile">Profile</Menu.Item>
              <Menu.Item key="logout">Logout</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '16px 16px' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360, background: '#fff' }}
            >
              <Switch>
                <Route exact path="/" component={ExperimentsList} />
                <Route exact path="/experiments" component={ExperimentsList} />
                <Route path="/experiments/:experimentId" component={ExperimentRunsList} />
                <Route path="/runs/:id" component={Run} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>QiskitFlow ©2020</Footer>
        </Layout>
      </Layout>
    </div>
  );
}
