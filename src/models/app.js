import { login, logout, init, adduser, deluser, modifyPwd } from "../services/index";
import { routerRedux } from "dva/router";
import { message } from 'antd';
import { encrypt, delay } from '../utils/index';


export default {
  namespace: "app",
  state: {
    loginLoading: false,
    myState: 0,
    data: {},
    loginErrorMsg: null,
    isToast: false,
    sideMenus: [], // 所有的菜单列表
    defaultOpenKeys: [], // 默认打开的菜单列表
    seletedMenukey: 'menu1_0',
    isLogin: false,
    userInfo: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'init' })
      history.listen(location => {
        const isLogin = localStorage.getItem('isLogin');
        if (!isLogin && location.pathname === "/main") {
          dispatch(routerRedux.replace({ pathname: "/" }));
          return;
        }
        if (!!isLogin && location.pathname === "/") {
          dispatch(routerRedux.replace({ pathname: "/main" }));
        }
      });
    }
  },
  effects: {
    *init({ payload }, { call, put }) {
      const { status = {}, data = {} } = yield call(init, {});
      const sideMenus = data.sideMenus || localStorage.getItem('sideMenus') || [];
      localStorage.setItem('sideMenus', JSON.stringify(sideMenus));
      !!data.token && localStorage.setItem('token', data.token);
      if (status.code === 10000) {
        localStorage.setItem('isLogin', true);
        yield put(routerRedux.replace({
          pathname: '/main'
        }))
      }
    },
    // 修改密码
    *modifyuser({ payload }, { call, put }) {
      const { password } = payload;
      if (typeof password === 'string') {
        payload.password = encrypt(payload.password);
      }
      const { status = {}, data = {} } = yield call(modifyPwd, payload);
      if (status.code === 10000) {

        message.success('修改密码成功', 2);
        // localStorage.removeItem('isLogin');
        yield call(delay, 3000);
        yield put(routerRedux.replace({
          pathname: '/main'
        }))
      }
    },
    *adduser({ payload }, { call, put }) {
      const { password } = payload;
      if (typeof password === 'string') {
        payload.password = encrypt(payload.password);
      }
      const { status = {}, data = {} } = yield call(adduser, payload);
      if (status.code === 10000) {
        message.success('添加用户成功', 2);
        yield call(delay, 3000);
        yield put(routerRedux.replace({
          pathname: '/main'
        }))
      }

    },
    *deluser({ payload }, { call, put }) {
      const { password } = payload;
      if (typeof password === 'string') {
        payload.password = encrypt(payload.password);
      }
      const { status = {}, data = {} } = yield call(deluser, payload);
      if (status.code === 10000) {
        message.success('删除用户成功', 2);
        yield call(delay, 3000);
        yield put(routerRedux.replace({
          pathname: '/main'
        }))
      }
    },
    *login({ payload }, { call, put }) {
      yield put({ type: "showLoginLoading" });
      yield call(delay, 2000);
      yield put({ type: "hideLoginLoading" });
      yield call(delay, 1000);
      const { password } = payload;
      if (typeof password === 'string') {
        payload.password = encrypt(payload.password);
      }
      const { status = {}, data = {} } = yield call(login, payload);
      if (status.code === 10000) {
        yield put({
          type: "loginMsg",
          data: { code: status.code, message: null }
        });
        yield put({
          type: 'loginStatus',
          payload: true
        })
        localStorage.setItem('token', data.token);
        yield put({
          type: 'saveUserInfo',
          payload: data
        })
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem('isLogin', true);
        yield put(routerRedux.push({ pathname: "/main" }));
      } else {
        yield put({
          type: "loginMsg",
          data: { code: status.code, message: status.msg }
        });
      }
    },
    *practice(value, { call, put }) {
      yield put({ type: "changeState", value: 55 });
      yield call(delay, 5000);
      yield put(routerRedux.replace("", "/practice"));
    },
    *logout({ payload }, { call, put }) {
      var { status, data = {} } = yield call(logout, { payload });
      if (status.code === 10000) {
        localStorage.removeItem('isLogin');
        yield put({
          type: 'saveUserInfo',
          payload: {}
        })
        localStorage.removeItem("userInfo");
        yield put(routerRedux.replace({
          pathname: '/'
        }));
        yield put({
          type: 'loginStatus',
          payload: false
        });
      }
    }
  },
  reducers: {
    saveUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload
      }
    },
    loginStatus(state, { payload }) {
      return {
        ...state,
        isLogin: payload
      }
    },
    saveSideMenus(state, { payload }) {
      // 一级菜单
      const firstMenus = payload.map(item => {
        return item.key;
      })
      return {
        ...state,
        sideMenus: payload,
        defaultOpenKeys: firstMenus
      }
    },
    saveSelectedMenuKey(state, { payload }) {
      return {
        ...state,
        seletedMenukey: payload
      }
    },
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true
      };
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false
      };
    },
    changeState(state, action) {
      return {
        ...state,
        myState: state.myState + action.value
      };
    },
    changeMsg(state, action) {
      return {
        ...state,
        data: action.msg
      };
    },
    loginMsg(state, payload) {
      return {
        ...state,
        isToast: true,
        loginErrorMsg: payload.data.message
      };
    },
  }
};
