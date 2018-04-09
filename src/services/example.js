import {request} from '../utils/request';
import {delay} from '../utils/request';


export async function login(data) {
  console.log(data,44444);
  return request('http://localhost:9000/server',{
    method:'POST',
    headers:{
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    mode:"cors",
    body:JSON.stringify(data.payload)
  });
}

// export function login(payload){
//   delay(payload)
// }
