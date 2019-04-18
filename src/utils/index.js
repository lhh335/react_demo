const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");
/**
 * 延时
 */
export const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

 /**
  * 加密
  * @param {string} word 
  */
export function encrypt(word) {
  var key = CryptoJS.enc.Utf8.parse("1234567890000000"); //16位
  var iv = CryptoJS.enc.Utf8.parse("1234567890000000");
  var encrypted = "";
  if (typeof word == "string") {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  } else if (typeof word == "object") {
    //对象格式的转成json字符串
    data = JSON.stringify(word);
    var srcs = CryptoJS.enc.Utf8.parse(data);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  }
  return encrypted.ciphertext.toString();
}