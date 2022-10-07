var mapView = {};

mapView.map = undefined;
mapView.placeSearch = undefined;

mapView.searchByName = function (placeSearch, name, map) {
    placeSearch.search(name, function (status, result) {
        if (result.info == 'OK') {
            if (result.poiList.pois.length > 0) {
                var poi = result.poiList.pois[0];
                map.setCenter([poi.location.lng, poi.location.lat]); //设置地图中心点
            }
        }
    })
};


mapView.load = function () {
    var setting = {
        view: {
            dblClickExpand: false,//双击节点时，是否自动展开父节点的标识
            showLine: true,//是否显示节点之间的连线
            fontCss: {'color': 'black', 'font-weight': 'bold'},//字体样式函数
            selectedMulti: false //设置是否允许同时选中多个节点
        },
        data: {
            simpleData: {//简单数据模式
                enable: true,
                idKey: "id",
                pIdKey: "parent_id",
                rootPId: "0"
            }
        },
        callback: {
            onClick: mapView.onClick,
            onDblClick:mapView.onDblClick
        }
    };

    $(document).ready(function () {
        var zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, sensitive.getRecords());
        /**
         * 创建map容器
         **/
        mapView.map = new AMap.Map('containerHandle', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: 11, //初始化地图层级
            center: [116.397428, 39.90923] //初始化地图中心点
        });

        //输入提示
        var autoOptions = {
            input: "tipinput"
        };
        var auto = new AMap.Autocomplete(autoOptions);
        if (!mapView.placeSearch) {
            mapView.placeSearch = new AMap.PlaceSearch({});
        }
        //注册监听，当选中某条记录时会触发
        AMap.event.addListener(auto, "select", function (e) {
            mapView.placeSearch.setCity(e.poi.adcode);
            mapView.searchByName(mapView.placeSearch,e.poi.name,mapView.map);
        });
    });
};

mapView.onClick = function (event, treeId, treeNode, clickFlag) {
    mapView.onDblClick(event,treeId,treeNode) ;
};

mapView.onDblClick = function (event, treeId, treeNode) {
    if (!mapView.placeSearch) {
        mapView.placeSearch = new AMap.PlaceSearch({});
    }
    mapView.searchByName(mapView.placeSearch, treeNode.name, mapView.map);
};

mapView.getViewHtml = function () {
    var text = "";
    text += "<div class=\"container body\">";
    text += "    <form class=\"form-horizontal\">";
    text += "        <div class=\"form-group\">";
    text += "            <div class=\"col-xs-2  col-sm-2  col-md-2  col-lg-2\">";
    text += "            </div>";
    text += "            <div class=\"col-xs-5  col-sm-5  col-md-5  col-lg-5 form-group pull-left\">";
    text += "                <i class=\"fa fa-map\"></i>";
    text += "                地图";
    text += "            </div>";
    text += "            <div class=\"col-xs-5  col-sm-5  col-md-5  col-lg-5 form-group pull-right\">";
    text += "                <input type=\"text\" id='tipinput'  class=\"form-control\" placeholder=\"查询....\">";
    text += "            </div>";
    text += "        </div>";
    text += "    </form>";
    text += "";
    text += "    <div class=\"x_panel\">";
    text += "        <div class=\"x_content\">";
    text += "            <form class=\"form-horizontal\">";
    text += "                <div class=\"form-group\">";
    text += "                    <div class=\"col-xs-2  col-sm-2  col-md-2  col-lg-2\">";
    text += "                        <ul id=\"treeDemo\" class=\"ztree\"></ul>";
    text += "                    </div>";
    text += "                    <div class=\"col-xs-10  col-sm-10  col-md-10  col-lg-10\" style=\"margin-top:10px;height:900px;\" id=\"containerHandle\">";
    text += "";
    text += "                    </div>";
    text += "                </div>";
    text += "            </form>";
    text += "        </div>";
    text += "    </div>";
    text += "</div>";
    return text;
};

