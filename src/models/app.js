import {login} from '../services/example';
import { routerRedux } from 'dva/router'
import { stat } from 'fs';
import {request} from '../utils/request';
const AES = require('crypto-js/aes');
const SHA256 = require('crypto-js/sha256');
const CryptoJS = require('crypto-js');


const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
export default {
  namespace: 'app',
  state:
  {
    loginLoading:false,
    myState:0,
    data:{},
    responseMsg:{},
    isToast:false
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
      yield put({ type: 'showLoginLoading' })
      yield call(delay,2000)
      yield put({ type: 'hideLoginLoading' })
      yield call(delay,1000)
      function encrypt(word) {  
        var key = CryptoJS.enc.Utf8.parse("1234567890000000"); //16位  
        var iv = CryptoJS.enc.Utf8.parse("1234567890000000");  
        var encrypted = '';  
        if (typeof(word) == 'string') {  
            var srcs = CryptoJS.enc.Utf8.parse(word);  
            encrypted = CryptoJS.AES.encrypt(srcs, key, {  
                iv: iv,  
                mode: CryptoJS.mode.CBC,  
                padding: CryptoJS.pad.Pkcs7  
            });
        } else if (typeof(word) == 'object') { //对象格式的转成json字符串  
            data = JSON.stringify(word);  
            var srcs = CryptoJS.enc.Utf8.parse(data);  
            encrypted = CryptoJS.AES.encrypt(srcs, key, {  
                iv: iv,  
                mode: CryptoJS.mode.CBC,  
                padding: CryptoJS.pad.Pkcs7  
            })  
        }  
        return encrypted.ciphertext.toString();  
    }  
      if(payload.password!==undefined && typeof payload.password ==='string'){
        payload.password = encrypt(payload.password);
      }
      const backdata=yield call(login,{payload});
      console.log(backdata,'backdata','=====payload',payload);
      if(backdata.err!==undefined){
          return;
      }else{
        if(backdata.code===20000){
          yield put({type:'loginMsg',data:{code:0,message:'登陆成功，请稍后'}})
          yield put(routerRedux.push({pathname:'/main'}))
        }else{
          yield put({type:'loginMsg',data:{code:1,message:'账号或密码错误，清重新尝试'}})
        }
      }
      yield put({type:'changeMsg',msg:backdata})
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
    },
    loginMsg(state,action){
      console.log(action.data,'登陆');
      return {
        ...state,isToast:true,responseMsg:action.data
      }
    }
  },
}
