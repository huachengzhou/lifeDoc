/**
 * Created by zch on 2019-10-03.
 * aes 加密和解密
 */
(function ($) {
    var aesTool = function () {
        this.success = function () {

        }
    };

    aesTool.prototype.handleLength = function (s,num) {
        var len = s.length ;
        if (len >= num){
            // console.info(s+" ==>"+len) ;
            return s;
        }else {
            var temp = s +"0" ;
            return this.handleLength(temp,num) ;
        }
    };

    /**
     * 加密
     * @param data
     * @param key 32位
     * @param iv 16位
     */
    aesTool.prototype.encryptedMethod = function (data, key, iv) {
        key = this.handleLength(key,32) ;
        iv = this.handleLength(iv,16) ;
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
        key = this.handleLength(key,32) ;
        iv = this.handleLength(iv,16) ;
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


    var c1 = getAES("hello");
    var c2 = getDAes(c1);
    // console.log(c1 + " " + c2);

    window.aesTool = new aesTool();
})(jQuery);

function aesChangeValue(_this) {
    if (!$(_this).val()) {
        return false;
    }
    var target = $(_this).closest("form");
    var data = formSerializeArray(target);
    if (!data.iv) {
        return false;
    }
    if (!data.password) {
        return false;
    }
    if (!data.key) {
        return false;
    }
    var ele = target.find("div[data-key='result']").find("code");
    if (data.aes == '0') {
        var encrypted = aesTool.encryptedMethod(data.password, data.key, data.iv); //密文
        ele.text(encrypted);
    } else {
        var encrypted = aesTool.decryptedMethod(data.password, data.key, data.iv); //密文
        ele.text(encrypted);
    }
};


