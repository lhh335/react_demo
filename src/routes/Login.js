import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Button, Row, Form, Input } from "antd";
import { Toast, WhiteSpace, WingBlank } from "antd-mobile";
const FormItem = Form.Item;

const Login = ({
  app,
  dispatch,
  form: { getFieldDecorator, validateFieldsAndScroll },
  location
}) => {
  const query = location.query || {};
  const btn = location.pathname === '/user' ? query.type === 'add' ? '添加' : query.type === 'del' ? '删除' : '修改' : '登录';
  const { loginLoading, loginErrorMsg } = app;
  var uri = "https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png";
  function handleOk() {
    validateFieldsAndScroll((err, value) => {
      if (err) {
        return;
      }
      dispatch({ type: "app/login", payload: value });
    });
  }

  function handleUser() {
    const query = location.query || {}
    validateFieldsAndScroll((err, value) => {
      if (err) {
        return;
      }
      dispatch({ type: `app/${query.type}user`, payload: value })
    });
  }
  function inputFocus() {
    dispatch({
      type: 'app/loginMsg',
      data: {
        code: null,
        message: null
      }
    })
  }

  function showToast(data) {
    switch (data.code) {
      case 0:
        Toast.success(data.message, 1);
        break;
      case 1:
        Toast.fail(data.message, 1);
        break;
      default:
        break;
    }
  }
  return (
    <div style={styles.login}>
      <div style={styles.loginView}>
        <div style={styles.loginHead}>
          <img style={styles.loginImg} src={uri} />
          <span style={styles.loginText}>后台管理系统</span>
        </div>
        <div style={styles.loginBody}>
          <form style={{ width: "80%" }}>
            <FormItem hasFeedback>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true
                  }
                ]
              })(
                <Input
                  size="large"
                  onPressEnter={handleOk}
                  onFocus={inputFocus}
                  placeholder="请输入用户名"
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    hasFeedback: true
                  }
                ]
              })(
                <Input
                  size="large"
                  type="password"
                  onPressEnter={handleOk}
                  onFocus={inputFocus}
                  placeholder="请输入密码"
                />
              )}
            </FormItem>
            {!!loginErrorMsg ? (
              <p
                style={{ color: "red", textAlign: "left", marginTop: -10 }}
              >
                {loginErrorMsg || null}
              </p>
            ) : null}
            <Button
              style={styles.loginButton}
              type="primary"
              size="large"
              onClick={location.pathname === '/user' ? handleUser : handleOk}
              loading={loginLoading}
            >
              {btn}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  app: PropTypes.object,
  dispatch: PropTypes.func
};

const styles = {
  login: {
    display: "flex",
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  loginView: {
    width: 320,
    height: 320,
    boxShadow: "0 0 100px rgba(0,0,0,.08)"
  },
  loginHead: {
    width: 320,
    height: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  loginImg: {
    width: 40,
    marginRight: 8
  },
  loginText: {
    fontSize: 18
  },
  loginBody: {
    height: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    width: "100%"
  }
};

export default connect(({ app }) => ({ app }))(Form.create()(Login));
