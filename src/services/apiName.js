const LocalApiName = {
  userLogin: "http://127.0.0.1:8010/v1/login",
  userLogout: "http://127.0.0.1:8010/v1/logout",
  init: "http://127.0.0.1:8010/v1/init",
  adduser: 'http://127.0.0.1:8010/v1/adduser',
  deluser: 'http://127.0.0.1:8010/v1/deluser',
  modifyPwd: 'http://127.0.0.1:8010/v1/modifyPwd'
};

const DNSApiName_https = {
  userLogin: "https://www.lhh-zzr.com:8009/v1/login",
  userLogout: "https://www.lhh-zzr.com:8009/v1/logout",
  init: "https://www.lhh-zzr.com:8009/v1/init",
  adduser: 'https://www.lhh-zzr.com:8009/v1/adduser',
  deluser: 'https://www.lhh-zzr.com:8009/v1/deluser',
  modifyPwd: 'https://www.lhh-zzr.com:8009/v1/modifyPwd'
}

const DNSApiName = {
  userLogin: "http://www.lhh-zzr.com:8010/v1/login",
  userLogout: "http://www.lhh-zzr.com:8010/v1/logout",
  init: "http://www.lhh-zzr.com:8010/v1/init",
  adduser: 'http://www.lhh-zzr.com:8010/v1/adduser',
  deluser: 'http://www.lhh-zzr.com:8010/v1/deluser',
  modifyPwd: 'http://www.lhh-zzr.com:8010/v1/modifyPwd'
}
const apiName = {
  DNSApiName,
  LocalApiName,
  DNSApiName_https
}
export default apiName;
