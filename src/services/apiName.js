const LocalApiName = {
  userLogin: "http://127.0.0.1:9001/api/v1/login",
  userLogout: "http://127.0.0.1:9000/api/v1/logout",
  init: "http://127.0.0.1:9000/api/v1/init/2004?token=7876&time=12345678",
  adduser: 'http://127.0.0.1:9000/api/v1/adduser',
  deluser: 'http://127.0.0.1:9000/api/v1/deluser',
  modifyPwd: 'http://127.0.0.1:9000/api/v1/modifyPwd'
};

const DNSApiName = {
  userLogin: "http://www.lhh-zzr.com:9001/api/v1/login",
  userLogout: "http://www.lhh-zzr.com:9000/api/v1/logout",
  init: "http://www.lhh-zzr.com:9000/api/v1/init",
  adduser: 'http://www.lhh-zzr.com:9000/api/v1/adduser',
  deluser: 'http://www.lhh-zzr.com:9000/api/v1/deluser',
  modifyPwd: 'http://www.lhh-zzr.com:9000/api/v1/modifyPwd'
}
const apiName = {
  DNSApiName,
  LocalApiName
}
export default apiName;
