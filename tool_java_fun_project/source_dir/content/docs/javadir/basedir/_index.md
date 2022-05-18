---
title: "Java基础知识 "
date: 2021-04-15
draft: false
weight: 1
---





## 目录


* [jsp](jsp_dir)


```java
  @Test
    public void mapTest() throws Exception {
        Map map  = new HashMap();
        map.put("1", UUID.randomUUID().toString()) ;
        map.put("4", UUID.randomUUID().toString()) ;
        Map<Integer ,String> integerStringMap = new HashMap<>() ;
        integerStringMap = map;
        if (!integerStringMap.isEmpty()){
            for ( Iterator<Map.Entry<Integer, String>> iterator = integerStringMap.entrySet().iterator();iterator.hasNext();){
                Map.Entry<Integer, String> next = iterator.next();
                System.out.println(next.getKey()+"-"+next.getValue());
                System.out.println(next.getKey() instanceof Integer);
                System.out.println(next.getValue() instanceof String);
            }
        }
        //print result
        /**
         * 1-aeec41b6-bb7c-4e77-a57c-70a416bc03eb
         * false
         * true
         * 4-e02bb587-9714-4873-9b6c-5e2d4494117f
         * false
         * true
         */
    }
```








## [回到上一级](../)