
const path = require("path") ;

module.exports = {
    entry :{
        index :"./src/index.js" ,
        main :"./src/main.js" ,
    },
    mode :"development" ,
    output :{
        // path:path.join(__dirname,"release")
        // path:path.join(__dirname,"output1"),
        path:path.join(__dirname,"output"),
        // filename:"[name].js"
        // filename:"[name]_.js"
        // filename:"[name]_[hash].js"
        filename:"[name]_[hash:4].js"
    }
}