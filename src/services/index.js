import { requestPost, requestGet, requestDelete, requestPut } from "./request";
import * as apiName from "./apiName";

const dns_apiName = window.location.protocol.includes('https') && apiName.DNSApiName_https || apiName.DNSApiName;
// const dns_apiName = apiName.LocalApiName;
/**
 * 
 * DNSApiName: 阿里云域名服务器
 * LocalApiName: 本地服务器
 */

 /**
  * 登录
  */
export const login = async (payload) => {
  return requestPost(dns_apiName.userLogin, {
    body: JSON.stringify(payload)
  });
};

/**
 * 
 * 退出
 */
export const logout = async ({ payload = {} }) => {
  return requestPost(dns_apiName.userLogout, {
    body: JSON.stringify(payload)
  });
};

/**
 * 
 * 项目初始化
 */
export const init = async () => {
  return requestGet(dns_apiName.init);
};

/**
 * 
 * 添加用户
 */
export const adduser = async (payload) => {
  return requestPost(dns_apiName.adduser, {
    body: JSON.stringify(payload)
  })
}

/**
 * 
 * 删除用户
 */
export const deluser = async (payload) => {
  return requestDelete(dns_apiName.deluser, {
    body: JSON.stringify(payload)
  })
}

/**
 * 
 * 修改密码
 */
export const modifyPwd = async (payload) => {
  return requestPut(dns_apiName.modifyPwd, {
    body: JSON.stringify(payload)
  })
}

