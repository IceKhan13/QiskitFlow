/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Skeleton, Card, Divider, Steps } from 'antd';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectLoggedIn,
  makeSelectUser,
} from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import Login from '../Login/Loadable';
import SharedRunsList from '../SharedRunsList/Loadable';

const { Step } = Steps;

const key = 'home';

export function HomePage({ dispatch, user, loggedIn, loading }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const loginForm = loggedIn ? '' : <Login />;

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Card title="Greetings" style={{ margin: '20px 0' }}>
            <Skeleton avatar paragraph={{ rows: 4 }} />
          </Card>
          <Divider />
          <h2>Shared experiments</h2>
          <SharedRunsList />
        </Col>
        <Col span={6}>
          <Card title="QiskitFlow info" style={{ margin: '20px 0' }}>
            <b>Build</b>: 0.0.1-alpha
            <br />
            <b>Uptime</b>: 10 days
            <br />
            <b>Email</b>: qiskitflow@gmail.com
          </Card>
          <img
            src="https://media.giphy.com/media/CamIr5pLSEU6xfC6Ro/giphy.gif"
            alt="QiskitFlow 3d"
            width="100%"
          />
          {loginForm}
          <Card title="Roadmap" style={{ margin: '20px 0' }}>
            <Steps direction="vertical" current={1}>
              <Step
                title="Alpha release"
                description="Alpha release for closed testing"
              />
              <Step title="Testing" description="Testing is in progress" />
              <Step
                title="Genera public release"
                description="Release for general public with open registration"
              />
              <Step
                title="Experiments compiler"
                description="Compiler backend for compiling executable images for running experiments"
              />
            </Steps>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  loggedIn: makeSelectLoggedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
