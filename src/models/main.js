import {login,logout} from '../services/example';
import { routerRedux } from 'dva/router'
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export default {
  namespace: 'main',
  state:
  {
    menu:1,
    logout:false
  },
  subscriptions: {
    setup ({ dispatch }) {
    },
  },
  effects: {
    *selectedMenu({value},{call,put}){
      yield put({type:'changeMenu',value:value});
    },
    *logout({payload},{call,put}){
      var responseData = yield call(logout,{payload});
      if(responseData instanceof Object){
        if(responseData.code!==undefined&&responseData.code===1000){
          yield put(routerRedux.push(''));
        }
      }
    }
    },
  reducers: {
    changeMenu(state,action){
      return{
        ...state,menu:Number(action.value)
      }
    }
  },
}
