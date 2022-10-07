<!-- 引入bootstrap样式 -->
document.writeln(" <link href='../../assembly/plugins/bootstrap/bootstrap-table/css/bootstrap.css ' rel='stylesheet'> ");
document.writeln(" <link href='../../assembly/plugins/bootstrap/bootstrap-table/css/bootstrap-theme.css ' rel='stylesheet'> ");
<!-- 引入bootstrap-table样式 -->
document.writeln(" <link href='../../assembly/plugins/bootstrap/bootstrap-table/css/bootstrap-table.css ' rel='stylesheet'> ");
<!-- jquery -->
document.writeln("<script src='../../assembly/plugins/jquery/core/jquery-1.9.1.js'></script>");
document.writeln("<script src='../../assembly/plugins/bootstrap/bootstrap-table/js/bootstrap.js'></script>");
<!-- bootstrap-table.js -->
document.writeln("<script src='../../assembly/plugins/bootstrap/bootstrap-table/js/bootstrap-table.js'></script>");
<!-- 引入中文语言包 -->
document.writeln("<script src='../../assembly/plugins/bootstrap/bootstrap-table/locale/bootstrap-table-zh-CN.js'></script>");
<!-- x-editable bootstrap3-editable -->
document.writeln(" <link href='../../assembly/plugins/x-editable/bootstrap3-editable/css/bootstrap-editable.css ' rel='stylesheet'> ");
document.writeln("<script src='../../assembly/plugins/x-editable/bootstrap3-editable/js/bootstrap-editable.js'></script>");
document.writeln("<script src='../../assembly/plugins/x-editable/bootstrap3-editable/js/bootstrap-table-editable.js'></script>");

<!-- bootstrap-switch -->
document.writeln(" <link href='../../assembly/plugins/bootstrap/bootstrap-switch/static/stylesheets/bootstrap-switch.css ' rel='stylesheet'> ");
document.writeln("<script src='../../assembly/plugins/bootstrap/bootstrap-switch/static/js/bootstrap-switch.js'></script>");
<!-- bootstrap-timepicker -->
document.writeln(" <link href='../../assembly/plugins/bootstrap/bootstrap-timepicker/css/bootstrap-timepicker.min.css ' rel='stylesheet'> ");
document.writeln("<script src='../../assembly/plugins/bootstrap/bootstrap-timepicker/js/bootstrap-timepicker.min.js'></script>");
<!-- bootstrap-datetimepicker 日期组件 -->
document.writeln(" <link href='../../assembly/plugins/bootstrap/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css ' rel='stylesheet'> ");
document.writeln("<script src='../../assembly/plugins/bootstrap/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js'></script>");
document.writeln("<script src='../../assembly/plugins/bootstrap/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js'></script>");

<!-- bootstrap-treeview -->
document.writeln(" <link href='../../assembly/plugins/bootstrap/bootstrap-treeview/bootstrap-treeview.min.css ' rel='stylesheet'> ");
document.writeln("<script src='../../assembly/plugins/bootstrap/bootstrap-treeview/bootstrap-treeview.min.js'></script>");

<!-- select2 -->
document.writeln(" <link href='../../assembly/plugins/jquery/select2/select2.css ' rel='stylesheet'> ");
document.writeln(" <link href='../../assembly/plugins/jquery/select2/select2-bootstrap.css ' rel='stylesheet'> ");
document.writeln("<script src='../../assembly/plugins/jquery/select2/select2.js'></script>");
document.writeln("<script src='../../assembly/plugins/jquery/select2/select2_locale_zh-CN.js'></script>");
<!-- jquery validation -->
document.writeln("<script src='../../assembly/plugins/jquery/jquery-validation-1.17.0/dist/jquery.validate.js'></script>");
document.writeln("<script src='../../assembly/plugins/jquery/jquery-validation-1.17.0/dist/localization/messages_zh.js'></script>");

<!-- 图标组件 -->
document.writeln(" <link href='../../assembly/plugins/bootstrap/font-awesome-4.7.0/css/font-awesome.css ' rel='stylesheet'> ");
document.writeln(" <link href='../../assembly/plugins/jsonedit/jsonedit.css' rel='stylesheet'> ");
document.writeln("<script src='../../assembly/plugins/jsonedit/jsonedit.js'></script>");
<!-- 公共js -->
document.writeln("<script src='../../assembly/js/common/common.js'></script>");
document.writeln("<script src='../../assembly/plugins/message/bootbox.js'></script>");

document.writeln(" <link href='resources/css/jquery.scrollbar.min.css ' rel='stylesheet'> ");
document.writeln("<script src='resources/js/jquery.scrollbar.min.js'></script>");

document.writeln("<script src='resources/js/jsoneditor.min.js'></script>");
document.writeln(" <link href='resources/css/jsoneditor.min.css ' rel='stylesheet'> ");

document.writeln("<script src='resources/js/webTool.js'></script>");

<!-- 选项卡js -->
// document.writeln(" <link href='resources/tab/css/nth.tabs.min.css' rel='stylesheet'> ");
// document.writeln("<script src='resources/tab/js/nth.tabs.min.js'></script>");

// document.writeln("<script src='resources/js/include.js'></script>");
document.writeln("<script src='resources/js/htmlformat.js'></script>");
document.writeln("<script src='resources/js/jsformat.js'></script>");


/**
 * 驼峰和下划线的处理
 * @param _this
 * @param param
 */
function toHumpAndToLine(_this, param) {
    var form = $(_this).closest("form");
    var data = formSerializeArray(form);
    var value = null;
    if (param == 'line') {
        value = webTool.toLine(data.humpToLine);
    }
    if (param == 'hump') {
        value = webTool.toHump(data.humpToLine);
    }
    form.find("textarea[name=humpToLineValue]").val(value);
}

/**
 * html和js相互转换
 * @param _this
 * @param param
 */
function toHtmlJavascript(_this, param) {
    var form = $(_this).closest("form");
    var data = formSerializeArray(form);
    var value = "";
    var input = data.htmlJavascript;
    if (!input) {
        return false;
    }
    if (param == 'html') {
        var res = input.replace(/document.writeln\("/g, "").replace(/"\);/g, "").replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\");
        value = res;
    }
    if (param == 'js') {
        value = webTool.html2string(input, "js");
        var res = "document.writeln(\"" + input.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n').join("\");\ndocument.writeln(\"") + "\");";
    }
    form.find("textarea[name=htmlJavascriptValue]").val(value);
}

function toUpperLowerHandle(_this, param) {
    var form = $(_this).closest("form");
    var data = formSerializeArray(form);
    var value = "";
    var input = data.UpperLower;
    if (!input) {
        return false;
    }
    if (param == 'Upper') {
        value = input.toUpperCase();
    }
    if (param == 'Lower') {
        value = input.toLowerCase();
    }
    if (param == 'firstUpper') {
        value = input.replace(input[0], input[0].toUpperCase());
    }
    if (param == 'firstLower') {
        value = input.replace(input[0], input[0].toLowerCase());
    }
    if (param == 'sentence') {
        var a = input.split(' ');
        for (var i = 0; i < a.length; i++) {
            //首字母大写
            //var str1=a[i].slice(0,1).toUpperCase();
            var str1 = a[i].substring(0, 1).toUpperCase();
            //其余字母小写
            //var str2=a[i].slice(1).toLowerCase();
            var str2 = a[i].substring(1).toLowerCase();
            //字符串拼接后，把转换结果替换之前的
            a[i] = str1 + str2;
        }
        value = a.join(' ');
    }
    form.find("textarea[name=UpperLowertValue]").val(value);
}

function toBinaryHandle(_this, param) {
    var form = $(_this).closest("form");
    var data = formSerializeArray(form);
    var value = "";
    var input = data.binary;
    if (!input) {
        return false;
    }
    if (param == '2') {
        value = input.charCodeAt().toString(2);
    }
    if (param == '2') {
        value = input.charCodeAt().toString(2);
    }
    if (param == '8-10') {
        value = parseInt(input, 8);
    }
    if (param == '10-8') {
        value = parseInt(input).toString(8);
    }
    if (param == '8-2') {
        value = parseInt(input, 8).toString(2);
    }
    if (param == '2-8') {
        value = parseInt(input, 2).toString(8);
    }
    if (param == '16-10') {
        value = parseInt(input, 16);
    }
    if (param == '10-16') {
        value = parseInt(input).toString(16);
    }
    form.find("textarea[name=binaryValue]").val(value);
}

function formatCode(_this) {
    var form = $(_this).closest("form");
    var data = formSerializeArray(form);
    var value = "";
    var input = data.code;
    var tabSize = data.tabSize;
    var tabChar = ' ';
    if (!input) {
        return false;
    }
    if (tabSize == 1) {
        tabChar = '\t';
    }
    var js_source = data.code.replace(/^\s+/, '');
    if (js_source && js_source.charAt(0) === '<') {
        value = style_html(js_source, tabSize, tabChar, 80);
    } else {
        value = js_beautify(js_source, tabSize, tabChar);
    }
    form.find("textarea[name=code]").val(value);
}


function json_formatCode(_this) {

    var form = $(_this).closest("form");
    var data = formSerializeArray(form);

// create the editor
    var container1 = document.getElementById('jsoneditor1');
    var container2 = document.getElementById('jsoneditor2');

    var optionsOutput1 = {
        mode : 'code',
        error : function(err) {
            alert('EF1 ->' + err.toString());
        }
    };

    var optionsOutput2 = {
        mode : 'tree',
        modes : [ 'view', 'form', 'text','code', 'tree'], // allowed modes
        error : function(err) {
            alert('EF1 ->' + err.toString());
        }
    };

    var json = data.code ;

    var editor1 = new JSONEditor(container1, optionsOutput1, json);
    var editor2 = new JSONEditor(container2, optionsOutput2, json);

    try {

        var jsonStr = editor1.getText();

        var jsonObject = JSON.parse(jsonStr);
        editor1.setMode("code");
        editor1.setText(JSON.stringify(jsonObject, null, 2));


        editor2.setText(JSON.stringify(jsonObject, null, 0));
        editor2.setMode("tree");
        editor2.expandAll();


        $("#jsoneditor3").text(jsonObject) ;
        // $("#jsoneditor3").text(jsonObject.toString()) ;

    } catch (e) {

    }
}






