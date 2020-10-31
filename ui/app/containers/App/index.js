/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ExperimentsList from '../ExperimentsList/Loadable';
import ExperimentRunsList from '../ExperimentRunsList/Loadable';
import Run from '../Run/Loadable';

const { Header, Content, Footer } = Layout;

export default function App() {
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
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['experiments']}>
            <Menu.Item key="home">Home</Menu.Item>
            <Menu.Item key="experiments">Experiments</Menu.Item>
            <Menu.Item key="profile">Profile</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              height: '85vh',
              backgroundColor: 'white',
              padding: '16px',
            }}
          >
            <Switch>
              <Route exact path="/" component={ExperimentsList} />
              <Route path="/experiments" component={ExperimentsList} />
              <Route path="/experiments/:id" component={ExperimentRunsList} />
              <Route path="/run/:id" component={Run} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }} >
          QiskitFlow ©2020
        </Footer>
      </Layout>
    </div>
  );
}
