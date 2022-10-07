const path = require('path');

module.exports  = {
    entry: {
        home : "./src/home.js" ,
        main : "./src/main.js" ,
        register : "./src/register.js" ,
    },
    output :{
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development' // 设置mode
} ;