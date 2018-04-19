import {requestPost} from '../utils/request';
import {delay} from '../utils/request';
import * as Server from './serverName';


export async function login({payload}) {
  return requestPost(Server.userLogin,{
    body:JSON.stringify(payload)
  });
}

export async function logout({payload}){
  return requestPost(Server.userLogout,{
    body:JSON.stringify(payload)
  })
}

// export function login(payload){
//   delay(payload)
// }
