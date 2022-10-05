---
title: "vue脚手架创建方式 "
date: 2021-06-17
draft: false
weight: 19
---

## 第一种方式

+ + npm i -g @vue/cli-init or npm install @vue/cli-init@5.0.8 -g

```shell
D:\IdeaProjects\cycle\study\vuecli\demoB>vue init webpack learnrouter

? Project name learnrouter
? Project description '这是一个vue路由器'
? Author zch
? Vue build runtime
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests Yes
? Pick a test runner noTest
? Setup e2e tests with Nightwatch? Yes
? Should we run `npm install` for you after the project has been created? (recommended) npm

   vue-cli · Generated "learnrouter".


# Installing project dependencies ...
# ========================

npm WARN deprecated extract-text-webpack-plugin@3.0.2: Deprecated. Please use https://github.com/webpack-contrib/mini-css-extract-plugin
npm WARN deprecated html-webpack-plugin@2.30.1: out of support
npm WARN deprecated browserslist@2.11.3: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
npm WARN deprecated core-js@2.6.12: core-js@<3.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in
 old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please, upgrade your dependencies to the actual version of core-js.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated uglify-es@3.3.9: support for ECMAScript is superseded by `uglify-js` as of v3.13.0
npm WARN deprecated bfj-node4@5.3.1: Switch to the `bfj` package for fixes and new features!
npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated mkdirp@0.5.1: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)
npm WARN deprecated json3@3.3.2: Please use the native JSON object instead of JSON 3
npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
npm WARN deprecated browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
npm WARN deprecated querystring@0.2.0: The
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated

> chromedriver@2.46.0 install D:\IdeaProjects\cycle\study\vuecli\demoB\learnrouter\node_modules\chromedriver
> node install.js

Current existing ChromeDriver binary is unavailable, proceding with download and extraction.
Downloading from file:  https://chromedriver.storage.googleapis.com/2.46/chromedriver_win32.zip
Saving to file: C:\Users\dell\AppData\Local\Temp\2.46\chromedriver\chromedriver_win32.zip
Received 781K...
Received 1568K...
Received 2352K...
Received 3134K...
Received 3920K...
Received 4523K total.
Extracting zip contents
Copying to target path D:\IdeaProjects\cycle\study\vuecli\demoB\learnrouter\node_modules\chromedriver\lib\chromedriver
Done. ChromeDriver binary available at D:\IdeaProjects\cycle\study\vuecli\demoB\learnrouter\node_modules\chromedriver\lib\chromedriver\chromedriver.exe

> core-js@2.6.12 postinstall D:\IdeaProjects\cycle\study\vuecli\demoB\learnrouter\node_modules\core-js
> node -e "try{require('./postinstall')}catch(e){}"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js on Open Collective or Patreon: 
> https://opencollective.com/core-js 
> https://www.patreon.com/zloirock 

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


> uglifyjs-webpack-plugin@0.4.6 postinstall D:\IdeaProjects\cycle\study\vuecli\demoB\learnrouter\node_modules\webpack\node_modules\uglifyjs-webpack-plugin
> node lib/post_install.js

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\webpack-dev-server\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\watchpack-chokidar2\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 1406 packages from 1012 contributors in 64.416s

57 packages are looking for funding
  run `npm fund` for details


# Project initialization finished!
# ========================

To get started:

  cd learnrouter
  npm run dev

Documentation can be found at https://vuejs-templates.github.io/webpack

```


## 第二种方式


```shell
D:\IdeaProjects\cycle\study\vuecli\demoC>vue create cli-test2


Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Less
? Where do you prefer placing config for Babel, ESLint, etc.? In package.json
? Save this as a preset for future projects? Yes
? Save preset as: y

�  Preset y saved in C:\Users\dell\.vuerc


Vue CLI v4.5.13
✨  Creating project in D:\IdeaProjects\cycle\study\vuecli\demoC\cli-test2.
⚙️  Installing CLI plugins. This might take a while...


> core-js@3.16.1 postinstall D:\IdeaProjects\cycle\study\vuecli\demoC\cli-test2\node_modules\core-js
> node -e "try{require('./postinstall')}catch(e){}"


> ejs@2.7.4 postinstall D:\IdeaProjects\cycle\study\vuecli\demoC\cli-test2\node_modules\ejs
> node ./postinstall.js

added 1218 packages from 636 contributors in 51.798s

78 packages are looking for funding
  run `npm fund` for details

�  Invoking generators...
�  Installing additional dependencies...

added 16 packages from 69 contributors in 5.772s

78 packages are looking for funding
  run `npm fund` for details

⚓  Running completion hooks...

�  Generating README.md...

�  Successfully created project cli-test2.
�  Get started with the following commands:

 $ cd cli-test2
 $ npm run serve
 
 
 D:\IdeaProjects\cycle\study\vuecli\demoC>cd cli-test2

D:\IdeaProjects\cycle\study\vuecli\demoC\cli-test2>npm run serve

> cli-test2@0.1.0 serve D:\IdeaProjects\cycle\study\vuecli\demoC\cli-test2
> vue-cli-service serve

 INFO  Starting development server...
98% after emitting CopyPlugin

 DONE  Compiled successfully in 2258ms                                                                                                                                       下午9:46:24


  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.31.246:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.

```