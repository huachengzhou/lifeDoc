var jsonedit = {
    init:function(div,json) {
        var str="";
        var root_html="";
        if(typeof(div)=="undefined"){
            return;
        }else{
            obj=div+"_JSONEdit";
            obj_root=div+"_JSONRoot";
        }

        if ($("#"+obj_root).length <=0){
            root_html='<div id="'+obj_root+'" class="JSONRoot" >\
                <div class="elmbox"><span class="elm">ROOT</span></div>\
            </div>';
        }

        if ($("#"+obj).length <=0){
            // jsons=jsons.replace(new RegExp(/\"/g),"&quot;");
            root_html+='<div id="'+obj+'" class="JSONEdit" data-json="" ></div>';
        }else{
            $("#"+obj).html('');
        }

        if(root_html){
            $("#"+div).html(root_html);
        }

        var json_data=$("#"+obj).attr('data-json');

        if(typeof(json)=="undefined" && json_data){
            json=json_data;
        }
        
        if(typeof(json)=="string" ){
            json=JSON.parse(json);
        }

        if(json){
            $("#"+obj).attr('data-json',JSON.stringify(json));
        }

        // console.log(json);
        if($("#modal_JSONEdit").length<=0){
            var modal='<div class="modal fade draggable-modal" id="modal_JSONEdit" tabindex="-1" role="basic" aria-hidden="true" style="display: none;" >';
                modal+='<div class="modal-dialog"><div class="modal-content">';
                modal+='<div class="modal-header" ><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4 class="modal-title" style="display: inline-block;">信息</h4></div>';
                modal+='<div class="modal-body"></div><div class="modal-footer"></div></div></div></div>';
            $(document.body).append(modal);
        }
        var html=forTree(json,obj);
        $("#"+obj).html(html);

        $("#"+obj+" ul").each(function(index, element) {
            var ulContent = $(element).html();
            var spanContent = $(element).siblings("span").html();
            if (ulContent) {
                $(element).siblings("span").html("[-] " + spanContent)
            }
        });

        $("#"+obj).find("li span").click(function() {
            var ul = $(this).siblings("ul");
            var spanStr = $(this).html();
            var spanContent = spanStr.substr(3, spanStr.length);
            var sclass=$(this).attr("class");
            if (typeof(sclass)=="undefined" && ul.find("li").html() != null) {
                if (ul.css("display") == "none") {
                    ul.show(300);
                    $(this).html("[-] " + spanContent);
                } else {
                    ul.hide(300);
                    $(this).html("[+] " + spanContent);
                }
            }
        });

        $("#"+obj_root).find("div span").mouseover(function() {
            sclass=$(this).attr("class");
            addhtml='<span  class="button add" title="add node" onclick="add_node(this);"></span>'
            ophtml=addhtml;
            if(ophtml.length>0 && $(this).parent().find(".add").length==0 ){
                $(this).after(ophtml);
            }
        });

        $("#"+obj_root).find("div").mouseleave(function() {
            var obj_r=$(this).parents(".JSONRoot").attr("id");
            $("#"+obj_r).find(".add").remove();
        });

        $("#"+obj).find("li span").mouseover(function() {
            sclass=$(this).attr("class");
            addhtml='<span  class="button add" title="add node" onclick="add_node(this);"></span>'
            edithtml='<span  class="button edit" title="rename" onclick="add_node(this,\'edit\');" ></span>'
            removehtml='<span  class="button remove" title="remove" onclick="remove_node(this);" ></span>'
            ophtml=edithtml+removehtml;
            if(typeof(sclass)=="undefined"){
                ophtml=addhtml+removehtml;
            }
            if(sclass=="elm"){
                ophtml="";
            }
            if(ophtml.length>0 && $(this).parent().find(".remove").length==0 ){
                $(this).after(ophtml);
            }
        });

        $("#"+obj).find("li").mouseleave(function() {
            var sclass=$(this).children("span").attr("class");
            var obj_edit=$(this).parents(".JSONEdit").attr("id");
            $("#"+obj_edit).find(".add").remove();
            $("#"+obj_edit).find(".remove").remove();
            $("#"+obj_edit).find(".edit").remove();
            // console.log(sclass);
        });
        $("#"+obj+" ul").attr("class","line");

        function forTree(o,id) {
            var urlstr = "";
            var keys = new Array();
            for (var key in o) {
                keys.push(key);
            }
            for (var j = 0; j < keys.length; j++) {
                k = keys[j];
                lid=id+"____"+k;
                if (typeof o[k] == "object") {
                    aclass=""
                    if(j==(keys.length-1)){aclass="last";}
                    if(k=="code"){
                        urlstr = "<li id=\""+lid+"\" class=\"elmbox "+aclass+"\"><span  class=\"red\">" + k + " </span><ul>";
                    }else{
                        urlstr = "<li id=\""+lid+"\" class=\"elmbox "+aclass+"\"><span >" + k + " </span><ul>";
                    }
                } else {
                    box_class="node";
                    if(j==(keys.length-1)){box_class="nodelast";}
                    jsonkey="[" + k + "]";
                    // if(!isNaN(k)){ 
                    //     jsonkey="";
                    // }
                    urlstr = "<li id=\""+lid+"\" class=\"elmbox " + box_class+ "\"><span  class=\"elm\" >" + jsonkey + " </span><span class=\"value\">" + o[k] + "</span>";
                }
                if(typeof(str)=="undefined"){
                    str="";
                }
                str += urlstr;
                if (typeof o[k] == "object" ) {
                    forTree(o[k],lid);
                    str += "</ul></div>";
                }else{
                str += "</div>";}
            }
            return str;
        }

    },
    get:function(div){
        if(typeof(div)=="undefined"){
            return;
        }else{
            obj=div+"_JSONEdit";
        }
        var json_data=$("#"+obj).attr('data-json');
        return json_data;
    },
    update:function(div,json){
        if(typeof(div)=="undefined"){
            return;
        }else{
            obj=div+"_JSONEdit";
        }
        if(typeof(json)=="undefined"){
            return;
        }        
        if(typeof(json)=="string" ){
            json=JSON.parse(json);
        }
        if(json){
            $("#"+obj).attr('data-json',JSON.stringify(json));
            return true;            
        }
    },
    expand:function(div,p){
        if(typeof(div)=="undefined"){
            return;
        }else{
            obj=div+"_JSONEdit";
        }
        var node=$(p).attr("data-node");
        if(node=="collapsed" ){
            $(p).attr("data-node","expand");
            $("#"+obj+" ul").show(300);
            $("#"+obj+" ul").attr("class","line");
            var v="-";
        }else if(node=="expand" || typeof(node)=="undefined"){
            $(p).attr("data-node","collapsed")
            $("#"+obj+" ul").hide(300);;
            var v="+";
        }

        $("#"+obj+" span").each(function(index, element) {
            var ul = $(this).siblings("ul");
            var spanStr = $(this).html();
            var spanContent = spanStr.substr(3, spanStr.length);
            if (ul.find("li").html() != null) {
                $(this).html("[" + v + "] " + spanContent);
            }
        });        
    }
};

function add_node(p,act){
    if(typeof(act)=="undefined"){
        act="add";
    }
    var key="";
    var value="";
    var obj=$(p).parent("li");
    if($(obj).length==0){var obj=$(p).parents(".JSONRoot");}
    var lclass=$(obj).attr("class");
    if(act=="edit" && typeof(lclass)!="undefined"){
        key=$(obj).children(".elm").html();
        value=$(obj).children(".value").html();      
        if(typeof(key)!="undefined"){
            key='value="'+key.replace("[","").replace("]","")+'"';
        }   
        if(typeof(value)=="undefined"){
            value="";
        }  
    }

    //body
    var text='<div class="form-horizontal">\
    <div class="form-group"><label class="col-md-2 control-label">Key: </label>\
        <div class="col-md-8"><input type="text" '+key+' placeholder="若添加数组值,可为空" name="key" class="form-control"></div></div>\
    <div class="form-group"><label class="col-md-2 control-label">Value: </label>\
        <div class="col-md-8"><textarea name="value" placeholder="若是json 格式，将自动解析" class="form-control" >'+value+'</textarea></div></div>\
    <input type="hidden" name="position" value="'+$(obj).attr("id")+'"></input>\
    </div>';

    var button='<button type="button" class="btn btn-primary" onclick="update_json(this);" >确认</button>';
    $("#modal_JSONEdit .modal-body").html(text);         
    $("#modal_JSONEdit .modal-footer").html(button);
    $("#modal_JSONEdit").modal("show");
}

function remove_node(p){
    var parent=$(p).parent("li");
    var id=$(parent).attr("id");
    post=id.split("____");
    var obj=post[0];
    var json=$("#"+obj).attr('data-json');
    json=JSON.parse(json);
    post.splice(0,1);
    value="delete json";   
    $.each(post, function(i,val){
        if(isNaN(val)){
            value+="."+val;
        }else{
            value+="["+val+"]";
        }
    });
    eval(value);
    // console.log(obj);
    $("#"+obj).attr('data-json',JSON.stringify(json)); 
    // if($(".prettyprint").length>0){
    //     $(".prettyprint").html("<code>"+JSONstringify(json)+"</code>");
    //     $(".prettyprint").attr("class",'prettyprint linenums');
    //     prettyPrint();
    // }       
    parent.remove();
}

function update_json(p){
    var pclass=$(p).parent().attr("class");
    if(pclass=="modal-footer"){
        var obj=$(p).parent().prev(".modal-body").children(".form-horizontal");
        var position=$(obj).children('input[name="position"]').val();
        if(position.indexOf("JSONRoot")>0){
            post=new Array();
            post[0]=position.replace("JSONRoot","JSONEdit");
        }else{
            post=position.split("____");
        }
        
        var key=$(obj).find('input[name="key"]').val();
        var value=$(obj).find('textarea[name="value"]').val();
        if(key.length<0 && value.length<0){alert("至少一项不能为空！");}
        var json=$("#"+post[0]).attr('data-json');
        if(typeof(json)=="undefined" || json.length<0){
            if(key.length>0){
                var newjson = new Object();
                newjson[key]=value;
            }else{
                var newjson=new Array();
                newjson.push(value);
            }
        }else{
            json=JSON.parse(json);
            data=[$.trim(key),$.trim(value)];
            newjson=add_json(json,position,data);
            if(newjson===false){"目标层级为对象,key 不能为空！"}          
        }
        if(newjson){
            $("#"+post[0]).attr('data-json',JSON.stringify(newjson));
            jsonedit.init(post[0].split("_")[0]);
            // createTreeNode();
            $("#modal_JSONEdit").modal("hide"); 
            // if($(".prettyprint").length>0){
            //     $(".prettyprint").html("<code>"+JSONstringify(newjson)+"</code>");
            //     $(".prettyprint").attr("class",'prettyprint linenums');
            //     prettyPrint();
            // }       
        }
    }
}

function add_json(json,post,data){
    if(typeof(post)=="string"){
        post=post.split("____");
        post.splice(0,1);
    }
    var patt = /^\{|^\[/;
    if(patt.test(data[1])){
        ndata=JSON.parse(data[1]);
        nval="ndata";
    }else{
        nval="'"+data[1]+"'";
    }
    console.log(nval)
    value="json";
    if(post.length>0){
        $.each(post, function(i,val){
            if(isNaN(val)){
                value+="."+val;
            }else{
                value+="["+val+"]";
            }
            // console.log(i);
            if(i==post.length-1){
                lval=val;
            }
        });
    }else{
       lval="root"; 
    }
    if(data[0]==lval){
    //编辑
        value+='='+nval;
    }else{
        console.log(value);
    //添加    
        if(eval(value+" instanceof Array")){
        //目标是array时data[0]可以为空
            value+='.push('+nval+')';
        }else{
        //目标是object时data[0]不能为空
            if(data[0]==""){return false;}
            value+="."+data[0]+'='+nval;           
        }
    }
    eval(value);
    // console.log(value);
    return json;
}

function save_json(obj){
    var url=$(obj).attr("data-url");
    var json={}; 
    json.data=$(obj).attr("data-json");
    if(url.length>0){
        _ajaxRequest(url,json);
    }
}

function JSONstringify(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, '\t');
    }
    var  arr = [];
    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        return match;
    });
    arr.unshift(json);
    return arr;
    // console.log.apply(console, arr);
}
