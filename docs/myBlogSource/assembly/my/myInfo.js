
/**
 * 用于拼接html字段
 * @param name
 * @param attribute
 * @param text
 * @constructor
 */
function ThreeObj(name, attribute, text) {
    this.name = name;
    this.attribute = attribute;
    this.text = text;
}

ThreeObj.prototype = {
    constructor: ThreeObj,  //每个函数都有prototype属性，指向该函数原型对象，原型对象都有constructor属性，这是一个指向prototype属性所在函数的指针
    toString: function () {
        var arr = [];
        arr.push("<");
        arr.push(this.name);
        var keys = Object.keys(this.attribute);
        var len = keys.length;
        if (len >= 1) {
            for (var i = 0; i < len; i++) {
                var obj = this.attribute[keys[i]];
                if (obj) {
                    arr.push(" ");
                    arr.push(keys[i]);
                    arr.push("=");
                    arr.push("'");
                    arr.push(obj);
                    arr.push("'");
                }
            }
        }
        arr.push(">");
        arr.push(this.text);
        arr.push("<");
        arr.push("/");
        arr.push(this.name);
        arr.push(">");
        return arr.join("");
    },
    setName: function (name) {
        this.name = name;
        return this;
    },
    setText: function (text) {
        this.text = text;
        return this;
    },
    setAttribute: function (attribute) {
        this.attribute = attribute;
        return this;
    }
};

