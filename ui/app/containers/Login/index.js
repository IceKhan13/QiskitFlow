/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Form, Input, Button, Card } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { loginAction } from '../App/actions';
import { makeSelectLoggedIn, makeSelectUser, makeSelectLoginError } from '../App/selectors';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function Login({ login, user, loggedIn, loginError }) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const onFinish = values => {
    const { username, password } = values;
    login(username, password);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  console.log(loginError)

  return (
    <Card title="Login form" style={{ marginTop: 20}}>
      <Form
        {...layout}
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          validateStatus={loginError ? 'error' : ''}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          validateStatus={loginError ? 'error' : ''}
          help={loginError ? 'Invalid login or password' : ''}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func,
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  loginError: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loggedId: makeSelectLoggedIn(),
  loginError: makeSelectLoginError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: (user, password) => dispatch(loginAction(user, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
