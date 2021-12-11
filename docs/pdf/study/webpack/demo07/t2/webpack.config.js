const  path = require("path") ;

module.exports = {
    entry: {
        index :"./src/index.js"
    },
    mode :'development' ,
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module :{
        rules:[
            {test : /.css$/ , use : "css-loader"}
        ]
    }
}