import {requestPost} from '../utils/request';
import {delay} from '../utils/request';
import * as Server from './serverName';


export async function login({payload}) {
  console.log(payload,'====================>>>>>>>>>');
  return requestPost(Server.userLogin,{
    body:JSON.stringify(payload)
  });
}

export async function logout({payload}){
  console.log(payload,'===================');
  return requestPost(Server.logout,{
    body:JSON.stringify(payload)
  })
}

// export function login(payload){
//   delay(payload)
// }
