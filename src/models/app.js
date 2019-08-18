import { login, logout, init } from "../services/index";
import { routerRedux } from "dva/router";
import { encrypt, delay } from '../utils/index';


export default {
  namespace: "app",
  state: {
    loginLoading: false,
    myState: 0,
    data: {},
    responseMsg: {},
    isToast: false,
    sideMenus: [], // 所有的菜单列表
    defaultOpenKeys: [], // 默认打开的菜单列表
    seletedMenukey: 'menu1_0',
    isLogin: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'init' })
      history.listen(location => {
        console.log(location, '历史');
        const isLogin = sessionStorage.getItem('isLogin');
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
      const { code, data = {} } = yield call(init, {});
      if (code === 200) {
        const sideMenus = data.sideMenus || sessionStorage.getItem('sideMenus') || {};
        sessionStorage.setItem('sideMenus', JSON.stringify(sideMenus));
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
      const backdata = yield call(login, payload);
      if (backdata.err !== undefined) {
        return;
      } else {
        if (backdata.code === 200) {
          yield put({
            type: "loginMsg",
            data: { code: 0, message: "登陆成功，请稍后" }
          });
          yield put({
            type: 'loginStatus',
            payload: true
          })
          sessionStorage.setItem('isLogin', true);
          yield put(routerRedux.push({ pathname: "/main" }));
        } else {
          yield put({
            type: "loginMsg",
            data: { code: 1, message: "账号或密码错误，请重新尝试" }
          });
        }
      }
      yield put({ type: "changeMsg", msg: backdata });
    },
    *practice(value, { call, put }) {
      yield put({ type: "changeState", value: 55 });
      yield call(delay, 5000);
      yield put(routerRedux.replace("", "/practice"));
    },
    *logout({ payload }, { call, put }) {
      var responseData = yield call(logout, { payload });
      if (responseData instanceof Object) {
        if (responseData.code !== undefined && responseData.code === 1000) {
          sessionStorage.removeItem('isLogin');
          yield put({ type: "logout", payload: responseData });
          yield put(routerRedux.push(""));
          yield put({ 
            type: 'loginStatus',
            payload: false
           });
        }
      }
    }
  },
  reducers: {
    loginStatus(state, { payload }) {
      return {
        ...state,
        isLogin: payload
      }
    },
    saveSideMenus(state,{ payload }){
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
    saveSelectedMenuKey(state, { payload }){
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
    loginMsg(state, action) {
      return {
        ...state,
        isToast: true,
        responseMsg: action.data
      };
    },
    logout(state, action) {
      return {
        ...state,
        responseMsg: action.payload
      };
    }
  }
};
