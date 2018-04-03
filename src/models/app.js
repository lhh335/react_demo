import {login} from '../services/example';
import { routerRedux } from 'dva/router'

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
    setup ({ dispatch }) {
    },
  },
  effects: {
    *login ({payload}, { call, put}) {
      console.log(payload,'接受到的payload');
      yield put({ type: 'showLoginLoading' })
      yield call(delay,2000)
      yield put({ type: 'hideLoginLoading' })
      yield call(delay,1000)
      yield put(routerRedux.push('/main'))
    },
    *practice(value,{call,put}){
      console.log(value,'传送过来的数据');
      yield put({type:'changeState',value:'内部传送数据'})
    }
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
      console.log(state,action,'reduce中的action');
      return {
        ...state,myState:state.myState+1
      }
    }
  },
}
