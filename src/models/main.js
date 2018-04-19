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
      console.log(routerRedux,'routerRedux');
      yield put({type:'changeMenu',value:value});
    },
    *logout({payload},{call,put}){
      console.log(payload,'value');
      var responseData = yield call(logout,{payload});
      console.log(responseData,'登出返回数据');
      if(responseData instanceof Object){
        if(responseData.code!==undefined&&responseData.code===1000){
          console.log('我要等出了');
          yield put(routerRedux.push(''));
        }
      }
    }
    },
  reducers: {
    changeMenu(state,action){
      console.log(action);
      return{
        ...state,menu:Number(action.value)
      }
    }
  },
}
