import {login} from '../services/example';
import { routerRedux } from 'dva/router'

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export default {
  namespace: 'main',
  state:
  {
    menu:1
  },
  subscriptions: {
    setup ({ dispatch }) {
    },
  },
  effects: {
    *selectedMenu({value},{call,put}){
      console.log(routerRedux,'routerRedux');
      yield put({type:'changeMenu',value:value});
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
