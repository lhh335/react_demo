import login from '../services/example';
import { routerRedux } from 'dva/router'
import { stat } from 'fs';

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
      yield put(routerRedux.push('/main'))
    },
    *practice(value,{call,put}){
      console.log(value,'传送过来的数据');
      yield put({type:'changeState',value:55})
      yield call (delay,5000);
      yield put(routerRedux.replace('','/practice'));
    },
    *sideMenu(value,{call,put}){
      console.log(999999,value);
      switch(Number(value.value)){
        case 1:
        yield put(routerRedux.push('/menu1'));
        break;
        case 2:
        yield put(routerRedux.replace('/practice','/menu1'));
        break;
        case 3:
        yield put(routerRedux.replace());
        break;
        case 4:
        yield put(routerRedux.replace());
        break;                
      }
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
      console.log(action,'reduce中的action');
      return {
        ...state,myState:state.myState+action.value
      }
    },
    addDoubleState(state,action){
      return {...state,myState:state.myState + 3}
    }
  },
}
