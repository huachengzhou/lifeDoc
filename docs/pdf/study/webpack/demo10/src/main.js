import img from './img/beautifulGirl.jpg';
import utils from './js/utils';

//依赖css文件
require('./css/normal.css');

//依赖less文件
require('./css/special.less');



// console.log("---" + utils.randomString(22) + "----");

const  el = document.createElement("div") ;

// el.innerText =  utils.randomString(20) ;
el.innerText =  "sdhsdhhds" ;

document.body.append(el)   ;

const  elimg = document.createElement("img") ;
document.body.append(elimg)   ;
elimg.setAttribute("src",img) ;