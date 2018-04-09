import {login} from '../services/example';
import { routerRedux } from 'dva/router'
import { stat } from 'fs';
import {request} from '../utils/request';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
console.log(login,'login');
export default {
  namespace: 'app',
  state:
  {
    loginLoading:false,
    myState:0,
    data:{}
  },
  subscriptions: {
    setup ({ dispatch,history }) {
      history.listen((location)=>{
        if(location.pathname==='/practice'){
          dispatch({type:'addDoubleState'})
        }
      })
    },
  },
  effects: {
    *login ({payload}, { call, put}) {
      console.log(payload,'接受到的payload');
      yield put({ type: 'showLoginLoading' })
      yield call(delay,2000)
      yield put({ type: 'hideLoginLoading' })
      yield call(delay,1000)
      const backdata=yield call(login,{payload});
      console.log(backdata,'backdata');
      if(backdata.err!==undefined){
          return;
      }
      yield put({type:'changeMsg',msg:backdata})
      yield put(routerRedux.push('/main'))
    },
    *practice(value,{call,put}){
      yield put({type:'changeState',value:55})
      yield call (delay,5000);
      yield put(routerRedux.replace('','/practice'));
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,loginLoading: false,
      }
    },
    changeState(state,action){
      return {
        ...state,myState:state.myState+action.value
      }
    },
    changeMsg(state,action){
      console.log(action,'msg');
      return {
        ...state,data:action.msg
      }
    }
  },
}
