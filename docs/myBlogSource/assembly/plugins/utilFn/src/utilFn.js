function UtilHelpApp20190531() {
    if (this.constructor != UtilHelpApp20190531) {
        return new UtilHelpApp20190531();
    }
    //获取参数
    var getArg = function (arg) {
        var ret = {
            'n': [], //number
            's': [], //string
            'b': [], //boolean
            'o': [], //object
            'O': [], //Object
            'A': [], //Array
            'f': [], //function
            'D': [], //Date
            'nl': [], //null
            'v': [] //value就是值
        }
        for (var i = 0, len = arg.length; i < len; i++) {
            var ar = arg[i];
            if (typeof (ar) == 'number') {
                ret['n'].push(ar);
                ret['v'].push(ar);
            } else if (typeof (ar) == 'string') {
                ret['s'].push(ar);
                ret['v'].push(ar);
            } else if (typeof (ar) == 'boolean') {
                ret['b'].push(ar);
                ret['v'].push(ar);
            } else if (typeof (ar) == 'function') {
                ret['f'].push(ar);
            } else if (typeof (ar) == 'object') {
                if (ar) {
                    if (ar.constructor == Object) {
                        ret['o'].push(ar);
                        ret['O'].push(ar);
                    } else if (ar.constructor == Array) {
                        ret['o'].push(ar);
                        ret['A'].push(ar);
                    } else if (ar.constructor == Date) {
                        ret['D'].push(ar);
                    }
                } else {
                    ret['nl'].push(ar);
                    ret['v'].push(ar);
                }
            }
        }
        return ret;
    }
    var _thisApp = this;
    /**
     *字符串-去掉空白字符
     */
    this.trim = function (v) {
        if (typeof (v) == 'string')
            return v.replace(/(^\s*)|(\s*$)/g, '');

    };
    /**
     *字符串-去掉前空白字符
     */
    this.lTrim = function (v) {
        if (typeof (v) == 'string')
            return v.replace(/(^\s*)/g, "");
    }
    /**
     *字符串-去掉后空白字符
     */
    this.rTrim = function (v) {
        if (typeof (v) == 'string')
            return v.replace(/(\s*$)/g, "");
    }


    // 合并多个空白为一个空白    
    this.resetBlank = function (v) {
        if (typeof (v) == 'string') {
            var regEx = /\s+/g;
            return v.replace(regEx, ' ');
        }

    };
    //在字符串中 保留数字 
    this.getNum = function (v) {
        if (typeof (v) == 'string') {
            var regEx = /[^\d]/g;
            return v.replace(regEx, '');
        }

    };
    //在字符串中 保留整数 
    this.getInt = function (v) {
        if (typeof (v) == 'string') {
            var regEx = /[^\d|^\-]/g;
            return v.replace(regEx, '');
        }

    };
    // 在字符串中 保留数字   
    this.getFloat = function (v) {
        if (typeof (v) == 'string') {
            var regEx = /[^\d|^\.|^\-]/g;
            return v.replace(regEx, '');
        }

    };
    // 保留中文 
    this.getCN = function (v) {
        if (typeof (v) == 'string') {
            var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
            return v.replace(regEx, '');
        }
    };
    // String转化为Number  
    this.toInt = function (v) {
        if (typeof (v) == 'string')
            return isNaN(parseInt(v)) ? null : parseInt(v);
    };

    // 得到字节长度  
    this.getLen = function (v) {
        if (typeof (v) == 'string') {
            var regEx = /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/;
            if (regEx.test(v)) {
                return v.length * 2;
            } else {
                var oMatches = v.match(/[\x00-\xff]/g);
                var oLength = v.length * 2 - oMatches.length;
                return oLength;
            }
        }
    };
    // 得到字符窜长度  
    this.getCount = function (v, char) {
        if (typeof (v) == 'string') {
            var arr = [];
            if (char) {
                arr = v.split(char);
            } else {
                arr = v.split('');
            }
            return arr.length;
        }
    };

    // 获取文件全名  
    this.getFileName = function (v) {
        if (typeof (v) == 'string')
            var regEx = /^.*\/([^\/\?]*).*$/;
        return v.replace(regEx, '$1');
    };
    // 获取文件扩展名  
    this.getFileExt = function (v) {
        if (typeof (v) == 'string') {
            var regEx = /^.+\./;
            return v.replace(regEx, '');
        }
    };
    //获取URL路径的传递值
    this.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    //替换所有
    this.replaceAll = function (v, reallyDo, replaceWith, ignoreCase) {
        if (typeof (v) == 'string') {
            if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
                return v.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
            } else {
                return v.replace(reallyDo, replaceWith);
            }
        }
    };
    //字符串转为时间
    var toDate = function (v, t) {
        if (!v.constructor) {
            return null;
        }
        if (v.constructor == Date) {
            return v;
        } else if (v.constructor == Number) {
            t = 2;
        } else if (v.constructor == String) {
            if (/\([\d|\-]*\)/.test(v)) {
                t = 2;
                v = parseInt(this.getInt(v), 10);
            } else if (/^[+/-]?[\d]*$/.test(v)) {
                t = 2;
                v = parseInt(this.getInt(v), 10);
            }
        } else {
            return null;
        }
        t = t || 1; //
        if (t == 1) {
            v = v.replace(/[^\d|^\-|^\\|^:|^\.]/g, " ");
            v = v.replace(/-/g, "/").replace(/\s+/g," ");
            var date = new Date(v);
            if (!date.valueOf()) {
                var ay = v.split(/\-|\/|\s|:|\./g);//IE
                date = new Date(ay[0] || 0, ay[1] || 0, ay[2] || 0, ay[3] || 0, ay[4] || 0, ay[5] || 0, ay[6] || 0);
            }
            return date;
        } else {
            var date = new Date(v);
            return date;
        }
    };
    this.toDate = toDate;

    //含有该字符串的
    this.like = function (v, value) {
        if (typeof (v) == 'string') {
            var regAll = new RegExp('^%.*%$');
            var regLeft = new RegExp('^%.*');
            var regRight = new RegExp('.*%$');
            if (regAll.test(value)) {
                value = value.replace(/^%/, '').replace(/%$/, '');
                return this.isLike(v, value);
            } else if (regLeft.test(value)) {
                value = value.replace(/^%/, '');
                return this.isRightLike(v, value);
            } else if (regRight.test(value)) {
                value = value.replace(/%$/, '');
                return this.isLeftLike(v, value);
            } else {
                return this.isLike(v, value);
            }
        }
    };
    //是否有包含的字符串
    this.isLike = function (v, value) {
        if (typeof (v) == 'string') {
            var reg = new RegExp(value);
            if (reg.test(v)) {
                return true;
            } else {
                return false;
            }
        }
    };
    //是否有开始就包含的字符串
    this.isLeftLike = function (v, value) {
        if (typeof (v) == 'string') {
            var reg = new RegExp('^' + value);
            if (reg.test(v)) {
                return true;
            } else {
                return false;
            }
        }
    };
    //是否有结束就包含的字符串
    this.isRightLike = function (v, value) {
        if (typeof (v) == 'string') {
            var reg = new RegExp(value + '$');
            if (reg.test(v)) {
                return true;
            } else {
                return false;
            }
        }
    };
    //字符串千分符
    this.cuter = function (v, n) {
        if (typeof (v) == 'string' || typeof (v) == 'number') {
            if (n <= 0) {
                return v;
            }
            n = n || 3;
            var str = String(v);
            var strAry = str.split('.');
            var float = {
                pref: '',
                num: '',
                point: '',
                nextf: ''
            }
            if (strAry[1]) {
                float.point = '.';
                float.nextf = strAry[1];
            }
            float.pref = strAry[0].match(/^[+/-]/) || '';
            strAry[0] = strAry[0].replace(/^[+/-]/, '');
            var numAry = strAry[0].split('');
            var kn = [];
            var count = n;
            for (var i = numAry.length - 1; i > -1; i--) {
                kn.unshift(numAry[i]);
                count--;
                if (count == 0 && i > 0) {
                    kn.unshift(',');
                    count = n;
                }
            }
            float.num = kn.join('');
            return float.pref + float.num + float.point + float.nextf;
        }
    }
    //去掉所有的html标签
    this.xmlClear = function (v) {
        if (typeof (v) == 'string')
            return v.replace(/<\/?.+?>/g, "");
    }
    //求出相同字符的数量组
    this.sameCharNumber = function (v, s, n) {
        if (typeof (v) == 'string') {
            var reg = new RegExp();
            var ary = v.split(s);
            var isMeet = false;
            var retAry = [];
            for (var i = 1, len = ary.length; i < len; i++) {
                var a = ary[i];
                if (!isMeet) {
                    if (a == '') {
                        isMeet = true;
                    }
                    retAry.push(1);
                } else {
                    var maxSize = retAry.length - 1;
                    retAry[maxSize] = retAry[maxSize] + 1;
                    if (a != '') {
                        isMeet = false;
                    }
                }
            }
            if (n) {
                var retAryn = [];
                for (var i = 0, a; a = retAry[i++];) {
                    if (a >= n) {
                        retAryn.push(a);
                    }
                }
                retAry = retAryn;
            }
            return retAry;
        }
    }
    var guid = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
    //生成一个GUID
    this.guid = guid;
    //将汉字转为Unicode；
    this.toUnicode = function (v) {
        if (!v) return '';
        var str = '';
        for (var i = 0, len = v.length; i < len; i++) {
            str += "\\u" + parseInt(v[i].charCodeAt(0), 10).toString(16);
        }
        return str;
    }
    //将Unicode转为汉字；
    this.toHanzi = function (v) {
        if (!v) return '';
        v = v.split('\\u');
        var str = '';
        for (var i = 0, len = v.length; i < len; i++) {
            if (v[i]) {
                str += String.fromCharCode(parseInt(v[i], 16).toString(10));
            }
        }
        return str;
    }
    // 数字补零
    this.lenWithZero = function (v, oCount) {
        if (typeof (v) == 'number') {
            var strText = v.toString();
            while (strText.length < oCount) {
                strText = '0' + strText;
            }
            return strText;
        }
    };

    // Unicode还原  
    this.chrW = function (v) {
        if (typeof (v) == 'number')
            return String.fromCharCode(v);
    };

    // 百分号留后面几位 四舍五入法则
    this.percent = function (v, n) {
        if (typeof (v) == 'number') {
            return (v * 100).toFixed(n) + '%';
        }
    }
    //保留几位小数//相当于 toFixed
    this.decimal = function (v, n) {
        if (typeof (v) == 'number') {
            var f = v;
            var a = Math.pow(10, n);
            f = Math.round(f * a) / a;
            return f;
        }
    }
    //人民币符号或者货币符号
    this.RMB = function (v, Format, n, ct) {
        if (typeof (v) == 'number') {
            Format = Format || '￥';
            n = (n == undefined) ? 2 : n;
            ct = ct || 3;
            var number = v;
            var number = number.toFixed(n);
            var number = this.cuter(number, ct);
            return Format + number;
        }
    }
    //货币符号
    this.currency = function (v, Format, n, ct) {
        if (typeof (v) == 'number') {
            n = (n == undefined) ? 2 : n;
            ct = ct || 0;
            var number = v;
            var number = number.toFixed(n);
            var number = this.cuter(number, ct);
            return Format + number;
        }
    }
    // BMK千位缩写
    this.numShort = function (v, type, n, ct) {
        if (typeof (v) == 'number') {
            type = (type && type.toUpperCase()) || 'BMK';
            ct = ct || 3;
            n = n || 0;
            type = type.split('');
            var t = {
                T: 12,
                B: 9,
                M: 6,
                K: 3,
                Y: 8,
                W: 4
            };
            var v1 = String(v).split('.')[0];
            var rt = v;
            var w = "";
            for (var i = 0, iLen = type.length; i < iLen; i++) {
                var it = type[i];
                if (v1.length > t[it]) {
                    w = it;
                    rt = parseFloat(v / Math.pow(10, t[it]));
                    break;
                }
            }
            rt = rt.toFixed(n);
            rt = this.cuter(rt, ct) + w;
            return rt;
        }
    }

    // 获取当前时间的中文形式  
    this.getCNDate = function (v) {
        v = toDate(v);
        if (v) {
            var oDateText = '';
            oDateText += this.lenWithZero(v.getFullYear(), 4) + this.chrW(24180);
            oDateText += this.lenWithZero((v.getMonth() + 1), 2) + this.chrW(26376);
            oDateText += this.lenWithZero(v.getDate(), 2) + this.chrW(26085);
            oDateText += this.lenWithZero(v.getHours(), 2) + this.chrW(26102);
            oDateText += this.lenWithZero(v.getMinutes(), 2) + this.chrW(20998);
            oDateText += this.lenWithZero(v.getSeconds(), 2) + this.chrW(31186);
            oDateText += this.chrW(32) + this.chrW(32) + this.chrW(26143) + this.chrW(26399) + this.chrW(this.toInt(new String('26085199682010819977222352011620845').substr(v.getDay() * 5, 5)));
            return oDateText;
        }
    };
    this.duration = function (v, format, unit) {
        if (typeof (v) == 'number') {
            format = format || "hh:mm:ss";
            unit = unit || "s";
            var o = {
                "y+": 365 * 24 * 60 * 60 * 1000, //年份     
                "M+": 30 * 24 * 60 * 60 * 1000, //月份           
                "d+": 24 * 60 * 60 * 1000, //日           
                "h+": 60 * 60 * 1000, //小时           
                "H+": 60 * 60 * 1000, //小时
                "m+": 60 * 1000, //分           
                "s+": 1000, //秒
                "S": 1 //毫秒           
            };
            var yushu = v;
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(unit)) {
                    yushu = parseInt(yushu * o[k]);
                    break;
                }
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    var shang = parseInt(yushu / o[k]);
                    yushu = yushu % o[k];
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? shang : (("00" + String(shang)).substr(("" + String(shang)).length)));
                }
            }
            return format;
        }
    };
    //扩展Date格式化  date.Format('yyyy-MM-dd HH:mm:ss.S');
    this.format = function (v, format) {
        v = toDate(v);
        if (v) {
            var o = {
                "M+": v.getMonth() + 1, //月份           
                "d+": v.getDate(), //日           
                "h+": v.getHours() % 12 == 0 ? 12 : v.getHours() % 12, //小时           
                "H+": v.getHours(), //小时           
                "m+": v.getMinutes(), //分           
                "s+": v.getSeconds(), //秒           
                "q+": Math.floor((v.getMonth() + 3) / 3), //季度           
                "S": v.getMilliseconds() //毫秒           
            };
            var week = {
                "0": "\u65e5",
                "1": "\u4e00",
                "2": "\u4e8c",
                "3": "\u4e09",
                "4": "\u56db",
                "5": "\u4e94",
                "6": "\u516d"
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (v.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(format)) {
                format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[v.getDay() + ""]);
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return format;

        }
    }
    //将一个时间加 g.addDate(date,'m',30) 表示添加30分钟
    this.addDate = function (v, s, n) {
        v = toDate(v);
        if (v) {
            var t = new Date(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds());
            if (s == 's') {
                t.setSeconds(v.getSeconds() + n);
            } else if (s == 'm') {
                t.setMinutes(v.getMinutes() + n);
            } else if (s == 'h') {
                t.setHours(v.getHours() + n);
            } else if (s == 'd') {
                t.setDate(v.getDate() + n);
            } else if (s == 'M') {
                t.setMonth(v.getMonth() + n);
            } else if (s == 'y') {
                t.setFullYear(v.getFullYear() + n);
            } else if (s == 'S') {
                t.setMilliseconds(v.getMilliseconds() + n);
            } else {
                t.setDate(v.getDate() + n);
            }
            return t;
        }
    }
    //2个时间相差 date.Diff('y',date1)
    this.diff = function (v, interval, objDate) {
        //若参数不足或 objDate 不是日期类型則回传 undefined 
        v = toDate(v);
        objDate = toDate(objDate);
        if (!objDate || !v) {
            return undefined;
        }
        switch (interval) {
            //毫秒                                                          
            case 'S':
                return parseInt(objDate - v);
                //计算秒差                                                          
            case 's':
                return parseInt((objDate - v) / 1000);
                //计算分差  
            case 'm':
                return parseInt((objDate - v) / 60000);
                //计算時差  
            case 'h':
                return parseInt((objDate - v) / 3600000);
                //计算日差  
            case 'd':
                return parseInt((objDate - v) / 86400000);
                //计算周差  
            case 'w':
                return parseInt((objDate - v) / (86400000 * 7));
                //计算月差  
            case 'M':
                return (objDate.getMonth() + 1) + ((objDate.getFullYear() - v.getFullYear()) * 12) - (v.getMonth() + 1);
                //计算年差  
            case 'y':
                return objDate.getFullYear() - v.getFullYear();
                //输入有误  
            default:
                return undefined;
        }
    };

    //几毫秒钟前后
    this.addMilliseconds = function (v, n) {
        v = toDate(v);
        if (v) {
            v = new Date(v.valueOf());
            v.setMilliseconds(v.getMilliseconds() + n);
            return v;
        }

    }
    //几秒钟前后
    this.addSeconds = function (v, n) {
        v = toDate(v);
        if (v) {
            v = new Date(v.valueOf());
            v.setSeconds(v.getSeconds() + n);
            return v;
        }

    }
    //几分钟前后
    this.addMinutes = function (v, n) {
        v = toDate(v);
        if (v) {
            v = new Date(v.valueOf());
            v.setMinutes(v.getMinutes() + n);
            return v;
        }

    }
    //几小时前后
    this.addHours = function (v, n) {
        v = toDate(v);
        if (v) {   
            v = new Date(v.valueOf());
            v.setHours(v.getHours() + n);
            return v;
        }
    }
    //几日前后
    this.addDays = function (v, n) {
        v = toDate(v);
        if (v) {  
            v = new Date(v.valueOf());
            v.setDate(v.getDate() + n);
            return v;
        }

    }
    //几月前后
    this.addMonths = function (v, n) {
        v = toDate(v);
        if (v) {
            v = new Date(v.valueOf());
            v.setMonth(v.getMonth() + n);
            return v;           
        }
    }
    //几年前后
    this.addYears = function (v, n) {
        v = toDate(v);
        if (v) {
            v = new Date(v.valueOf());
            v.setFullYear(v.getFullYear() + n);
            return v;
        }
    }

    //根据日期判断周几 有5中格式CN-zhou，CN-xingqi，UK，UK-suoxie
    this.getWeek = function (v, Format) {
        v = toDate(v);
        if (v) {
            var weekDay = ["0", "1", "2", "3", "4", "5", "6"];
            switch (Format) {
                case 'CN-zhou':
                    weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                    break;
                case 'CN-xingqi':
                    weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                    break;
                case 'UK':
                    weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    break;
                case 'UK-suoxie':
                    weekDay = ["Sun.", "Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat."];
                    break;
                default:
                    weekDay = ["0", "1", "2", "3", "4", "5", "6"];
                    break;

            }
            var myDate = v;
            return weekDay[myDate.getDay()];
        }
    }

    //获得季度的开始月份
    this.getQuarterStartMonth = function (v) {
        v = toDate(v);
        if (v) {
            var Month = v.getMonth();
            if (Month <= 2) {
                return 1;
            } else if (Month <= 5) {
                return 4;
            } else if (Month <= 8) {
                return 7;
            } else {
                return 10;
            }
        }
    }

    //周日
    this.getWeekStartDate = function (v) {
        v = toDate(v);
        if (v) {           
            var dateDayOfWeek =v.getDay();
            return this.addDays(v, -dateDayOfWeek);
        }
    }

    //周六。本周一+6天
    this.getWeekEndDate = function (v) {
        v = toDate(v);
        if (v) {
            var t = this.getWeekStartDate(v);
            return this.addDays(t, 6);
        }
    }

    //月初
    this.getMonthStartDate = function (v) {
        v = toDate(v);
        if (v) {
            var nowYear = v.getFullYear();
            var nowMonth = v.getMonth();
            return new Date(nowYear, nowMonth, 1);
        }
    }
    //月末。下月初-1天
    this.getMonthEndDate = function (v) {
        v = toDate(v);
        if (v) {
            return this.addDays(this.addMonths(this.getMonthStartDate(v), 1), -1);
        }
    }
    //季度初
    this.getQuarterStartDate = function (v) {
        v = toDate(v);
        if (v) {
            var nowYear = v.getFullYear();
            return new Date(nowYear, this.getQuarterStartMonth(v) - 1, 1);
        }
    }
    //季度末。下季初-1天
    this.getQuarterEndDate = function (v) {
        v = toDate(v);
        if (v) {
            return this.addDays(this.addMonths(this.getQuarterStartDate(v), 3), -1);
        }
    }

    /*---------------------
       将cookie组格式与JSON格式相互转化
       ---------------------*/
    this.cookie2obj = function (v) {
        if (typeof (v) == 'string') {
            var cookieStr = v;
            var obj = {};
            var Array = cookieStr.split("&");
            for (var i = 0, len = Array.length; i < len; i++) {
                if (Array[i] != "" || Array[i].indexOf("=") < 0) {
                    var item = Array[i].split("=");
                    obj[item[0]] = item[1];
                }
            }
            return obj;
        }
    }
    this.obj2cookie = function (obj) {
        if (obj.constructor == Object) {
            var cssStr = '';
            for (var key in obj) {
                cssStr += key + '=' + obj[key] + '&';
            }
            return cssStr.substr(0, cssStr.length - 1);
        }
    }
    /*---------------------
       将css格式与JSON格式相互转化
       ---------------------*/
    this.css2obj = function (v) {
        if (typeof (v) == 'string') {
            var cssStr = v;
            var obj = {};
            var Array = cssStr.split(";");
            for (var i = 0, len = Array.length; i < len; i++) {
                if (Array[i] != "" || Array[i].indexOf(":") < 0) {
                    var item = Array[i].split(":");
                    obj[item[0]] = item[1];
                }
            }
            return obj;
        }
    }

    this.obj2css = function (obj) {
        if (obj.constructor == Object) {
            var cssStr = '';
            for (var key in obj) {
                cssStr += key + ':' + obj[key] + ';';
            }
            return cssStr;
        }
    }
    //将字符串转为对象 s1一级分隔符 s2是二级分隔符
    this.string2obj = function (s, s1, s2) {
        if (typeof (s) == 'string') {
            s1 = s1 || ';';
            s2 = s2 || '=';
            var objStr = s;
            var obj = {};
            var Array = objStr.split(s1);
            for (var i = 0, len = Array.length; i < len; i++) {
                if (Array[i] && Array[i].indexOf(s2) > -1) {
                    var item = Array[i].split(s2);
                    obj[item[0]] = item[1];
                }
            }
            return obj;
        }
    }
    //将对象转为字符串 s1一级分隔符 s2是二级分隔符
    this.obj2string = function (obj, s1, s2) {
        if (obj.constructor == Object) {
            s1 = s1 || ';';
            s2 = s2 || '=';
            var objStr = '';
            for (var key in obj) {
                if (typeof (obj[key]) == 'string' || typeof (obj[key]) == 'number' || typeof (obj[key]) == 'boolean') {
                    objStr += key + s2 + obj[key] + s1;
                }
            }
            var s2Len = s1.length;
            return objStr.substr(0, (objStr.length - s2Len));
        }
    }
    //Cookie设置
    this.Cookie = function (key, value, options) {
        if (!key) {
            return;
        }
        key = encodeURIComponent(key);
        var InitOptions = {
            expires: null,
            path: null,
            domain: null,
            secure: null
        }
        options = options || InitOptions;
        if (options) {
            if (options.expires) {
                if (options.expires.constructor == Date) {
                    options.expires = options.expires.toUTCString();
                } else if (typeof (options.expires) == 'number') {
                    //默认为天
                    options.expires = _thisApp.addDays(new Date(), options.expires)
                } else if (typeof (options.expires) == 'string') {
                    var s = options.expires.substring(options.expires.length - 1, options.expires.length);
                    var n = parseInt(options.expires.substring(0, options.expires.length - 1));
                    var format = '|y|M|d|h|m|s|S|';
                    if (format.indexOf('|' + s + '|') < 0) {
                        s = 'd';
                        n = parseInt(options.expires);
                    }
                    options.expires = _thisApp.addDate(new Date(), s, n);
                } else {
                    options.expires = null;
                }
                options.expires = options.expires ? options.expires.toUTCString() : null;
            }
        }
        var getCookie = function (InnerKey) {
            var cookies = document.cookie ? String(document.cookie) : '';
            var cookiesObj = _thisApp.string2obj(cookies, '; ', '=');
            if (cookiesObj[InnerKey]) {
                return decodeURIComponent(cookiesObj[InnerKey]);
            } else {
                return null;
            }
        }
        var setCookie = function (InnerKey, InnerValue, options) {
            InnerValue = InnerValue || '';
            var documentCookieStr = InnerKey + '=' + InnerValue + '; ' + _thisApp.obj2string(options, '; ', '=');
            document.cookie = documentCookieStr;
        }
        if (typeof (value) == 'undefined') { //获取Cookie          
            return getCookie(key);
        } else if (value == null) { //删除Cookie        
            setCookie(key, null, {
                expires: -1
            });
            return getCookie(key);
        } else if (value) { //设置Cookie        
            setCookie(key, encodeURIComponent(value), options);
            return getCookie(key);
        }
    }
    //对单个Obj处理
    var isEqualForSimple = function () {
        var arg = getArg(arguments);
        var o1 = arg["O"][0] || [];
        var o2 = arg["O"][1] || [];
        var field = arg["s"][0] || arg["A"][0] || null;
        if (field) {
            var fields = (field.constructor == Array) ? field : field.split(',');
            for (var i = 0, len = fields.length; i < len; i++) {
                if (o1[fields[i]] !== o2[fields[i]]) {
                    return false;
                }
            }
            return true;
        } else {
            if (Object.keys(o1).length !== Object.keys(o2).length) {
                return false;
            }
            for (var key in o1) {
                if (o1[key] !== o2[key]) {
                    return false;
                }
            }
            return true;
        }
    }
    this.isEqualForSimple = isEqualForSimple;
    //常用的对象对比
    this.isEqual = function () {
        var arg = getArg(arguments);
        var o1 = arg["o"][0] || [];
        var o2 = arg["o"][1] || [];
        if (!arg["o"].length) {
            return (o1 == o2);
        }
        var isEqualForInner = function (obj1, obj2) {
            var o1 = obj1 instanceof Object;
            var o2 = obj2 instanceof Object;
            if (!o1 || !o2) {
                return obj1 === obj2;
            }
            if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                return false;
            }
            for (var attr in obj1) {
                var t1 = obj1[attr] instanceof Object;
                var t2 = obj2[attr] instanceof Object;
                if (t1 && t2) {
                    return isEqualForInner(obj1[attr], obj2[attr]);
                } else if (obj1[attr] !== obj2[attr]) {
                    return false;
                }
            }
            return true;
        }
        return isEqualForInner(o1, o2);
    }
    //对象扩展
    this.extend = function () {
        var args = arguments,
            isDeep = false;
        if (!args || !args.length) return;
        //第一个参数是为boolean或number，且真时为深度继承
        if (typeof args[0] == 'boolean' || typeof args[0] == 'number') {
            isDeep = !!args[0];
            Array.prototype.shift.call(args);
        }
        if (!args[0].constructor == Array && !args[0].constructor == Object) return args[0];
        var newobj = args[0];
        for (var i = 1, l = args.length; i < l; i++) {
            var obj = args[i];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (isDeep === true && !!obj[prop] && typeof obj[prop] === 'object') {
                        newobj[prop] = this.extend(true, (obj[prop].constructor == Array) ? [] : {}, newobj[prop], obj[prop]);
                    } else {
                        newobj[prop] = obj[prop];
                    }
                }
            }
        }
        return newobj;
    }

    //复制
    var clone = function (sObj) {
        if (typeof (sObj) != "object") {
            return sObj;
        }
        if (!sObj) {
            return null;
        }
        var s = {};
        try {
            if (sObj.constructor == Array) {
                s = [];
            }
        } catch (e) {
            s = null;
        }
        for (var i in sObj) {
            s[i] = clone(sObj[i]);
        }
        return s;
    }

    //清理对象某些比如null，undefined，"",函数
    var clearCertain = function (sObj, ary) {
        ary = ary || [null, undefined, ""];
        var judge = function (v) {
            var re = false;
            var t = v;
            if (typeof (t) == "function") {
                t = Function;
            } else if (typeof (t) == "object") {
                if (t) {
                    if (t.constructor == Object) {
                        t = Object;
                    } else {
                        t = Array;
                    }
                }
            } else if (typeof (t) == "string") {
                t = String;
            } else if (typeof (t) == "number") {
                t = Number;
            } else if (typeof (t) == "boolean") {
                t = Boolean;
            } else if (typeof (t) == "undefined") {
                t = Undefined;
            }
            for (var i = 0, len = ary.length; i < len; i++) {
                if (t == ary[i] || (v == ary[i] && typeof (v) == typeof (ary[i]))) {

                    re = true;
                    break;
                }
            }
            return re;
        }
        var ergodic = function (obj) {
            for (var key in obj) {
                if (judge(obj[key])) {
                    delete obj[key];
                } else {
                    (typeof (obj[key]) == "object") && ergodic(obj[key]);
                }
            }
        }
        ergodic(sObj);
        return sObj;
    }
    this.clearCertain = clearCertain;

    //----主要是针对对象数组-----------------------------------------------------------
    // 数字数组由小到大排序  
    this.min2max = function () {
        var arg = getArg(arguments);
        var v = arg["A"][0] || [];
        if (v.constructor == Array) {
            var oValue;
            for (var i = 0, len = v.length; i < len; i++) {
                for (var j = 0; j <= i; j++) {
                    if (v[i] < v[j]) {
                        oValue = v[i];
                        v[i] = v[j];
                        v[j] = oValue;
                    }
                }
            }
            return v;
        }
    };
    // 数字数组由大到小排序  
    this.max2min = function () {
        var arg = getArg(arguments);
        var v = arg["A"][0] || [];
        if (v.constructor == Array) {
            var oValue;
            for (var i = 0, len = v.length; i < len; i++) {
                for (var j = 0; j <= i; j++) {
                    if (v[i] > v[j]) {
                        oValue = v[i];
                        v[i] = v[j];
                        v[j] = oValue;
                    }
                }
            }
            return v;
        }
    };
    /** 
     * 扩展基础类 
     * 数组最大值 
     **/
    this.max = function () {
        var arg = getArg(arguments);
        var v = arg["A"][0] || [];
        var field = arg["s"][0] || null;
        if (v.constructor == Array) {
            var result = null;
            if (v.length == 0) {
                return result;
            } else {
                result = field ? v[0][field] : v[0];
            }
            for (var i = 0, len = v.length; i < len; i++) {
                var a = v[i];
                var val = field ? a[field] : a;
                if (val > result)
                    result = val;
            }
            return result;
        }
    }
    /** 
     * 扩展基础类 
     * 数组最小值 
     **/
    this.min = function () {
        var arg = getArg(arguments);
        var v = arg["A"][0] || [];
        var field = arg["s"][0] || null;
        if (v.constructor == Array) {
            var result = null;
            if (v.length == 0) {
                return result;
            } else {
                result = field ? v[0][field] : v[0];
            }
            for (var i = 0, len = v.length; i < len; i++) {
                var a = v[i];
                var val = field ? a[field] : a;
                if (val < result)
                    result = val;
            }
            return result;
        }
    }
    // JSON数组按某个字段排序    
    var sortByCon = function (filed, rev, primer) {
        rev = (rev) ? -1 : 1;
        primer = primer || 'string';
        primer = primer.toLowerCase();
        return function (a, b) {
            a = a[filed];
            b = b[filed];
            if (primer == 'string') {
                a = String(a);
                b = String(b);
                return rev * a.localeCompare(b);
            } else if (primer == 'number') {
                a = parseFloat(a);
                if (isNaN(a)) {
                    a = Number.MIN_VALUE;
                }
                b = parseFloat(b);
                if (isNaN(b)) {
                    b = Number.MIN_VALUE;
                }
                if (a < b) {
                    return rev * -1;
                }
                if (a > b) {
                    return rev * 1;
                }
                return 1;
            } else {
                return 1;
            }
        }
    };

    // JSON数组按某个字段排序       
    this.sortBy = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var filed = arg["s"][0] || null;
        var primer = arg["s"][1] || null;
        var rev = arg["b"][0] || false;
        if (o.constructor == Array) {
            if (filed) {
                var ret = o.sort(sortByCon(filed, rev, primer));
                return ret;
            } else {
                return o;
            }

        }

    };
    //去掉指点字段重复的
    this.removeRepeatAttr = function () {
        var arg = getArg(arguments);
        var json = arg["A"][0] || [];
        var field = arg["s"][0] || arg["A"][1] || null;

        if (json.constructor == Array) {
            var tmp = [],
                b = [];
            if (field) {
                var fields = (field.constructor == Array) ? field : field.split(',');
                if (fields.length > 1) {

                    for (var i = 0, len = json.length; i < len; i++) {
                        var idx = this.index(tmp, function (it) {
                            var ret = true;
                            for (var j = 0, jLen = fields.length; j < jLen; j++) {
                                var key = fields[j];
                                if (it[key] != json[i][key]) {
                                    ret = false;
                                    break;
                                }
                            }
                            return ret;
                        });
                        if (idx < 0) {
                            b.push(json[i]);
                            tmp.push(json[i]);
                        }

                    }
                } else {
                    for (var i = 0, len = json.length; i < len; i++) {
                        if (this.index(tmp, json[i][field]) < 0) {
                            b.push(json[i]);
                            tmp.push(json[i][field]);
                        }
                    }
                }
            } else {
                for (var i = 0, len = json.length; i < len; i++) {
                    if (this.index(tmp, json[i]) < 0) {
                        b.push(json[i]);
                        tmp.push(json[i]);
                    }
                }
            }
            return b;
        }
    }
    //
    //根据判定求个数
    this.count = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || function () {
            return true;
        };
        var param = arg["O"][0] || {};
        if (o.constructor == Array) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                var count = 0;
                for (var i = 0, a; a = o[i++];) {
                    if (eval(judge)) {
                        count++;
                    }
                }
                return count;
            } else if (judge.constructor == Function) {
                var count = 0;
                for (var i = 0, a; a = o[i++];) {
                    if (judge(a)) {
                        count++;
                    }
                }
                return count;
            }
        }
    }
    //根据组合操作
    this.group = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["s"][0] || arg["A"][1] || null;
        var judge = arg["f"][0] || function () {};
        if (o.constructor == Array) {
            var tmp = {};
            var ret = [];
            if (field) {
                var fields = (field.constructor == Array) ? field : field.split(',');
                var getItem = function (item) {
                    var ret = {};
                    for (var j = 0, jLen = fields.length; j < jLen; j++) {
                        var key = fields[j];
                        ret[key] = item[key];
                    }
                    return ret;
                }
                var getKey = function (item) {
                    var ret = "";
                    for (var j = 0, jLen = fields.length; j < jLen; j++) {
                        var key = fields[j];
                        var itemKey = item[key] == null ? "" : item[key];
                        ret += "_" + itemKey;
                    }
                    return ret;
                }
                for (var i = 0, len = o.length; i < len; i++) {
                    var item = o[i];
                    var key = getKey(item);
                    if (tmp[key]) {
                        tmp[key].data.push(item);
                    } else {
                        tmp[key] = {
                            item: getItem(item),
                            data: [item]
                        };
                    }
                }
                for (var key in tmp) {
                    judge(tmp[key].item, tmp[key].data);
                    ret.push(tmp[key].item);
                }
                return ret;
            }
        }
    }
    //行转列
    this.pivot = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["A"][1] || arg["s"][0] || null;
        var row = arg["s"][0] || null;
        var col = arg["s"][1] || null;
        var sp = arg["A"][2] || arg["s"][2] || null;
        if (typeof (field) == 'string') {
            row = arg["s"][1] || null;
            col = arg["s"][2] || null;
            sp = arg["s"][3] || null;
        }
        if (o.constructor == Array) {
            var tmp = {};
            var ret = [];
            if (field) {
                var fields = (field.constructor == Array) ? field : field.split(',');
                var sps = typeof (sp) == 'string' ? sp.split(',') : sp; //特定的行转为列
                var getItem = function (item) {
                    var ret = {};
                    for (var j = 0, jLen = fields.length; j < jLen; j++) {
                        var key = fields[j];
                        ret[key] = item[key];
                    }
                    return ret;
                }
                var getKey = function (item) {
                    var ret = "";
                    for (var j = 0, jLen = fields.length; j < jLen; j++) {
                        var key = fields[j];
                        var itemKey = item[key] == null ? "" : item[key];
                        ret += "_" + itemKey;
                    }
                    return ret;
                }
                for (var i = 0, len = o.length; i < len; i++) {
                    var item = o[i];
                    var key = getKey(item);
                    if (tmp[key]) {
                        tmp[key].data.push(item);
                    } else {
                        tmp[key] = {
                            item: getItem(item),
                            data: [item]
                        };
                    }
                }
                if (!sp) {
                    for (var key in tmp) {
                        var data = tmp[key].data;
                        var item = tmp[key].item;
                        for (var k in data) {
                            var itm = data[k];
                            item[itm[row]] = itm[col];
                        }
                        ret.push(item);
                    }
                } else {
                    for (var key in tmp) {
                        var data = tmp[key].data;
                        var item = tmp[key].item;
                        for (var k in data) {
                            var itm = data[k];
                            var itemKey = itm[row];
                            if (this.index(sps, itemKey) > -1) {
                                item[itemKey] = itm[col];
                            }
                        }
                        ret.push(item);
                    }
                }
                return ret;
            }
        }
    }
    //列转行
    this.unpivot = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["A"][1] || arg["s"][0] || null;
        var row = arg["s"][0] || null;
        var col = arg["s"][1] || null;
        var sp = arg["A"][2] || arg["s"][2] || null;
        if (typeof (field) == 'string') {
            row = arg["s"][1] || null;
            col = arg["s"][2] || null;
            sp = arg["s"][3] || null;
        }
        if (o.constructor == Array) {
            var ret = [];
            if (field) {
                var fields = (field.constructor == Array) ? field : field.split(',');
                var sps = typeof (sp) == 'string' ? sp.split(',') : sp; //特定的列转为行
                var getItem = function (item) {
                    var ret = {};
                    for (var j = 0, jLen = fields.length; j < jLen; j++) {
                        var key = fields[j];
                        ret[key] = item[key];
                    }
                    return ret;
                }
                if (!sps) {
                    for (var i = 0, len = o.length; i < len; i++) {
                        var item = o[i];
                        for (var key in item) {
                            if (this.index(fields, key) < 0) {
                                var itm = getItem(item);
                                itm[row] = key;
                                itm[col] = item[key];
                                ret.push(itm);
                            }
                        }
                    }
                } else {
                    for (var i = 0, len = o.length; i < len; i++) {
                        var item = o[i];
                        for (var key in item) {
                            if (this.index(fields, key) < 0 && g.index(sps, key) > -1) {
                                var itm = getItem(item);
                                itm[row] = key;
                                itm[col] = item[key];
                                ret.push(itm);
                            }
                        }
                    }
                }
                return ret;
            }
        }
    }
    //转为节点结构
    this.tranTreeData = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var idStr = arg["s"][0] || 'id';
        var pidStr = arg["s"][1] || 'pid';
        var childrenStr = arg["s"][2] || 'children';

        var a = clone(o);
        var r = [],
            hash = {},
            id = idStr,
            pid = pidStr,
            children = childrenStr,
            i = 0,
            j = 0,
            len = a.length;
        for (; i < len; i++) {
            hash[a[i][id]] = a[i];
        }
        for (; j < len; j++) {
            var aVal = a[j],
                hashVP = hash[aVal[pid]];
            if (hashVP) {
                !hashVP[children] && (hashVP[children] = []);
                hashVP[children].push(aVal);
            } else {
                r.push(aVal);
            }
        }
        return r;
    }
    //数据转为对象
    this.toHash = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || {};
        var field = arg["s"][0] || null;
        if (o.constructor == Array && field) {
            var hash = {};
            for (var i = 0, a; a = o[i++];) {
                hash[a[field]] = a;
            }
            return hash;
        }
    }
    //根据判定查询数据
    this.query = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var param = arg["O"][0] || {};
        if (o.constructor == Array && judge) {
            o = clone(o);
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                var n = [];
                for (var i = 0, a; a = o[i++];) {
                    if (eval(judge)) {
                        n.push(a);
                    }
                }
                return n;
            } else if (judge.constructor == Function) {
                var n = [];
                for (var i = 0, a; a = o[i++];) {
                    if (judge(a)) {
                        n.push(a);
                    }
                }
                return n;
            }
        }
    }
    //删除指定的列
    this.clearColumn = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["s"][0] || arg["A"][1] || null;
        if (o.constructor == Array && field) {
            if (!field) {
                return null;
            } else {
                o = clone(o);
                var fields = (field.constructor == Array) ? field : field.split(',');
                for (var i = 0, a; a = o[i++];) {
                    for (var j = 0, jLen = fields.length; j < jLen; j++) {
                        delete a[fields[j]];
                    }
                }
                return o;
            }
        }
    }
    //获取指定的列
    this.retainColumn = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["s"][0] || arg["A"][1] || null;
        if (o.constructor == Array && field) {
            if (!field) {
                return null;
            } else {
                var fields = (field.constructor == Array) ? field : field.split(',');
                var n = [];
                for (var i = 0, a; a = o[i++];) {
                    var jIt = {};
                    for (var j = 0, jLen = fields.length; j < jLen; j++) {
                        jIt[fields[j]] = a[fields[j]];
                    }
                    n.push(jIt);
                }
                return n;
            }
        }
    }
    //转为数组中的数组   
    this.changeToArrays = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["s"][0] || arg["A"][1] || null;
        if (o.constructor == Array) {
            if (field) {
                var obj = {};
                var fields = (field.constructor == Array) ? field : field.split(',');
                for (var i = 0, b; b = fields[i++];) {
                    obj[b] = [];
                }
                for (var i = 0, a; a = o[i++];) {
                    for (var j = 0, b; b = fields[j++];) {
                        obj[b].push(a[b]);
                    }
                }
                if (typeof (field) == 'string') {
                    if (fields.length == 1) {
                        return obj[field];
                    } else {
                        return obj;
                    }
                } else {
                    return obj;
                }
            }
        }
    };

    //根据判定删除数据 返回的是去掉的部分
    this.removed = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var param = arg["O"][0] || {};
        if (o.constructor == Array && judge) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                var re = [];
                for (var i = 0, a; a = o[i++];) {
                    if (eval(judge)) {
                        re.push(o.splice(--i, 1)[0]);
                    }
                }
                return re;
            } else if (judge.constructor == Function) {
                var re = [];
                for (var i = 0, a; a = o[i++];) {
                    if (judge(a)) {
                        re.push(o.splice(--i, 1)[0]);
                    }
                }
                return re;
            }

        }

    }
    //根据判定保留数据 返回的是不保留的部分
    this.remain = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var param = arg["O"][0] || {};
        if (o.constructor == Array && judge) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                var re = [];
                for (var i = 0, a; a = o[i++];) {
                    if (!eval(judge)) {
                        re.push(o.splice(--i, 1)[0]);
                    }
                }
                return re;
            } else if (judge.constructor == Function) {
                var re = [];
                for (var i = 0, a; a = o[i++];) {
                    if (!judge(a)) {
                        re.push(o.splice(--i, 1)[0]);
                    }
                }
                return re;
            }
        }

    }

    //根据判定位置之前插入数据 返回新数组
    this.preInsert = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var row = arg["O"][0] || null;
        var param = arg["O"][1] || {};
        if (o.constructor == Array && row && judge) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                for (var i = 0, a; a = o[i++];) {
                    if (eval(judge)) {
                        o.splice(i - 1, 0, row);
                        i++;
                    }
                }
                return o;
            } else if (judge.constructor == Function) {
                for (var i = 0, a; a = o[i++];) {
                    if (judge(a)) {
                        o.splice(i - 1, 0, row);
                        i++;
                    }
                }
                return o;
            }
        }
    }
    //根据判定位置之后插入数据
    this.apInsert = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var row = arg["O"][0] || null;
        var param = arg["O"][1] || {};
        if (o.constructor == Array && row && judge) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                for (var i = 0, a; a = o[i++];) {
                    if (eval(judge)) {
                        o.splice(i, 0, row);
                        i++;
                    }
                }
                return o;
            } else if (judge.constructor == Function) {
                for (var i = 0, a; a = o[i++];) {
                    if (judge(a)) {
                        o.splice(i, 0, row);
                        i++;
                    }
                }
                return o;
            }
        }
    }
    //根据判定位置之前插入数据
    this.preInserts = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var rows = arg["A"][1] || null;
        var param = arg["O"][0] || {};
        if (o.constructor == Array && rows && judge) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                for (var i = 0, a; a = o[i++];) {
                    if (eval(judge)) {
                        for (var j = 0, b; b = rows[j++];) {
                            o.splice(i - 1, 0, b);
                            i++;
                        }
                    }
                }
                return o;
            } else if (judge.constructor == Function) {
                for (var i = 0, a; a = o[i++];) {
                    if (judge(a)) {
                        for (var j = 0, b; b = rows[j++];) {
                            o.splice(i - 1, 0, b);
                            i++;
                        }
                    }
                }
                return o;
            }
        }

    }
    //根据判定位置之后插入数据
    this.apInserts = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var rows = arg["A"][1] || null;
        var param = arg["O"][0] || {};
        if (o.constructor == Array && rows && judge) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');

                for (var i = 0, a; a = o[i++];) {
                    if (eval(judge)) {
                        for (var j = 0, b; b = rows[j++];) {
                            o.splice(i, 0, b);
                            i++;
                        }
                    }
                }
                return o;
            } else if (judge.constructor == Function) {
                for (var i = 0, a; a = o[i++];) {
                    if (judge(a)) {
                        for (var j = 0, b; b = rows[j++];) {
                            o.splice(i, 0, b);
                            i++;
                        }
                    }
                }
                return o;
            }
        }

    }
    //根据判定修改数据
    this.config = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || function () {
            return false;
        };
        var set = arg["s"][1] || "";
        var param = arg["O"][0] || {};

        if (o.constructor == Array) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                set = set.replace(/\*./g, 'a.');
                set = set.replace(/@/g, 'param.');
                set = set.replace(/param.param./g, '@');
                for (var i = 0, a; a = o[i++];) {
                    if (eval(judge)) {
                        eval(set);
                    }
                }
                return o;
            } else if (judge.constructor == Function) {
                for (var i = 0, a; a = o[i++];) {
                    judge(a)
                }
                return o;
            }
        }
    }
    //将json分页求第一页的数据
    this.page = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var pageIndex = arg["n"][0] || 1;
        var pageSize = arg["n"][1] || 10;
        if (o.constructor == Array) {
            o = clone(o);
            var re = [];
            var st = (pageIndex - 1) * pageSize;
            var ed = st + pageSize;
            for (var i = st; i < ed; i++) {
                if (o[i] != undefined) {
                    re.push(o[i]);
                } else {}
            }
            return re;

        }
    }
    //取json数组判断之前的数据包括本身 返回后半部分
    this.prepart = function () {
        var arg = getArg(arguments);
        var obj = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var param = arg["O"][0] || {};
        if (obj.constructor == Array && judge) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                var o = clone(obj);
                for (var i = 0, a, len = o.length; a = o[i++];) {
                    if (eval(judge)) {
                        o.splice(i, len);
                        break;
                    }
                }
                return o;
            } else if (judge.constructor == Function) {
                var o = clone(obj);
                for (var i = 0, a, len = o.length; a = o[i++];) {
                    if (judge(a)) {
                        o.splice(i, len);
                        break;
                    }
                }
                return o;
            }
        }
    }
    //取json数组判断之后的数据包括本身 返回前半部分
    this.appart = function () {
        var arg = getArg(arguments);
        var obj = arg["A"][0] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var param = arg["O"][0] || {};
        if (obj.constructor == Array && judge) {
            if (judge.constructor == String) {
                judge = judge.replace(/\*./g, 'a.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                var o = clone(obj);
                for (var i = 0, a; a = o[i++];) {
                    if (eval(judge)) {
                        o.splice(0, i - 1);
                        break;
                    }
                }
                return o;
            } else if (judge.constructor == Function) {
                var o = clone(obj);
                for (var i = 0, a; a = o[i++];) {
                    if (judge(a)) {
                        o.splice(0, i - 1);
                        break;
                    }
                }
                return o;
            }
        }
    }
    // 获得数字数组中最大项  
    this.getMaxRow = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["s"][0] || null;
        if (o.constructor = Array && field) {
            if (o.length == 0) {
                return null;
            } else {
                var oValue = parseFloat(o[0][field]);
                var obj = o[0];
                for (var i = 0, a; a = o[i++];) {
                    var a_f = parseFloat(a[field]);
                    if (a_f > oValue) {
                        oValue = a_f;
                        obj = a;
                    }
                }
                return clone(obj);
            }
        }
    };
    // 获得数字数组中最小项  
    this.getMinRow = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["s"][0] || null;
        if (o.constructor = Array && field) {
            if (o.length == 0) {
                return null;
            } else {
                var oValue = parseFloat(o[0][field]);
                var obj = o[0];
                for (var i = 0, a; a = o[i++];) {
                    var a_f = parseFloat(a[field]);
                    if (a_f < oValue) {
                        oValue = a_f;
                        obj = a;
                    }
                }
                return clone(obj);
            }
        }
    };
    //将字段求和
    this.sum = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["s"][0] || arg["A"][1] || null;
        if (o.constructor == Array) {
            if (field) {
                var obj = {};
                var fields = (field.constructor == Array) ? field : field.split(',');
                for (var i = 0, b; b = fields[i++];) {
                    obj[b] = 0;
                }
                for (var i = 0, a; a = o[i++];) {
                    for (var j = 0, b; b = fields[j++];) {
                        obj[b] += parseFloat(a[b]) || 0;
                    }
                }
                return obj;
            } else {
                var obj = 0;
                for (var i = 0, len = o.length; i < len; i++) {
                    obj += (o[i] ? o[i] : 0);
                }
                return obj;
            }
        }
    };
    //将字段求平均
    this.avg = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var field = arg["s"][0] || arg["A"][1] || null;
        if (o.constructor == Array) {
            var count = o.length;
            if (count != 0) {
                if (field) {
                    var obj = this.sum(o, field);
                    for (var key in obj) {
                        obj[key] = obj[key] / count;
                    }
                    return obj;
                } else {
                    return (this.sum(o) / count);
                }
            } else {
                return null;
            }
        }
    };
    // 获得数字的位置 
    this.index = function () {
        var arg = getArg(arguments);
        var obj = arg["A"][0] || [];
        var field = arg["f"][0] || arg["s"][0] || null;
        var v = typeof (arg['v'][1]) != undefined ? arg['v'][1] : null;

        if (typeof (field) == 'function') {} else {
            if (arg['v'].length == 1) {
                v = arg['v'][0];
                field = null;
            } else {
                if (arg['v'][0] == null) {
                    field = null;
                    v = arg['v'][1];
                } else {
                    v = arg['v'][1];
                }
            }
        }
        if (obj.constructor == Array) {
            var idx = -1;
            if (field == null) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    if (obj[i] == v) {
                        idx = i;
                        break;
                    }
                }
            } else {
                if (typeof (field) == 'function') {
                    for (var i = 0, len = obj.length; i < len; i++) {
                        if (field(obj[i])) {
                            idx = i;
                            break;
                        }
                    }
                } else {
                    for (var i = 0, a; a = obj[i++];) {
                        if (a[field] == v) {
                            idx = i - 1;
                            break;
                        }
                    }
                }

            }
            return idx;
        }
    };
    //数组复制
    this.Copy = clone;
    //将数据乱序
    this.shuffle = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var a = clone(o);
        var len = a.length;
        var len_1 = len - 1;
        for (var i = 0; i < len_1; i++) {
            var index = parseInt(Math.random() * (len - i));
            var temp = a[index];
            a[index] = a[len_1 - i];
            a[len_1 - i] = temp;
        }
        return a;
    }
    //将数据置空
    this.clear = function () {
        var arg = getArg(arguments);
        for (var i = 0, a; a = arg["A"][i++];) {
            var o = a || [];
            o.length = 0;
        }
        return [];
    }
    /** * 扩展基础类     * 数组添加数组 **/
    this.merge = function () {
        var arg = getArg(arguments);
        var o = [];
        for (var j = 0, jLen = arg["o"].length; j < jLen; j++) {
            var arr = arg["o"][j];
            if (arr.constructor == Array) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    o.push(arr[i]);
                }
            } else if (arr.constructor != Array) {
                o.push(arr);
            }
        }
        return clone(o);
    }
    //两个数组的交集就是相同属性的取出来
    this.intersection = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var o1 = arg["A"][1] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var param = arg["O"][0] || {};
        if (o.constructor == Array && o1.constructor == Array) {
            judge = judge || {};
            if (judge.constructor == String) {
                judge = judge.replace(/\*0./g, 'a.');
                judge = judge.replace(/\*1./g, 'b.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                var IST = [];
                for (var i = 0, a, iLen = o.length; a = o[i++];) {
                    for (var j = 0, b, jLen = o1.length; b = o1[j++];) {
                        if (eval(judge)) {
                            IST.push(a);
                            break;
                        }
                    }
                }
                return clone(IST);
            } else if (judge.constructor == Function) {
                var IST = [];
                for (var i = 0, a, iLen = o.length; a = o[i++];) {
                    for (var j = 0, b, jLen = o1.length; b = o1[j++];) {
                        if (judge(a, b)) {
                            IST.push(a);
                            break;
                        }
                    }
                }
                return clone(IST);
            } else if (judge.constructor == Object) {
                var IST = [];
                for (var i = 0, a, iLen = o.length; a = o[i++];) {
                    for (var j = 0, b, jLen = o1.length; b = o1[j++];) {
                        if (isEqualForSimple(a, b)) {
                            IST.push(a);
                            break;
                        }
                    }
                }
                return clone(IST);
            }
        }

    }
    //第一个数组减去属性相同第二个数组
    this.subtract = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var o1 = arg["A"][1] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var param = arg["O"][0] || {};
        if (o.constructor == Array && o1.constructor == Array) {
            judge = judge || {};
            if (judge.constructor == String) {
                judge = judge.replace(/\*0./g, 'a.');
                judge = judge.replace(/\*1./g, 'b.');
                judge = judge.replace(/@/g, 'param.');
                judge = judge.replace(/param.param./g, '@');
                var sTt = [];
                for (var i = 0, a, iLen = o.length; a = o[i++];) {
                    var isHave = false;
                    for (var j = 0, b, jLen = o1.length; b = o1[j++];) {
                        if (eval(judge)) {
                            isHave = true;
                            break;
                        }
                    }
                    if (!isHave) {
                        sTt.push(a);
                    }
                }
                return clone(sTt);
            } else if (judge.constructor == Function) {
                var sTt = [];
                for (var i = 0, a, iLen = o.length; a = o[i++];) {
                    var isHave = false;
                    for (var j = 0, b, jLen = o1.length; b = o1[j++];) {
                        if (judge(a, b)) {
                            isHave = true;
                            break;
                        }
                    }
                    if (!isHave) {
                        sTt.push(a);
                    }
                }
                return clone(sTt);
            } else if (judge.constructor == Object) {
                var sTt = [];
                for (var i = 0, a, iLen = o.length; a = o[i++];) {
                    var isHave = false;
                    for (var j = 0, b, jLen = o1.length; b = o1[j++];) {
                        if (isEqualForSimple(a, b)) {
                            isHave = true;
                            break;
                        }
                    }
                    if (!isHave) {
                        sTt.push(a);
                    }
                }
                return clone(sTt);
            }
        }
    }
    //第一个数组与第二个数组合并起来属性不相同合并
    this.union = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var o1 = arg["A"][1] || [];
        var judge = arg["f"][0] || arg["s"][0] || null;
        var param = arg["O"][0] || {};

        if (o.constructor == Array && o1.constructor == Array) {
            judge = judge || {};
            if (judge.constructor == String) {
                var uNn = [];
                var oFb = clone(o);
                var sTt = _thisApp.subtract(o1, o, judge, param);
                uNn = _thisApp.merge(oFb, sTt);
                return clone(uNn);
            } else if (judge.constructor == Function) {
                var uNn = [];
                var oFb = clone(o);
                var sTt = _thisApp.subtract(o1, o, judge);
                uNn = _thisApp.merge(oFb, sTt);
                return clone(uNn);
            } else if (judge.constructor == Object) {
                var uNn = [];
                var oFb = clone(o);
                var sTt = _thisApp.subtract(o1, o, judge);
                uNn = _thisApp.merge(oFb, sTt);
                return clone(uNn);
            }
        }
    }
    //两个数据是不是一样
    this.isSameCollect = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var o1 = arg["A"][1] || [];
        var field = arg["s"][0] || arg["A"][2] || null;
        if (o.constructor == Array && o1.constructor == Array) {
            field = field || null;
            var ret1 = [];
            var ret2 = [];
            if (o.length !== o1.length) {
                return false;
            }
            for (var i = 0, a; a = o[i++];) {
                ret1.push(i - 1);
                for (var j = 0, b; b = o1[j++];) {
                    if (_thisApp.index(ret2, (j - 1)) > -1) {
                        continue;
                    }
                    if (isEqualForSimple(a, b, field)) {
                        ret2.push(j - 1);
                        break;
                    }
                }
                if (ret1.length !== ret2.length) {
                    return false;

                }
            }
            return true;
        }
    }
    //是否是它的部分集合
    this.isPartSet = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var o1 = arg["A"][1] || [];
        var field = arg["s"][0] || arg["A"][2] || null;
        if (o.constructor == Array && o1.constructor == Array) {
            field = field || null;
            var ret1 = [];
            var ret2 = [];
            if (o.length < o1.length) {
                return false;
            }
            for (var i = 0, a; a = o[i++];) {
                for (var j = 0, b; b = o1[j++];) {

                    if (_thisApp.index(ret2, (j - 1)) > -1) {
                        continue;
                    }
                    if (isEqualForSimple(a, b, field)) {
                        ret2.push(j - 1);
                        break;
                    }
                }
            }
            if (ret2.length == o1.length) {
                return true;
            } else {
                return false;
            }

        }
    }
    //是否是它的子集
    this.isSubset = function () {
        var arg = getArg(arguments);
        var o = arg["A"][0] || [];
        var o1 = arg["A"][1] || [];
        var field = arg["s"][0] || arg["A"][2] || null;
        if (o.constructor == Array && o1.constructor == Array) {
            field = field || null;
            var ret1 = [];
            for (var i = 0, a; a = o1[i++];) {
                for (var j = 0, b; b = o[j++];) {
                    if (isEqualForSimple(a, b, field)) {
                        ret1.push(i - 1);
                        break;
                    }
                }
            }
            if (ret1.length !== o1.length) {
                return false;
            }
            return true;
        }
    }
    //对json树的操作
    function tree() {
        if (this.constructor != tree) {
            return new tree();
        }
        var _thisTree = this;
        //树的遍历
        var traver = function (signtree, childrenStr, beferoFn, afterFn) {
            var children = childrenStr;
            var type = 1; //1表示数组，2表示对象，0表示其他
            if (signtree.constructor == Array) {
                type = 1;
            } else if (signtree.constructor == Object) {
                type = 2;
                signtree = [signtree];
            } else {
                type = 0;
                return signtree;
            }
            var traversing = function (signtree, parent) {
                for (var i = 0, len = signtree.length; i < len; i++) {
                    var item = signtree[i];
                    var param = {
                        i: i,
                        len: len,
                        signtree: signtree,
                        parent: parent,
                        type: 0
                    };
                    var re = beferoFn && beferoFn(item, param); //type:0表示没有，1表示continue;2表示break;
                    if (re) {
                        i = re.i;
                        len = re.len;
                        if (re.type == 0) {} else if (re.type = 1) {
                            continue;
                        } else if (re.type = 2) {
                            break;
                        }
                    }
                    item[children] && traversing(item[children], item);
                    var re = afterFn && afterFn(item, param);
                    if (re) {
                        i = re.i;
                        len = re.len;
                        if (re.type == 0) {} else if (re.type = 1) {
                            continue;
                        } else if (re.type = 2) {
                            break;
                        }
                    }
                }
            }
            traversing(signtree, null);
            signtree = type == 2 ? (signtree[0] || null) : signtree;
            return signtree;
        }
        this.traver = traver;
        //将table形成转为tree
        this.toTree = function () {
            var arg = getArg(arguments);
            var o = arg["A"][0] || [];
            var childrenStr = arg["s"][0] || null;
            var idStr = arg["s"][1] || null;
            var pidStr = arg["s"][2] || null;

            var a = clone(o);
            var r = [],
                hash = {},
                id = (idStr || '_ID'),
                pid = (pidStr || '_PID'),
                children = childrenStr || 'children',
                i = 0,
                j = 0,
                len = a.length;
            for (; i < len; i++) {
                hash[a[i][id]] = a[i];
            }
            for (; j < len; j++) {
                var aVal = a[j],
                    hashVP = hash[aVal[pid]];
                if (hashVP) {
                    !hashVP[children] && (hashVP[children] = []);
                    hashVP[children].push(aVal);
                } else {
                    r.push(aVal);
                }
            }
            this.toSigntree(r, childrenStr, null);
            return r;
        }
        //将tree转为table形式
        this.toTable = function () {
            var arg = getArg(arguments);
            var treeData = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || null;

            var hash = this.toHash(treeData, childrenStr);
            ret = [];
            for (var key in hash) {
                if (hash[key]['_ID']) {
                    ret.push(hash[key]);
                }
            }
            return ret;
        }
        //将tree转为hash形式
        this.toHash = function () {
            var arg = getArg(arguments);
            var treeData = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var isReservedChild = arg["b"][0] || false;
            var children = childrenStr;
            var treeData = clone(treeData);
            var signtree = this.toSigntree(treeData, childrenStr, null);
            var hash = {};
            traver(signtree, children, function (item) {
                hash[item["_ID"]] = item;
            }, function (item) {
                if (!isReservedChild && hash[item["_ID"]][children]) {
                    hash[item["_ID"]][children] = [];
                }
            });
            return hash;
        }
        //将tree转为hash形式
        this.toHashMap = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var children = childrenStr;
            var hash = {};
            traver(signtree, children, function (item) {
                hash[item["_ID"]] = item;
            });
            return hash;
        }
        //*标志返回快速查询对象*/
        this.toSigntree = function () {
            var arg = getArg(arguments);
            var treeData = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var _PID = arg["n"][0] || arg["s"][1] || null;
            var isNew = arg["b"][0] || false;

            var children = childrenStr;
            var newGuid = function (v) {
                if (isNew) {
                    return guid();
                } else {
                    if (v) {
                        return v;
                    } else {
                        return guid();
                    }
                }
            }
            traver(treeData, children, function (item, pm) {
                item["_PID"] = pm.parent && pm.parent["_ID"] || _PID;
                item["_ID"] = newGuid(item["_ID"]);
            });
            return treeData;
        };
        //重新设置层次
        this.resetSigntreeLevel = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            return traver(signtree, childrenStr, function (item, pm) {
                item["_Lev"] = pm.parent && (pm.parent["_Lev"] + 1) || 0;
            });
        }
        /**修改节点 */
        this.updateNodes = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var judge = arg["f"][0] || function () {
                return false;
            };
            return traver(signtree, childrenStr, function (item) {
                judge(item);
            });
        }
        this.updateChilds = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var signnode = arg["o"][1] || arg["s"][0] || null;
            var childrenStr = arg["s"][1] || arg["s"][0] || 'children';
            var judge = arg["f"][0] || function () {
                return false;
            };
            signnode = _thisTree.getSigntree(signtree, childrenStr, signnode);
            traver(signnode, childrenStr, function (item) {
                judge(item);
            });
            return signtree;
        }
        this.updateParents = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var signnode = arg["o"][1] || arg["s"][0] || null;
            var childrenStr = arg["s"][1] || arg["s"][0] || 'children';
            var judge = arg["f"][0] || function () {
                return false;
            };
            var hashmap = _thisTree.toHashMap(signtree, childrenStr);
            if (typeof (signnode) == "string") {
                signnode = hashmap[signnode];
            }
            var _PIDs = [];
            var pNode = {
                "_ID": signnode["_ID"],
                "_PID": signnode["_PID"]
            };
            for (var a = true; a;) {
                _PIDs.push(pNode["_ID"]);
                pNode = _thisTree.parent(signtree, childrenStr, pNode);
                if (!pNode) {
                    break;
                }
            }
            for (var i = 0, len = _PIDs.length; i < len; i++) {
                judge(hashmap[_PIDs[i]]);
            }
            return signtree;
        }
        /**删除节点 */
        this.deleteNodes = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var judge = arg["f"][0] || function () {
                return false;
            };

            return traver(signtree, childrenStr, function (item, pm) {
                if (judge(item)) {
                    pm.signtree.splice(pm.i, 1);
                    pm.i--;
                    pm.len--;
                    pm.type = 1;
                    return pm;
                }
            });
        }
        /**插入节点之后插入 */
        var insertNodesAfter = function (signtree, childrenStr, node, judge, isNew) {

            isNew = isNew || false;
            return traver(signtree, childrenStr, function (item, pm) {
                if (judge(item)) {
                    node = _thisTree.toSigntree(clone(node), childrenStr, item["_PID"], isNew);
                    if (node.constructor == Object) {
                        pm.signtree.splice(pm.i + 1, 0, node);
                        pm.i++;
                        pm.len++;

                    } else if (node.constructor == Array) {
                        for (var j = 0, jLen = node.length; j < jLen; j++) {
                            pm.signtree.splice(pm.i + 1, 0, node[j]);
                            pm.i++;
                            pm.len++;
                        }
                    }
                    return pm;
                }
            });
        }
        this.insertNodesAfter = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var node = arg["o"][1] || null;
            var judge = arg["f"][0] || function () {
                return false;
            };
            var isNew = (arg["b"][0] != false) ? true : false;
            if (!node) {
                return signtree;
            }
            return insertNodesAfter(signtree, childrenStr, node, judge, isNew);
        }
        var insertNodesBefore = function (signtree, childrenStr, node, judge, isNew) {
            return traver(signtree, childrenStr, function (item, pm) {
                if (judge(item)) {
                    node = _thisTree.toSigntree(clone(node), childrenStr, item["_PID"], isNew);
                    if (node.constructor == Object) {
                        pm.signtree.splice(pm.i, 0, node);
                        pm.i++;
                        pm.len++;

                    } else if (node.constructor == Array) {
                        for (var j = 0, jLen = node.length; j < jLen; j++) {
                            pm.signtree.splice(pm.i, 0, node[j]);
                            pm.i++;
                            pm.len++;
                        }
                    }
                    return pm;
                }
            });
        }
        /**插入节点之后插入 */
        this.insertNodesBefore = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var node = arg["o"][1] || null;
            var judge = arg["f"][0] || function () {
                return false;
            };
            var isNew = arg["b"][0] || true;
            if (!node) {
                return signtree;
            }
            return insertNodesBefore(signtree, childrenStr, node, judge, isNew);
        }
        var insertChildNodes = function (signtree, childrenStr, node, judge, index, isNew) {
            isNew = isNew || false;
            index = (index == undefined || index == null) ? -1 : index;
            var children = childrenStr;
            return traver(signtree, childrenStr, function (item, pm) {
                if (judge(item)) {
                    item[children] = item[children] || [];
                    node = _thisTree.toSigntree(clone(node), children, item["_ID"], isNew);
                    if (node.constructor == Object) {
                        if (index == -1) {
                            item[children].push(node);
                        } else {
                            item[children].splice(index, 0, node);
                        }

                    } else if (node.constructor == Array) {
                        if (index == -1) {
                            for (var j = 0, jLen = node.length; j < jLen; j++) {
                                item[children].push(node);
                            }
                        } else {
                            for (var j = 0, jLen = node.length; j < jLen; j++) {
                                item[children].splice(index, 0, node[j]);
                                index++;
                            }

                        }
                    }
                    pm.type = 2;
                    return pm;
                }

            });
        }
        /**插入节点子节点某个位置插入   */
        this.insertChildNodes = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var node = arg["o"][1] || null;
            var judge = arg["f"][0] || function () {
                return false;
            };
            var index = arg["n"][0] || -1;
            var isNew = (arg["b"][0] != false) ? true : false;
            if (!node) {
                return signtree;
            }
            return insertChildNodes(signtree, childrenStr, node, judge, index, isNew);
        }
        //获取树中的一个分支树
        this.getSigntree = function (signtree, childrenStr, signnode) {

            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var signnode = arg["o"][1] || arg["s"][1] || null;

            if (typeof (signnode) == 'string') {
                signnode = {
                    _ID: signnode
                };
            }
            var childTreeData = null;
            traver(signtree, childrenStr, function (item, pm) {
                if (item["_ID"] == signnode["_ID"]) {
                    childTreeData = item;
                    pm.type = 2;
                    return pm;
                }
            });
            return childTreeData;
        }
        //根据条件获取节点集合
        this.queryNodes = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var judge = arg["f"][0] || function () {
                return false;
            };

            var hash = this.toHash(signtree, childrenStr);
            ret = [];
            for (var key in hash) {
                if (hash[key]['_ID']) {
                    if (judge(hash[key])) {
                        ret.push(hash[key]);
                    }
                }
            }
            return ret;
        }
        //获取一个树的深度
        this.getLevelCount = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var max = -1;
            traver(signtree, childrenStr, function (item, pm) {
                item["_Lev"] = pm.parent && (pm.parent["_Lev"] + 1) || 0;
                if (item["_Lev"] > max) {
                    max = item["_Lev"];
                }
            });
            return max + 1;
        }
        //获取n层级的数组
        this.getLevelNodes = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var index = arg["n"][0] == undefined ? -1 : arg["n"][0];
            var levelCount = this.getLevelCount(signtree, childrenStr);
            var ret = [];
            if (index == -1) {
                for (var i = 0, len = levelCount; i < len; i++) {
                    var rt = this.queryNodes(signtree, childrenStr, function (it) {
                        if (it["_Lev"] == i) {
                            return true;
                        }
                    });
                    ret.push(rt);
                }
            } else {
                ret = this.queryNodes(signtree, childrenStr, function (it) {
                    if (it["_Lev"] == index) {
                        return true;
                    }
                });
            }
            return ret;
        }

        /*获取父节点*/
        this.parent = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var node = arg["o"][1] || arg["s"][1] || null;

            var hashSigntree = null;
            if (signtree.constructor == Object) {
                hashSigntree = signtree;
            } else if (signtree.constructor == Array) {
                hashSigntree = _thisTree.toHash(signtree, childrenStr);
            } else {
                return null;
            }
            if (typeof (node) == 'string') {
                node = hashSigntree[node];
            }
            return hashSigntree[node["_PID"]] || null;
        }
        //根据节点求出所有的父节点包括自己
        this.parents = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var node = arg["o"][1] || arg["s"][1] || null;
            var hashSigntree = null;
            if (signtree.constructor == Object) {
                hashSigntree = signtree;
            } else if (signtree.constructor == Array) {
                hashSigntree = _thisTree.toHash(signtree, childrenStr);
            } else {
                return null;
            }
            if (typeof (node) == 'string') {
                node = hashSigntree[node];
            }
            var ret = [];
            var currentNode = node;
            while (currentNode) {
                ret.unshift(currentNode);
                currentNode = _thisTree.parent(hashSigntree, childrenStr, currentNode);
            }
            return ret;
        }
        /*获取子节点*/
        this.children = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var node = arg["o"][1] || arg["s"][1] || null;
            var hashSigntree = null;
            if (signtree.constructor == Object) {
                hashSigntree = signtree;
            } else if (signtree.constructor == Array) {
                hashSigntree = _thisTree.toHash(signtree, childrenStr);
            } else {
                return null;
            }
            if (typeof (node) == 'string') {
                node = hashSigntree[node];
            }
            var chld = [];
            for (var key in hashSigntree) {
                if (hashSigntree[key]["_PID"] == node["_ID"]) {
                    chld.push(hashSigntree[key]);
                }
            }
            return chld;
        }
        /*获取相邻下一个节点*/
        this.next = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var node = arg["o"][1] || arg["s"][1] || null;
            var hashSigntree = null;
            if (signtree.constructor == Object) {
                hashSigntree = signtree;
            } else if (signtree.constructor == Array) {
                hashSigntree = _thisTree.toHash(signtree, childrenStr);
            } else {
                return null;
            }
            if (typeof (node) == 'string') {
                node = hashSigntree[node];
            }
            var next = null;
            var isPs = false;
            for (var key in hashSigntree) {
                if (hashSigntree[key]["_PID"] == node["_PID"]) {
                    if (hashSigntree[key]["_ID"] == node["_ID"]) {
                        isPs = true;
                    } else {
                        if (isPs) {
                            next = hashSigntree[key];
                            break;
                        }
                    }
                }
            }
            return next;
        }
        /*获取相邻上一个节点*/
        this.prev = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var node = arg["o"][1] || arg["s"][1] || null;
            var hashSigntree = null;
            if (signtree.constructor == Object) {
                hashSigntree = signtree;
            } else if (signtree.constructor == Array) {
                hashSigntree = _thisTree.toHash(signtree, childrenStr);
            } else {
                return null;
            }
            if (typeof (node) == 'string') {
                node = hashSigntree[node];
            }
            var prev = null;
            var isPs = false;
            for (var key in hashSigntree) {
                if (hashSigntree[key]["_PID"] == node["_PID"]) {
                    if (hashSigntree[key]["_ID"] == node["_ID"]) {
                        isPs = true;
                        break;
                    }
                    prev = hashSigntree[key];
                }
            }
            return prev;
        }
        //根据_ID获取signnode
        this.getNode = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var _ID = arg["s"][1] || null;
            var hashSigntree = null;
            if (signtree.constructor == Object) {
                hashSigntree = signtree;
            } else if (signtree.constructor == Array) {
                hashSigntree = _thisTree.toHash(signtree, childrenStr);
            } else {
                return null;
            }
            return hashSigntree[_ID] || null;
        }



        //移动节点 type表示-1目标节点之前 1表示节点之后 0表示子节点
        this.moveNode = function (signtree, childrenStr, startNode, targetNode, type, index) {
            type = (type == null || type == undefined) ? -1 : type;
            index = (index == undefined || index == null) ? -1 : index;
            var hashSigntree = _thisTree.toHash(signtree, childrenStr, true);
            if (typeof (startNode) == 'string') {
                startNode = {
                    _ID: startNode
                };
            }
            if (typeof (targetNode) == 'string') {
                targetNode = {
                    _ID: targetNode
                };
            }
            if (startNode["_ID"] == targetNode["_ID"]) {
                return signtree;
            }
            startNode = hashSigntree[startNode["_ID"]];
            targetNode = hashSigntree[targetNode["_ID"]];
            _thisTree.deleteNodes(signtree, childrenStr, function (it) {
                if (it["_ID"] == startNode["_ID"]) {
                    return true;
                }
            });
            if (type == -1) {
                _thisTree.insertNodesBefore(signtree, childrenStr, startNode, function (it) {
                    if (it["_ID"] == targetNode["_ID"]) {
                        return true;
                    }
                }, false);
            } else if (type == 0) {
                _thisTree.insertChildNodes(signtree, childrenStr, startNode, function (it) {
                    if (it["_ID"] == targetNode["_ID"]) {
                        return true;
                    }
                }, index, false);
            } else if (type == 1) {
                _thisTree.insertNodesAfter(signtree, childrenStr, startNode, function (it) {
                    if (it["_ID"] == targetNode["_ID"]) {
                        return true;
                    }
                }, false);
            }
            return signtree;
        }
        this.moveNodeBefore = function (signtree, childrenStr, startNode, targetNode) {
            return _thisTree.moveNode(signtree, childrenStr, startNode, targetNode, -1);
        }
        this.moveNodeAfter = function (signtree, childrenStr, startNode, targetNode) {
            return _thisTree.moveNode(signtree, childrenStr, startNode, targetNode, 1);
        }
        this.moveNodeChild = function (signtree, childrenStr, startNode, targetNode, index) {
            return _thisTree.moveNode(signtree, childrenStr, startNode, targetNode, 0, index);
        }
        this.isHave = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var judge = arg["f"][0] || function () {
                return false;
            };

            var ret = false;
            traver(signtree, childrenStr, function (item, pm) {
                if (judge(item)) {
                    ret = true;
                    pm.type = 2;
                    return pm;
                }
            });
            return ret;
        }
        /**根据条件查询*/
        this.query = function () {
            var arg = getArg(arguments);
            var signtree = arg["o"][0] || [];
            var childrenStr = arg["s"][0] || 'children';
            var isChildNode = (arg["b"][0] == false) ? false : true;
            var judge = arg["f"][0] || function () {
                return false;
            };
            var ret = clone(signtree);
            traver(ret, childrenStr, function (item, pm) {
                if (!_thisTree.isHave(item, childrenStr, judge)) {
                    pm.signtree.splice(pm.i, 1);
                    pm.i--;
                    pm.len--;
                    pm.type = 1;
                    return pm;
                }
                if (isChildNode && judge(item)) {
                    pm.type = 1;
                    return pm;
                }

            });
            return ret;
        }
    }
    this.T = this.tree = new tree(); //T是简写; 

    function MD5() {
        if (this.constructor != MD5) {
            return new MD5();
        }
        'use strict';
        var hex_chr = "0123456789abcdef";

        function rhex(num) {
            var str = '';
            for (var j = 0; j <= 3; j++) str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((num >> (j * 8)) & 0x0F);
            return str;
        }

        function str2blks_MD5(str) {
            var i;
            var nblk = ((str.length + 8) >> 6) + 1;
            var blks = new Array(nblk * 16);
            for (i = 0; i < nblk * 16; i++) blks[i] = 0;
            for (i = 0; i < str.length; i++) blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
            blks[i >> 2] |= 0x80 << ((i % 4) * 8);
            blks[nblk * 16 - 2] = str.length * 8;
            return blks;
        }

        function add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        function rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        function cmn(q, a, b, x, s, t) {
            return add(rol(add(add(a, q), add(x, t)), s), b);
        }

        function ff(a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function gg(a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function hh(a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function ii(a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }
        this.encryp = function (str) {
            var x = str2blks_MD5(str);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = ff(c, d, a, b, x[i + 10], 17, -42063);
                b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = hh(a, b, c, d, x[i + 5], 4, -378558);
                d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = add(a, olda);
                b = add(b, oldb);
                c = add(c, oldc);
                d = add(d, oldd);
            }
            return rhex(a) + rhex(b) + rhex(c) + rhex(d);
        }
    }
    this.MD5 = new MD5();
    this.encrypMD5 = this.MD5.encryp;
    //字符转义
    this.Escaping = function (v, t, pn) {
        v = v || '';
        t = t.toLowerCase() || 'html';
        pn = pn || false;
        if (t == 'html') {
            return this.htmlEscaping(v, pn);
        }
    }
    //html字符转义
    this.htmlEscaping = function (v, pn) {
        v = v || '';
        pn = pn || false;
        var strs, ToStrs;
        if (!pn) {
            strs = ['"', '&', '<', '>'];
            ToStrs = ['&#34;', '&#38;', '&#60;', '&#62;'];
        } else {
            strs = ['&#34;', '&#38;', '&#60;', '&#62;'];
            ToStrs = ['"', '&', '<', '>'];
        }
        for (var i = 0, len = strs.length; i < len; i++) {
            var reg = new RegExp(strs[i], "g");
            v = v.replace(reg, ToStrs[i]);
        }
        return v;
    }

    function Base64() {
        if (this.constructor != Base64) {
            return new Base64();
        }
        // private property
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        // public method for encoding
        var encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }
        this.encode = encode;
        // public method for decoding
        var decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }
        this.decode = decode;
        // private method for UTF-8 encoding
        var _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }
        // private method for UTF-8 decoding
        var _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }
    this.Base64 = new Base64();


    //同步异步出发相关方法

    //计数完成触发器 
    this.counter = function () {
        var arg = getArg(arguments);
        var n = arg['n'][0];
        var backcall = arg['f'][0];
        _thisApp.counter20190531 = 0;

        function callback(parm) {
            _thisApp.counter20190531++;
            if (_thisApp.counter20190531 >= n) {
                backcall(parm);
            }
        }
        return callback;
    }

}
var g = new UtilHelpApp20190531();
var  UtilHelpApp = new UtilHelpApp20190531();