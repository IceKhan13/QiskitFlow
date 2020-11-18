/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Table } from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ExperimentsList from '../ExperimentsList/Loadable';
import ExperimentRunsList from '../ExperimentRunsList/Loadable';
import Run from '../Run/Loadable';
import { makeSelectLoggedIn, makeSelectUser } from './selectors';
import { logoutAction, profileAction } from './actions';
import saga from '../Login/saga';
import { useInjectSaga } from '../../utils/injectSaga';
import HomePage from '../HomePage/Loadable';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const logoStyle = {
  height: '32px',
  margin: '16px',
  background: 'rgba(255, 255, 255, 0.3)',
};

function App({ user, loggedIn, logoutUser, getProfile }) {
  useInjectSaga({ key: 'login', saga });

  useEffect(() => {
    if (!loggedIn) getProfile();
  });

  const [collapsed, setCollapsed] = useState(false);

  const siderMenu = loggedIn ? (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div style={logoStyle} />
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['profile']}
        mode="inline"
      >
        <Menu.Item key="home" icon={<PieChartOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="experiments" icon={<DesktopOutlined />}>
          <Link to="/experiments">My experiments</Link>
        </Menu.Item>
        <SubMenu key="profile" icon={<UserOutlined />} title="Profile">
          <Menu.Item key="profile">{`${user.username} profile`}</Menu.Item>
          <Menu.Item key="logout" onClick={logoutUser}>
            Logout
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  ) : (
    ''
  );

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
        {siderMenu}
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '16px 16px' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360, background: '#fff' }}
            >
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/experiments" component={ExperimentsList} />
                <Route
                  path="/experiments/:experimentId"
                  component={ExperimentRunsList}
                />
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

App.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  logoutUser: PropTypes.func,
  getProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loggedIn: makeSelectLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    logoutUser: () => dispatch(logoutAction()),
    getProfile: () => dispatch(profileAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
