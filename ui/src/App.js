import React from 'react';
import './App.less';

import { Layout, Menu, Breadcrumb } from 'antd';

import ExperimentsPage from './pages/experiments/index.js';

const { Header, Content, Footer } = Layout;

const App = () => (
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Experiments</Menu.Item>
      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Experiments</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: "80vh", backgroundColor: "white" }}>
       <ExperimentsPage />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>QiskitFlow ©2020 Created following social distancing protocols :) </Footer>
  </Layout>
);

export default App;