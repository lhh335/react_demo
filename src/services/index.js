import { requestPost, requestGet, requestDelete, requestPut } from "./request";
import * as apiName from "./apiName";

/**
 * 
 * DNSApiName: 阿里云域名服务器
 * LocalApiName: 本地服务器
 */


 /**
  * 登录
  */
export const login = async (payload) => {
  return requestPost(apiName.LocalApiName.userLogin, {
    body: JSON.stringify(payload)
  });
};

/**
 * 
 * 退出
 */
export const logout = async ({ payload = {} }) => {
  return requestPost(apiName.LocalApiName.userLogout, {
    body: JSON.stringify(payload)
  });
};

/**
 * 
 * 项目初始化
 */
export const init = async () => {
  return requestGet(apiName.LocalApiName.init);
};

/**
 * 
 * 添加用户
 */
export const adduser = async (payload) => {
  return requestPost(apiName.LocalApiName.adduser, {
    body: JSON.stringify(payload)
  })
}

/**
 * 
 * 删除用户
 */
export const deluser = async (payload) => {
  return requestDelete(apiName.LocalApiName.deluser, {
    body: JSON.stringify(payload)
  })
}

/**
 * 
 * 修改密码
 */
export const modifyPwd = async (payload) => {
  return requestPut(apiName.LocalApiName.modifyPwd, {
    body: JSON.stringify(payload)
  })
}

