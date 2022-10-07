(function ($) {


    //插件书写部分

    var webTool = {};

    /**
     * 下划线转换驼峰
     * @param value
     * @returns {*|{by}|{dist}|string|void}
     */
    webTool.toHump = function (value) {
        return value.replace(/\_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
    };

    /**
     * 驼峰转换下划线
     * @param value
     * @returns {string}
     */
    webTool.toLine = function (value) {
        return value.replace(/([A-Z])/g, "_$1").toLowerCase();
    };

    /**
     * 删除所有HTML标签
     * @param tab
     * @returns {*|{by}|{dist}|string|void}
     */
    webTool.removeHtmlTab = function (tab) {
        return tab.replace(/<[^<>]+?>/g, '');
    };

    /**
     * 普通字符转换成转意符
     * @param sHtml
     * @returns {*|{by}|{dist}|string|void}
     */
    webTool.html2Escape = function (sHtml) {
        return sHtml.replace(/[<>&"]/g, function (c) {
            return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'}[c];
        });
    };

    /**
     * 转意符换成普通字符
     * @param str
     * @returns {*|{by}|{dist}|string|void}
     */
    webTool.escape2Html = function (str) {
        var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
            return arrEntities[t];
        });
    };

    /**
     *&nbsp;转成空格
     * @param str
     * @returns {*|{by}|{dist}|string|void}
     */
    webTool.nbsp2Space = function (str) {
        var arrEntities = {'nbsp': ' '};
        return str.replace(/&(nbsp);/ig, function (all, t) {
            return arrEntities[t];
        });
    };

    /**
     * 高级转换
     * @param text
     * @param t
     * @returns {string|*}
     */
    webTool.html2string = function (text,t) {
        var split1 = text.split("\n");
        var qualifier = "";
        var appendChar = "+=";
        var valChar = "str";
        switch(t){
            case "java":
                qualifier = "String "+valChar;
                break;
            case "js":
                qualifier = "var "+valChar;
                break;
            case "php":
                qualifier = "$"+valChar;
                valChar = "$"+valChar;
                appendChar = ".=";
                break;
            case "net":
                qualifier = "string "+valChar;
                break;
            case "py":
                text = valChar+"= '''\n"+text+"\n'''";
                return text;
        }
        text = qualifier+" = \"\";\n";
        for(var i=0;i<split1.length;i++) {
            var str = split1[i];
            text += (valChar+" "+appendChar+" \""+str.replace(/"/g,"\\\"")+"\";\n");
        }
        return text;
    } ;

    window.webTool = webTool;

})(jQuery);