import {request} from '../utils/request';
import {delay} from '../utils/request';


export async function login() {
  return request('http://127.0.0.1/login');
  console.log('调用server方法');
}

// export function login(payload){
//   delay(payload)
// }
