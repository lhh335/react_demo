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
