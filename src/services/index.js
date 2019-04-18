import { requestPost } from "./request";
import * as apiName from "./apiName";

export const login = async ({ payload }) => {
  return requestPost(apiName.userLogin, {
    body: JSON.stringify(payload)
  });
};

export const logout = async ({ payload }) => {
  return requestPost(apiName.userLogout, {
    body: JSON.stringify(payload)
  });
};

