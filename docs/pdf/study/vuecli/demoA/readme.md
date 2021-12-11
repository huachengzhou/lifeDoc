

## 命令 npm run start 或者 npm run dev

```shell
PS D:\IdeaProjects\cycle\study\vuecli\demoA\testvue2> npm run start
Debugger attached.

> testvue2@1.0.0 start D:\IdeaProjects\cycle\study\vuecli\demoA\testvue2
> npm run dev

Debugger attached.

> testvue2@1.0.0 dev D:\IdeaProjects\cycle\study\vuecli\demoA\testvue2
> webpack-dev-server --inline --progress --config build/webpack.dev.conf.js

Debugger attached.
 13% building modules 27/29 modules 2 active ...udy\vuecli\demoA\testvue2\src\App.vue{ parser: "babylon" } is deprecated; we now treat it as { parser: "babel" }.
 95% emitting

 DONE  Compiled successfully in 3888ms                                                                                        下午9:13:39
 I  Your application is running here: http://localhost:8080
```

## 关闭 eslint


```
config => index.js 找到     useEslint: true,改为false
```