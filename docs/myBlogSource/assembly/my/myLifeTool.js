let MyLifeHelp = function (prefix) {
    this.prefix = prefix;
};

MyLifeHelp.prototype.setPrefix = function (prefix) {
    this.prefix = prefix;
    return this;
};

MyLifeHelp.prototype.getPrefix = function () {
    return this.prefix;
};

MyLifeHelp.prototype.getPath = function () {
    var url = window.location.host + '' + window.location.pathname;
    var name = 'index.html';
    url = url.replace(new RegExp(name, "g"), "");
    return url;
};

MyLifeHelp.prototype.getBootstrap4Resource = function () {
    var resources = [];
    <!-- 必须在bootstrap之前先引入tether模块 -->
    <!-- The tether module must be introduced before bootstrap -->
    resources.push("<script src='prefix_assembly/plugins/bootstrap/tether/tether-1.3.3/dist/js/tether.js'></script>");
    resources.push(" <link href='prefix_assembly/plugins/bootstrap/tether/tether-1.3.3/dist/css/tether.css ' rel='stylesheet'> ");
    <!-- 引入bootstrap样式 -->
    resources.push(" <link href='prefix_assembly/plugins/bootstrap/bootstrap-4.0.0-alpha.6-dist/css/bootstrap.css ' rel='stylesheet'> ");
    resources.push("<script src='prefix_assembly/plugins/bootstrap/bootstrap-4.0.0-alpha.6-dist/js/bootstrap.js'></script>");
    resources.push("<script src='prefix_assembly/plugins/bootstrap/bootstrap-4.0.0-alpha.6-dist/js/popper.min.js'></script>");
    return resources;
};

MyLifeHelp.prototype.getJqueryResource = function () {
    var resources = [];
    <!-- jquery -->
    resources.push("<script src='prefix_assembly/plugins/jquery/core/jquery-1.9.1.js'></script>");
    return resources;
};

MyLifeHelp.prototype.getFontAwesomeResource = function () {
    var resources = [];
    <!-- 图标组件 -->
    resources.push(" <link href='prefix_assembly/plugins/bootstrap/font-awesome-4.7.0/css/font-awesome.css ' rel='stylesheet'> ");
    return resources;
};

MyLifeHelp.prototype.getFormResource = function () {
    var resources = [];
    <!-- bootstrap-switch -->
    resources.push(" <link href='prefix_assembly/plugins/bootstrap/bootstrap-switch/static/stylesheets/bootstrap-switch.css ' rel='stylesheet'> ");
    resources.push("<script src='prefix_assembly/plugins/bootstrap/bootstrap-switch/static/js/bootstrap-switch.js'></script>");
    <!-- bootstrap-timepicker -->
    resources.push(" <link href='prefix_assembly/plugins/bootstrap/bootstrap-timepicker/css/bootstrap-timepicker.min.css ' rel='stylesheet'> ");
    resources.push("<script src='prefix_assembly/plugins/bootstrap/bootstrap-timepicker/js/bootstrap-timepicker.min.js'></script>");
    <!-- bootstrap-datetimepicker 日期组件 -->
    resources.push(" <link href='prefix_assembly/plugins/bootstrap/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css ' rel='stylesheet'> ");
    resources.push("<script src='prefix_assembly/plugins/bootstrap/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js'></script>");
    resources.push("<script src='prefix_assembly/plugins/bootstrap/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js'></script>");

    <!-- bootstrap-treeview -->
    resources.push(" <link href='prefix_assembly/plugins/bootstrap/bootstrap-treeview/bootstrap-treeview.min.css ' rel='stylesheet'> ");
    resources.push("<script src='prefix_assembly/plugins/bootstrap/bootstrap-treeview/bootstrap-treeview.min.js'></script>");

    <!-- select2 -->
    resources.push(" <link href='prefix_assembly/plugins/jquery/select2/select2.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/plugins/jquery/select2/select2-bootstrap.css ' rel='stylesheet'> ");
    resources.push("<script src='prefix_assembly/plugins/jquery/select2/select2.js'></script>");
    resources.push("<script src='prefix_assembly/plugins/jquery/select2/select2_locale_zh-CN.js'></script>");
    <!-- jquery validation -->
    resources.push("<script src='prefix_assembly/plugins/jquery/jquery-validation-1.17.0/dist/jquery.validate.js'></script>");
    resources.push("<script src='prefix_assembly/plugins/jquery/jquery-validation-1.17.0/dist/localization/messages_zh.js'></script>");
    return resources;
};


MyLifeHelp.prototype.getToolResources = function () {
    var resources = [];
    <!-- 公共js -->
    resources.push("<script src='prefix_assembly/js/common/common.js'></script>");
    resources.push("<script src='prefix_assembly/plugins/message/bootbox.js'></script>");
    resources.push("<script src='prefix_assembly/js/markdown/2.0.3/marked.js'></script>");


    resources.push("<script  src='prefix_assembly/plugins/crypto-js/core.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/enc-base64.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/cipher-core.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/aes.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/enc-utf16.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/evpkdf.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/format-hex.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/hmac.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/lib-typedarrays.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/mode-ecb.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/pbkdf2.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/md5.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/mode-ecb.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/rabbit.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/rabbit-legacy.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/crypto-js/sha256.js'></script>");

    resources.push("<script  src='prefix_assembly/plugins/vue/vue.min.js'></script>");
    resources.push("<script  src='prefix_assembly/plugins/vue/vue-router.js'></script>");
    return resources;
};

MyLifeHelp.prototype.getMyLifeResources = function () {
    var resources = [];
    resources.push(" <link href='prefix_assembly/my/css/animate.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/my/css/bootstrap.min.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/my/css/flatpickr.min.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/my/css/fontello.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/my/css/fontello-codes.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/my/css/thumbs-embedded.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/my/css/video-js.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/my/css/style.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/my/css/responsive.css ' rel='stylesheet'> ");
    resources.push(" <link href='prefix_assembly/my/css/color.css ' rel='stylesheet'> ");

    resources.push("<script  src='prefix_assembly/my/js/jquery.min.js'></script>");
    resources.push("<script  src='prefix_assembly/my/js/popper.js'></script>");
    resources.push("<script  src='prefix_assembly/my/js/bootstrap.min.js'></script>");
    resources.push("<script  src='prefix_assembly/my/js/flatpickr.js'></script>");
    resources.push("<script  src='prefix_assembly/my/js/video.js'></script>");
    resources.push("<script  src='prefix_assembly/my/js/script.js'></script>");
    return resources;
};

MyLifeHelp.prototype.getMyLifeVueJsResources = function () {
    var resources = [];
    resources.push("<script  src='prefix_assembly/my/components/BrowseCategoriesComponent.js'></script>");
    return resources;
};


MyLifeHelp.prototype.loadResource = function (prefix) {
    var resources = [];
    resources = resources.concat(this.getJqueryResource());
    resources = resources.concat(this.getBootstrap4Resource());
    resources = resources.concat(this.getFormResource());
    resources = resources.concat(this.getFontAwesomeResource());
    resources = resources.concat(this.getToolResources());
    for (var i = 0; i < resources.length; i++) {
        var item = resources[i];
        document.writeln(item.replace(/prefix_/g, prefix));
    }
};

MyLifeHelp.prototype.loadMyLifeResource = function (prefix) {
    var resources = [];
    resources = resources.concat(this.getMyLifeResources());
    resources = resources.concat(this.getFormResource());
    resources = resources.concat(this.getFontAwesomeResource());
    resources = resources.concat(this.getToolResources());
    resources = resources.concat(this.getMyLifeVueJsResources());

    for (var i = 0; i < resources.length; i++) {
        var item = resources[i];
        item = item.replace(/prefix_/g, prefix);
        // console.log(item) ;
        document.writeln(item);
    }

};

MyLifeHelp.prototype.getMyLifePrefix = function () {
    var str = this.getPrefix() + "assembly/my/";
    return str;
};

var myLifeHelp = new MyLifeHelp();



