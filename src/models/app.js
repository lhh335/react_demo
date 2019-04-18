import { login, logout } from "../services/index";
import { routerRedux } from "dva/router";
import { encrypt, delay } from '../utils/index';


export default {
  namespace: "app",
  state: {
    loginLoading: false,
    myState: 0,
    data: {},
    responseMsg: {},
    isToast: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/practice") {
          dispatch({ type: "addDoubleState" });
        }
      });
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({ type: "showLoginLoading" });
      yield call(delay, 2000);
      yield put({ type: "hideLoginLoading" });
      yield call(delay, 1000);
      const { password } = payload;
      if (typeof password === 'string') {
        payload.password = encrypt(payload.password);
      }
      const backdata = yield call(login, { payload });
      if (backdata.err !== undefined) {
        return;
      } else {
        if (backdata.code === 20000) {
          yield put({
            type: "loginMsg",
            data: { code: 0, message: "登陆成功，请稍后" }
          });
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
      console.log(payload, "payload");
      var responseData = yield call(logout, { payload });
      if (responseData instanceof Object) {
        if (responseData.code !== undefined && responseData.code === 1000) {
          yield put({ type: "logout", payload: responseData });
          yield put(routerRedux.push(""));
        }
      }
    }
  },
  reducers: {
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
      console.log(action, "action");
      return {
        ...state,
        responseMsg: action.payload
      };
    }
  }
};
