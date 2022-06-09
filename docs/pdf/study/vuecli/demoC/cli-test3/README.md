# cli-test3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


npm install vue-router@3.2.0 --save-dev
npm install vue-router --save-dev
-- npm 版本过高
npm install npm@6.14.10 -g

//    "lint": "vue-cli-service lint"


28 errors and 0 warnings potentially fixable with the `--fix` option.

"lint": "eslint --fix --ext .js,.vue src",


然鹅没能解决问题，后来发现 在.eslintrc.js 文件中

 "extends": [
      "plugin:vue/essential",
      "@vue/standard"
    ],