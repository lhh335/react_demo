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
    myState:0
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
      yield put(routerRedux.push('/main'))
    },
    *practice(value,{call,put}){
      console.log(value,'传送过来的数据');
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
      console.log(action,'reduce中的action');
      return {
        ...state,myState:state.myState+action.value
      }
    },
  },
}
