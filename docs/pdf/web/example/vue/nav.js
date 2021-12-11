function getCurrentDate() {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    var MS = now.getMilliseconds();//获取毫秒
    var week;
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    if (MS < 100) MS = "0" + MS;
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];
    var time = "";
    time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;
    //当前日期赋值给当前日期输入框中（jQuery easyUI）
    return time;
}

function exampleData() {
    var data = [];
    var len = 10;
    var id = Math.round(Math.random() * 100);
    for (var i = 0; i < len; i++) {
        var name = Math.random()                        // 生成随机数字, eg: 0.123456
            .toString(36)           // 转化成36进制 : "0.4fzyo82mvyr"
            .slice(-8);// 截取最后八位 : "yo82mvyr"
        data.push({
            id: ++id,
            name: name,
            href: "#"
        });
    }
    const str = 'exercise/bibi/';
    data.unshift({
        id: ++id,
        name: "模板语法",
        href: "exercise/模板语法.html"
    });
    data.unshift({
        id: ++id,
        name: "hello world",
        href: "exercise/helloword.html"
    });
    data.unshift({
        id: ++id,
        name: "2020 03 21",
        href: "exercise/2020_03_21.html"
    });

    data.unshift({
        id: ++id,
        name: "uni-appT",
        href: "exercise/uni-appT.html"
    });


    data.unshift({
        id: ++id,
        name: "bibi 01-vue helloword",
        href: "exercise/bibi/helloword.html"
    });

    data.unshift({
        id: ++id,
        name: "bibi 02-vue 列表展示",
        href: "exercise/bibi/02-vue列表展示.html"
    });

    data.unshift({
        id: ++id,
        name: "bibi 03-vue 计数器",
        href: "exercise/bibi/03-vue计数器.html"
    });

    data.unshift({
        id: ++id,
        name: "bibi 04-vue-mustache",
        href: "exercise/bibi/04-vue-mustache.html"
    });

    data.unshift({
        id: ++id,
        name: "bibi 05-vue-cloak",
        href: "exercise/bibi/05-vue-cloak.html"
    });

    data.unshift({
        id: ++id,
        name: "bibi 06-vue-bind",
        href: str + "06-vue-bind.html"
    });

    data.unshift({
        id: ++id,
        name: "bibi 07-vue-bind动态绑定class(对象语法)",
        href: str + "07-vue-bind动态绑定class(对象语法).html"
    });

    data.unshift({
        id: ++id,
        name: "bibi v-for和v-bind的结合",
        href: str + "v-for和v-bind的结合.html"
    });
    return data;
}

function loadSensitiveTable(target) {
    target.bootstrapTable('destroy');
    var columns = [];
    // columns.push({checkbox: true, width: "5%"});
    columns.push({
        field: 'id', title: 'id', width: "10%"
    });
    columns.push({
        field: 'name', title: '名称', width: "10%"
    });
    columns.push({
        field: 'id', title: '链接', width: "50%", formatter: function (value, row, index) {
            var str = '<div class="btn-margin">';
            str += '<a class="btn btn-xs btn-success" target="_blank" href="' + row.href + '" ><i class="fa fa-search">例子</i></a>';
            str += "</div>";
            return str;
        }
    });

    var init = {
        searchAlign: 'left',
        search: false,   //显示隐藏搜索框
        showHeader: true,     //是否显示列头
        showLoading: true,
        undefinedText: '',
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [2, 5, 10, 15],        //可供选择的每页的行数（*）
        showFullscreen: true,
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: false,                //是否启用点击选中行
        //height: 680,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
        data: exampleData(),
        columns: columns
    };
    target.bootstrapTable(init);
}
