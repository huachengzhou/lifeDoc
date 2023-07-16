
---
title: "idea 解决working directory 设置到 target"
date: 2021-01-17T15:26:15Z
draft: false
---








+ idea 解决working directory 设置到 target
```
test ng D:\IdeaProjects\java-se-study

run config $MODULE_DIR$

```










+ You aren‘t using a compiler supported by lombok, so lombok will not work and has been disabled

Compiler Shared build process Vm options 加上 -Djps.track.ap.dependencies=false




