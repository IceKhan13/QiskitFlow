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
        <title>Home</title>
      </Helmet>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Card title="Greetings!" style={{ margin: '20px 0' }}>
            <p>
              Welcome to alpha version of QiskitFlow! Platform for tracking,
              sharing and running quantum experiments in a clean and
              understandable for developers, researchers and students manner.
              Thank you for taking time and reviewing our efforts in making
              quantum computing more transparent for everybody!
            </p>
            <p>
              If you have any questions or suggestions feel free to drop an
              email qiskitflow@gmail.com or open{' '}
              <a href="https://github.com/IceKhan13/QiskitFlow/issues" target="_blank">
                Github issue
              </a>
            </p>
          </Card>
          <Divider />
          <h2>Public experiments</h2>
          <SharedRunsList />
        </Col>
        <Col span={6}>
          <Card title="QiskitFlow info" style={{ margin: '20px 0' }}>
            <b>Build</b>: 0.0.1-alpha
            <br />
            <b>Email</b>: qiskitflow@gmail.com
            <br />
            <b>Github</b>: https://github.com/IceKhan13/QiskitFlow
            <br />
            <b>PyPi</b>: https://pypi.org/project/qiskitflow/
          </Card>
          {loginForm}
          <img
            src="https://media.giphy.com/media/rmIGBIsDle8dEPubrG/giphy.gif"
            alt="QiskitFlow 3d"
            width="100%"
          />
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
                description="Compiler backend for building executable images of executed experiments"
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
