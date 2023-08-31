var sensitive = {};

sensitive.getData = function () {
    var data = [];
    var len = 10;
    var id = Math.round(Math.random() * 100);
    for (var i = 0; i < len; i++) {
        var name = Math.random()                        // 生成随机数字, eg: 0.123456
            .toString(36)           // 转化成36进制 : "0.4fzyo82mvyr"
            .slice(-8);// 截取最后八位 : "yo82mvyr"
        data.push({
            key: Math.round(Math.random() * 100) + Math.random(),
            password: Math.round(Math.random() * 100) * Math.round(Math.random() * 100),
            iv: Math.round(Math.random() * 100),
            result: Math.round(Math.random() * 100) * Math.round(Math.random() * 100) * Math.round(Math.random() * 100),
            id: ++id,
            name: name
        });
    }
    data.push({
        key: "****",
        password: "测试",
        iv: "****",
        result: "zTGEbB3DwacS5sjPmj17vg==",
        id: ++id,
        name: new Date().toString() + Math.E
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "pHzAdbccC8LVPLkeTOj3pA==",
        id: ++id,
        name: '码云密码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "mdDaIk9WDFpvJkiy1z66HQ==",
        id: ++id,
        name: '码云账号'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "mdDaIk9WDFpvJkiy1z66HQ==",
        id: ++id,
        name: 'csdn 账号'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "IoB5t32ytrfappcRZSyUDnqu4v2S7dxRaPuQ5ewxGqs=",
        id: ++id,
        name: 'csdn 密码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "身份证号码",
        id: ++id,
        name: '成都市社保卡账号 == > 社会保障号码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "IXSFOv0GdotN99B8CYOzbw==",
        id: ++id,
        name: '成都市社保卡账号 == > 银行密码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "wNHKCtyWlfeqiYQ3ls6qWg==",
        id: ++id,
        name: '成都市社保卡密码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "T0AAdmp7fAD+PScOkyZ+9ktbC/UxO2j+0PgjUZBTwgU=",
        id: ++id,
        name: '身份证号码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "pHzAdbccC8LVPLkeTOj3pA==",
        id: ++id,
        name: '支付宝密码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "mdDaIk9WDFpvJkiy1z66HQ==",
        id: ++id,
        name: '支付宝 账号'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "mdDaIk9WDFpvJkiy1z66HQ==",
        id: ++id,
        name: 'https://leetcode-cn.com/账号'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "+qWUYiSjejJQ6r+pQi+TyQ==",
        id: ++id,
        name: 'https://leetcode-cn.com/ 账号'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "my phone number",
        id: ++id,
        name: ' 四川省教育考试院 密码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "身份证号码",
        id: ++id,
        name: ' 四川省教育考试院 账户'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "8qBtN8ehmLMfUGvnvAPFXZ926MZc+IDoupjGKuuDNz4=",
        id: ++id,
        name: ' 微信公众号 账户'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "pHzAdbccC8LVPLkeTOj3pA==",
        id: ++id,
        name: ' 微信公众号 密码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "my phone number",
        id: ++id,
        name: ' 移动宽带 密码'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "HAx0wbu0RkuLZyFdvLUuwQ==",
        id: ++id,
        name: ' 163 授权码(登录密码)'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "KiERY/nCdvVROFZce8GnlXlrGSN9s1gXFZWkOi2N0MQ=",
        id: ++id,
        name: ' qq 授权码(登录密码)'
    });
    data.push({
        key: "****",
        password: "******",
        iv: "****",
        result: "jJ0/nagswSTFSN08rwI5dQ==",
        id: ++id,
        name: ' oracle(登录密码)'
    });
    for (var j = 0; j < 100; j++) {
        var nameN1 = Math.random()                        // 生成随机数字, eg: 0.123456
            .toString(36)           // 转化成36进制 : "0.4fzyo82mvyr"
            .slice(-8);// 截取最后八位 : "yo82mvyr"
        data.push({
            key: Math.round(Math.random() * 100) + Math.random(),
            password: Math.round(Math.random() * 100) * Math.round(Math.random() * 100),
            iv: Math.round(Math.random() * 100),
            result: Math.round(Math.random() * 100) * Math.round(Math.random() * 100) * Math.round(Math.random() * 100),
            id: ++id,
            name: nameN1
        });
    }
    return data;
};
