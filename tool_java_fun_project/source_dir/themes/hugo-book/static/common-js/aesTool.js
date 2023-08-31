/**
 * Created by zch on 2019-10-03.
 * aes 加密和解密
 */
var aesTool = function () {
    this.success = function () {

    }
};

aesTool.prototype.handleLength = function (s, num) {
    var len = s.length;
    if (len >= num) {
        // console.info(s+" ==>"+len) ;
        return s;
    } else {
        var temp = s + "0";
        return this.handleLength(temp, num);
    }
};

/**
 * 加密
 * @param data
 * @param key 32位
 * @param iv 16位
 */
aesTool.prototype.encryptedMethod = function (data, key, iv) {
    key = this.handleLength(key, 32);
    iv = this.handleLength(iv, 16);
    var keyA = CryptoJS.enc.Utf8.parse(key);
    var ivA = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(data, keyA,
        {
            iv: ivA,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();    //返回的是base64格式的密文
};

/**
 * 解密
 * @param encrypted
 * @param key 32位
 * @param iv 16位
 * @returns {string}
 */
aesTool.prototype.decryptedMethod = function (encrypted, key, iv) {
    key = this.handleLength(key, 32);
    iv = this.handleLength(iv, 16);
    var keyA = CryptoJS.enc.Utf8.parse(key);
    var ivA = CryptoJS.enc.Utf8.parse(iv);
    var decrypted = CryptoJS.AES.decrypt(encrypted, keyA,
        {
            iv: ivA,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

function getAES(data) { //加密
    var key = 'AAA';  //密钥
    var iv = 'ss';
    var encrypted = aesTool.prototype.encryptedMethod(data, key, iv); //密文
    var encrypted1 = CryptoJS.enc.Utf8.parse(encrypted);
    return encrypted;
};

function getDAes(data) {//解密
    var key = 'AAA';  //密钥
    var iv = 'ss';
    var decryptedStr = aesTool.prototype.decryptedMethod(data, key, iv);
    return decryptedStr;
};


window.aesTool = new aesTool();




var iv_value = "0000";
var key_value = "abc";


var c1x = aesTool.encryptedMethod("123456", key_value, iv_value);
var c2x = aesTool.decryptedMethod(c1x, key_value, iv_value);
var allData = sensitive.getData();


console.log(c1x);
console.log(c2x);
console.log(allData);
