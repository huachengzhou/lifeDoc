# elasticsearch

> elasticsearch是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。Elasticsearch是用Java语言开发的，并作为Apache许可条款下的开放源码发布，是一种流行的企业级搜索引擎

+ 学习版本7.8(2021年的)



[官方地址](https://www.elastic.co/cn/)
[kibana地址(其它版本选择View past releases)](https://www.elastic.co/cn/downloads/kibana)
[官方推荐教程](https://www.elastic.co/guide/cn/elasticsearch/guide/current/_how_to_read_this_book.html)
[其它教程](https://www.cainiaojc.com/elasticsearch/)
[elasticsearch和kibana版本对应关系](https://www.elastic.co/cn/support/matrix#matrix_compatibility)


# elasticsearch与数据库的类比

| 关系型数据库（比如Mysql） | 非关系型数据库（Elasticsearch） |
| --- | --- |
| 数据库Database | 索引Index |
| 表Table | 类型Type |
| 数据行Row | 文档Document |
| 数据列Column | 字段Field |
| 约束 Schema | 映射Mapping |


+ 总结来说elasticsearch字段的含义可以理解为
+ 数据库:Index
+ 表:Type
+ 行:Document
+ 列:Field
+ 约束:Mapping

# HTTP API

## 创建索引库index

### 1:创建index



```javascript
//PUT http://127.0.0.1:9200/shopping

var requestOptions = {
  method: 'PUT',
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "shopping"
}
```

### 2:然后 PUT INDEX 不能重复去发送

```javascript
//PUT http://127.0.0.1:9200/shopping

var requestOptions = {
  method: 'PUT',
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
    "error": {
        "root_cause": [
            {
                "type": "resource_already_exists_exception",
                "reason": "index [shopping/rsMfEk24SteNXg44dofCJg] already exists",
                "index_uuid": "rsMfEk24SteNXg44dofCJg",
                "index": "shopping"
            }
        ],
        "type": "resource_already_exists_exception",
        "reason": "index [shopping/rsMfEk24SteNXg44dofCJg] already exists",
        "index_uuid": "rsMfEk24SteNXg44dofCJg",
        "index": "shopping"
    },
    "status": 400
}
```

### 3:POST也不能  只能 DELETE, GET, HEAD, PUT

```javascript

//POST http://127.0.0.1:9200/shopping

var requestOptions = {
  method: 'POST',
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
  
var result = {
    "error": "Incorrect HTTP method for uri [/shopping] and method [POST], allowed: [DELETE, GET, HEAD, PUT]",
    "status": 405
}
```



### 4:查询索引库



```javascript
// GET http://127.0.0.1:9200/shopping
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

 let result = {
    "shopping": {
        "aliases": {},
        "mappings": {},
        "settings": {
            "index": {
                "creation_date": "1689993056564",
                "number_of_shards": "1",
                "number_of_replicas": "1",
                "uuid": "rsMfEk24SteNXg44dofCJg",
                "version": {
                    "created": "7080099"
                },
                "provided_name": "shopping"
            }
        }
    }
}
```

## 文档 增删查改

### 添加默认文档

```javascript
// POST http://127.0.0.1:9200/shopping/_doc

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "AG_PRICE": 10,
    "CRAFT_NAME": "芒果",
    "C_UNIT": "元/公斤",
    "GET_P_DATE": 1689782400000,
    "CRAFT_INDEX": "13228",
    "PAR_INDEX": 13076,
    "PROMULGATE_DATE": 1689838523000,
    "ID": 71860010,
    "P_INDEX": "370828",
    "EUD_PIC": "/tc/20220211134437904645.jpg",
    "EUD_NAME": "山东凯盛国际农产品物流城"
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_doc", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

// 成果结果
// 注意不能多次生成   id=zhV_fIkB5CwRTRdtywp8 是ES生成的标识符

let result = {
                 "_index": "shopping",
                 "_type": "_doc",
                 "_id": "zhV_fIkB5CwRTRdtywp8",
                 "_version": 1,
                 "result": "created",
                 "_shards": {
                     "total": 2,
                     "successful": 1,
                     "failed": 0
                 },
                 "_seq_no": 4,
                 "_primary_term": 1
             }
```




### 添加自定义id的默认文档

```javascript
// POST http://127.0.0.1:9200/shopping/_doc/1001

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "AG_PRICE": 4.3,
    "CRAFT_NAME": "香蕉",
    "C_UNIT": "元/公斤",
    "GET_P_DATE": 1689782400000,
    "CRAFT_INDEX": "13103",
    "PAR_INDEX": 13076,
    "PROMULGATE_DATE": 1689838523000,
    "ID": 71860010,
    "P_INDEX": "370828",
    "EUD_PIC": "/tc/20220211134437904645.jpg",
    "EUD_NAME": "山东凯盛国际农产品物流城"
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_doc/1001", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

let result = {
                 "_index": "shopping",
                 "_type": "_doc",
                 "_id": "1001",
                 "_version": 1,
                 "result": "created",
                 "_shards": {
                     "total": 2,
                     "successful": 1,
                     "failed": 0
                 },
                 "_seq_no": 9,
                 "_primary_term": 1
             }
```



### 文档修改

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "AG_PRICE": 10,
    "CRAFT_NAME": "芒果",
    "C_UNIT": "元/公斤",
    "GET_P_DATE": 1689609600000,
    "CRAFT_INDEX": "13228",
    "PAR_INDEX": 13076,
    "PROMULGATE_DATE": 1689665740000,
    "ID": 71860010,
    "P_INDEX": "370828",
    "EUD_PIC": "/tc/20220211134437904645.jpg",
    "EUD_NAME": "山东凯盛国际农产品物流城",
    "ROWNUM_": 150
});

var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_doc/1001", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

// 成果结果

let result = {
                 "_index": "shopping",
                 "_type": "_doc",
                 "_id": "1001",
                 "_version": 2,
                 "result": "updated",
                 "_shards": {
                     "total": 2,
                     "successful": 1,
                     "failed": 0
                 },
                 "_seq_no": 5,
                 "_primary_term": 1
             }
```

### 文档修改(局部修改)

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "doc": {
        "CRAFT_NAME": "芒果(局部修改)"
    }
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_update/1001", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

let result = {
                 "_index": "shopping",
                 "_type": "_doc",
                 "_id": "1001",
                 "_version": 3,
                 "result": "updated",
                 "_shards": {
                     "total": 2,
                     "successful": 1,
                     "failed": 0
                 },
                 "_seq_no": 6,
                 "_primary_term": 1
             };

```


### 文档删除（根据id）

```javascript
var requestOptions = {
  method: 'DELETE',
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_doc/1001", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
                 "_index": "shopping",
                 "_type": "_doc",
                 "_id": "1001",
                 "_version": 4,
                 "result": "deleted",
                 "_shards": {
                     "total": 2,
                     "successful": 1,
                     "failed": 0
                 },
                 "_seq_no": 7,
                 "_primary_term": 1
             };

//重复删除
result = {
             "_index": "shopping",
             "_type": "_doc",
             "_id": "1001",
             "_version": 1,
             "result": "not_found",
             "_shards": {
                 "total": 2,
                 "successful": 1,
                 "failed": 0
             },
             "_seq_no": 8,
             "_primary_term": 1
         }
```

### 文档全查询(url get)

```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
                 "took": 0,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 5,
                         "relation": "eq"
                     },
                     "max_score": 1.0,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "TxVFfIkB5CwRTRdtMwUW",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13201",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "YhVwfIkB5CwRTRdtrgkD",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13201",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "pBV-fIkB5CwRTRdtEgqc",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "zhV_fIkB5CwRTRdtywp8",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "1001",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 4.3,
                                 "CRAFT_NAME": "香蕉",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13103",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         }
                     ]
                 }
             }
```

## 文档 查询

### 简单条件查询

```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search?q=CRAFT_NAME=芒果", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
                 "took": 26,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 2,
                         "relation": "eq"
                     },
                     "max_score": 1.8790548,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "pBV-fIkB5CwRTRdtEgqc",
                             "_score": 1.8790548,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "zhV_fIkB5CwRTRdtywp8",
                             "_score": 1.8790548,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         }
                     ]
                 }
             }
```

### 简单条件查询json方式

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "match": {
      "CRAFT_NAME": "芒果"
    }
  }
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
                 "took": 0,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 2,
                         "relation": "eq"
                     },
                     "max_score": 1.8790548,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "pBV-fIkB5CwRTRdtEgqc",
                             "_score": 1.8790548,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "zhV_fIkB5CwRTRdtywp8",
                             "_score": 1.8790548,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         }
                     ]
                 }
             }
```

### 文档全查询(json)

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "match_all": {}
  }
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
                 "took": 0,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 5,
                         "relation": "eq"
                     },
                     "max_score": 1.0,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "TxVFfIkB5CwRTRdtMwUW",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13201",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "YhVwfIkB5CwRTRdtrgkD",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13201",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "pBV-fIkB5CwRTRdtEgqc",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "zhV_fIkB5CwRTRdtywp8",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "1001",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 4.3,
                                 "CRAFT_NAME": "香蕉",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13103",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         }
                     ]
                 }
             }
```


### 文档全查询(json+分页)

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "match_all": {}
  },
  "from": "0",
  "size": "2"
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
                 "took": 100,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 5,
                         "relation": "eq"
                     },
                     "max_score": 1.0,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "TxVFfIkB5CwRTRdtMwUW",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13201",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "YhVwfIkB5CwRTRdtrgkD",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13201",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         }
                     ]
                 }
             }
```

### 文档全查询(json+分页+返回指定对象字段)

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "match_all": {}
  },
  "from": "1",
  "size": "2",
  "_source": [
    "AG_PRICE",
    "CRAFT_NAME",
    "C_UNIT",
    "EUD_NAME"
  ]
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
let result = {
                 "took": 0,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 5,
                         "relation": "eq"
                     },
                     "max_score": 1.0,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "YhVwfIkB5CwRTRdtrgkD",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "pBV-fIkB5CwRTRdtEgqc",
                             "_score": 1.0,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         }
                     ]
                 }
             }
```

### 文档全查询(json+分页+指定排序)

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "match_all": {}
  },
  "from": "1",
  "size": "2",
  "_source": [
    "AG_PRICE",
    "CRAFT_NAME",
    "C_UNIT",
    "EUD_NAME",
    "ID"
  ],
  "sort": {
    "AG_PRICE": {
      "order": "desc"
    },
    "ID": {
      "order": "asc"
    }
  }
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
                 "took": 0,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 5,
                         "relation": "eq"
                     },
                     "max_score": null,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "YhVwfIkB5CwRTRdtrgkD",
                             "_score": null,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "ID": 71860010,
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             },
                             "sort": [
                                 14.5,
                                 71860010
                             ]
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "pBV-fIkB5CwRTRdtEgqc",
                             "_score": null,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "ID": 71860010,
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             },
                             "sort": [
                                 10.0,
                                 71860010
                             ]
                         }
                     ]
                 }
             }
```

## 文档 高级查询

### 批量插入

```javascript
/*
{"create":{"_index":"shopping","_type":"_doc","_id":20540}}
{"AG_PRICE":18,"CRAFT_NAME":"芒果","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"13228","PAR_INDEX":13076,"PROMULGATE_DATE":1690011326000,"ID":20540,"P_INDEX":"110500","EUD_PIC":"/tc/20210328232229261943.jpg","EUD_NAME":"北京朝阳区大洋路综合市场"}
{"create":{"_index":"shopping","_type":"_doc","_id":20531}}
{"AG_PRICE":14,"CRAFT_NAME":"芒果","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"13228","PAR_INDEX":13076,"PROMULGATE_DATE":1690011312000,"ID":20531,"P_INDEX":"110600","EUD_PIC":"/tc/20210422093833425915.jpeg","EUD_NAME":"北京新发地农副产品批发市场信息中心"}
{"create":{"_index":"shopping","_type":"_doc","_id":20531}}
{"AG_PRICE":22,"CRAFT_NAME":"芒果(台农一号)","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"15052367","PAR_INDEX":13076,"PROMULGATE_DATE":1690011314000,"ID":20531,"P_INDEX":"110600","EUD_PIC":"/tc/20210422093833425915.jpeg","EUD_NAME":"北京新发地农副产品批发市场信息中心"}
{"create":{"_index":"shopping","_type":"_doc","_id":20536}}
{"AG_PRICE":20,"CRAFT_NAME":"芒果","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"13228","PAR_INDEX":13076,"PROMULGATE_DATE":1690011334000,"ID":20536,"P_INDEX":"111200","EUD_PIC":"/tc/20210330163120050216.jpg","EUD_NAME":"北京八里桥农产品中心批发市场有限公司"}
{"create":{"_index":"shopping","_type":"_doc","_id":20570}}
{"AG_PRICE":8,"CRAFT_NAME":"芒果","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"13228","PAR_INDEX":13076,"PROMULGATE_DATE":1690011326000,"ID":20570,"P_INDEX":"121100","EUD_PIC":"/tc/20200330233852289284.jpg","EUD_NAME":"天津市红旗农贸综合批发市场有限公司"}
{"create":{"_index":"shopping","_type":"_doc","_id":71830481}}
{"AG_PRICE":6,"CRAFT_NAME":"芒果","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"13228","PAR_INDEX":13076,"PROMULGATE_DATE":1690011322000,"ID":71830481,"P_INDEX":"140107","EUD_PIC":"/tc/20220412164849161585.jpg","EUD_NAME":"山西太原丈子头农产品物流园（原城东利民）"}
{"create":{"_index":"shopping","_type":"_doc","_id":2550411}}
{"AG_PRICE":6,"CRAFT_NAME":"芒果","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"13228","PAR_INDEX":13076,"PROMULGATE_DATE":1690011323000,"ID":2550411,"P_INDEX":"140109","EUD_PIC":"/tc/20201104152043439244.jpg","EUD_NAME":"山西省太原市河西农产品有限公司"}
{"create":{"_index":"shopping","_type":"_doc","_id":45065}}
{"AG_PRICE":8,"CRAFT_NAME":"芒果","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"13228","PAR_INDEX":13076,"PROMULGATE_DATE":1690011327000,"ID":45065,"P_INDEX":"140401","EUD_PIC":"/tc/20201030190259796033.jpg","EUD_NAME":"长治市金鑫瓜果批发市场"}
{"create":{"_index":"shopping","_type":"_doc","_id":20969}}
{"AG_PRICE":8,"CRAFT_NAME":"芒果","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"13228","PAR_INDEX":13076,"PROMULGATE_DATE":1690011333000,"ID":20969,"P_INDEX":"320201","EUD_PIC":"/tc/20221127110546103791.jpg","EUD_NAME":"江苏无锡朝阳农产品大市场"}
{"create":{"_index":"shopping","_type":"_doc","_id":20959}}
{"AG_PRICE":12,"CRAFT_NAME":"芒果","C_UNIT":"元/公斤","GET_P_DATE":1689955200000,"CRAFT_INDEX":"13228","PAR_INDEX":13076,"PROMULGATE_DATE":1690011319000,"ID":20959,"P_INDEX":"320401","EUD_PIC":"/tc/20200817104333886984.jpg","EUD_NAME":"江苏凌家塘市场发展有限公司"}
* */
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = "{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":20540}}\r\n{\"AG_PRICE\":18,\"CRAFT_NAME\":\"芒果\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"13228\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011326000,\"ID\":20540,\"P_INDEX\":\"110500\",\"EUD_PIC\":\"/tc/20210328232229261943.jpg\",\"EUD_NAME\":\"北京朝阳区大洋路综合市场\"}\r\n{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":20531}}\r\n{\"AG_PRICE\":14,\"CRAFT_NAME\":\"芒果\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"13228\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011312000,\"ID\":20531,\"P_INDEX\":\"110600\",\"EUD_PIC\":\"/tc/20210422093833425915.jpeg\",\"EUD_NAME\":\"北京新发地农副产品批发市场信息中心\"}\r\n{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":20531}}\r\n{\"AG_PRICE\":22,\"CRAFT_NAME\":\"芒果(台农一号)\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"15052367\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011314000,\"ID\":20531,\"P_INDEX\":\"110600\",\"EUD_PIC\":\"/tc/20210422093833425915.jpeg\",\"EUD_NAME\":\"北京新发地农副产品批发市场信息中心\"}\r\n{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":20536}}\r\n{\"AG_PRICE\":20,\"CRAFT_NAME\":\"芒果\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"13228\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011334000,\"ID\":20536,\"P_INDEX\":\"111200\",\"EUD_PIC\":\"/tc/20210330163120050216.jpg\",\"EUD_NAME\":\"北京八里桥农产品中心批发市场有限公司\"}\r\n{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":20570}}\r\n{\"AG_PRICE\":8,\"CRAFT_NAME\":\"芒果\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"13228\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011326000,\"ID\":20570,\"P_INDEX\":\"121100\",\"EUD_PIC\":\"/tc/20200330233852289284.jpg\",\"EUD_NAME\":\"天津市红旗农贸综合批发市场有限公司\"}\r\n{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":71830481}}\r\n{\"AG_PRICE\":6,\"CRAFT_NAME\":\"芒果\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"13228\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011322000,\"ID\":71830481,\"P_INDEX\":\"140107\",\"EUD_PIC\":\"/tc/20220412164849161585.jpg\",\"EUD_NAME\":\"山西太原丈子头农产品物流园（原城东利民）\"}\r\n{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":2550411}}\r\n{\"AG_PRICE\":6,\"CRAFT_NAME\":\"芒果\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"13228\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011323000,\"ID\":2550411,\"P_INDEX\":\"140109\",\"EUD_PIC\":\"/tc/20201104152043439244.jpg\",\"EUD_NAME\":\"山西省太原市河西农产品有限公司\"}\r\n{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":45065}}\r\n{\"AG_PRICE\":8,\"CRAFT_NAME\":\"芒果\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"13228\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011327000,\"ID\":45065,\"P_INDEX\":\"140401\",\"EUD_PIC\":\"/tc/20201030190259796033.jpg\",\"EUD_NAME\":\"长治市金鑫瓜果批发市场\"}\r\n{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":20969}}\r\n{\"AG_PRICE\":8,\"CRAFT_NAME\":\"芒果\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"13228\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011333000,\"ID\":20969,\"P_INDEX\":\"320201\",\"EUD_PIC\":\"/tc/20221127110546103791.jpg\",\"EUD_NAME\":\"江苏无锡朝阳农产品大市场\"}\r\n{\"create\":{\"_index\":\"shopping\",\"_type\":\"_doc\",\"_id\":20959}}\r\n{\"AG_PRICE\":12,\"CRAFT_NAME\":\"芒果\",\"C_UNIT\":\"元/公斤\",\"GET_P_DATE\":1689955200000,\"CRAFT_INDEX\":\"13228\",\"PAR_INDEX\":13076,\"PROMULGATE_DATE\":1690011319000,\"ID\":20959,\"P_INDEX\":\"320401\",\"EUD_PIC\":\"/tc/20200817104333886984.jpg\",\"EUD_NAME\":\"江苏凌家塘市场发展有限公司\"}\r\n";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_doc/_bulk", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
let result = {
                 "took": 620,
                 "errors": true,
                 "items": [
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20540",
                             "_version": 1,
                             "result": "created",
                             "_shards": {
                                 "total": 2,
                                 "successful": 1,
                                 "failed": 0
                             },
                             "_seq_no": 11,
                             "_primary_term": 1,
                             "status": 201
                         }
                     },
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20531",
                             "_version": 1,
                             "result": "created",
                             "_shards": {
                                 "total": 2,
                                 "successful": 1,
                                 "failed": 0
                             },
                             "_seq_no": 12,
                             "_primary_term": 1,
                             "status": 201
                         }
                     },
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20531",
                             "status": 409,
                             "error": {
                                 "type": "version_conflict_engine_exception",
                                 "reason": "[20531]: version conflict, document already exists (current version [1])",
                                 "index_uuid": "rsMfEk24SteNXg44dofCJg",
                                 "shard": "0",
                                 "index": "shopping"
                             }
                         }
                     },
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20536",
                             "_version": 1,
                             "result": "created",
                             "_shards": {
                                 "total": 2,
                                 "successful": 1,
                                 "failed": 0
                             },
                             "_seq_no": 13,
                             "_primary_term": 1,
                             "status": 201
                         }
                     },
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20570",
                             "_version": 1,
                             "result": "created",
                             "_shards": {
                                 "total": 2,
                                 "successful": 1,
                                 "failed": 0
                             },
                             "_seq_no": 14,
                             "_primary_term": 1,
                             "status": 201
                         }
                     },
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "71830481",
                             "_version": 1,
                             "result": "created",
                             "_shards": {
                                 "total": 2,
                                 "successful": 1,
                                 "failed": 0
                             },
                             "_seq_no": 15,
                             "_primary_term": 1,
                             "status": 201
                         }
                     },
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "2550411",
                             "_version": 1,
                             "result": "created",
                             "_shards": {
                                 "total": 2,
                                 "successful": 1,
                                 "failed": 0
                             },
                             "_seq_no": 16,
                             "_primary_term": 1,
                             "status": 201
                         }
                     },
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "45065",
                             "_version": 1,
                             "result": "created",
                             "_shards": {
                                 "total": 2,
                                 "successful": 1,
                                 "failed": 0
                             },
                             "_seq_no": 17,
                             "_primary_term": 1,
                             "status": 201
                         }
                     },
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20969",
                             "_version": 1,
                             "result": "created",
                             "_shards": {
                                 "total": 2,
                                 "successful": 1,
                                 "failed": 0
                             },
                             "_seq_no": 18,
                             "_primary_term": 1,
                             "status": 201
                         }
                     },
                     {
                         "create": {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20959",
                             "_version": 1,
                             "result": "created",
                             "_shards": {
                                 "total": 2,
                                 "successful": 1,
                                 "failed": 0
                             },
                             "_seq_no": 19,
                             "_primary_term": 1,
                             "status": 201
                         }
                     }
                 ]
             }
```

### 文档 多条件查询 must (相当于数据库and)

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "CRAFT_NAME": "芒果"
          }
        },
        {
          "match": {
            "AG_PRICE": "10"
          }
        }
      ]
    }
  },
  "from": "1",
  "size": "2",
  "_source": [
    "AG_PRICE",
    "CRAFT_NAME",
    "C_UNIT",
    "EUD_NAME",
    "ID"
  ],
  "sort": {
    "AG_PRICE": {
      "order": "desc"
    },
    "ID": {
      "order": "asc"
    }
  }
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
let result = {
                 "took": 101,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 2,
                         "relation": "eq"
                     },
                     "max_score": null,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "zhV_fIkB5CwRTRdtywp8",
                             "_score": null,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "ID": 71860010,
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             },
                             "sort": [
                                 10.0,
                                 71860010
                             ]
                         }
                     ]
                 }
             }
```

### 文档 多条件查询 should (相当于数据库or)

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "CRAFT_NAME": "芒果"
          }
        },
        {
          "match": {
            "CRAFT_NAME": "猕猴桃"
          }
        }
      ]
    }
  },
  "from": "1",
  "size": "2",
  "_source": [
    "AG_PRICE",
    "CRAFT_NAME",
    "C_UNIT",
    "EUD_NAME",
    "ID"
  ],
  "sort": {
    "AG_PRICE": {
      "order": "desc"
    },
    "ID": {
      "order": "asc"
    }
  }
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
let result = {
                 "took": 7,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 14,
                         "relation": "eq"
                     },
                     "max_score": null,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20540",
                             "_score": null,
                             "_source": {
                                 "AG_PRICE": 18,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "ID": 20540,
                                 "EUD_NAME": "北京朝阳区大洋路综合市场"
                             },
                             "sort": [
                                 18.0,
                                 20540
                             ]
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "TxVFfIkB5CwRTRdtMwUW",
                             "_score": null,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "ID": 71860010,
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             },
                             "sort": [
                                 14.5,
                                 71860010
                             ]
                         }
                     ]
                 }
             }
```

### 文档 多条件查询 range 范围

filter 过滤
range 所有数字范围
gt 大于


```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "CRAFT_NAME": "芒果"
          }
        },
        {
          "match": {
            "CRAFT_NAME": "猕猴桃"
          }
        }
      ],
      "filter": {
        "range": {
          "AG_PRICE": {
            "gt": "14"
          }
        }
      }
    }
  },
  "from": "1",
  "size": "12",
  "_source": [
    "AG_PRICE",
    "CRAFT_NAME",
    "C_UNIT",
    "EUD_NAME",
    "ID"
  ],
  "sort": {
    "AG_PRICE": {
      "order": "desc"
    },
    "ID": {
      "order": "asc"
    }
  }
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

let result = {
                 "took": 2,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 4,
                         "relation": "eq"
                     },
                     "max_score": null,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20540",
                             "_score": null,
                             "_source": {
                                 "AG_PRICE": 18,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "ID": 20540,
                                 "EUD_NAME": "北京朝阳区大洋路综合市场"
                             },
                             "sort": [
                                 18.0,
                                 20540
                             ]
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "TxVFfIkB5CwRTRdtMwUW",
                             "_score": null,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "ID": 71860010,
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             },
                             "sort": [
                                 14.5,
                                 71860010
                             ]
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "YhVwfIkB5CwRTRdtrgkD",
                             "_score": null,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "ID": 71860010,
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             },
                             "sort": [
                                 14.5,
                                 71860010
                             ]
                         }
                     ]
                 }
             }
```


### 文档 全文检索

+ 查出  芒果和猕猴桃   只需要 芒猕就行

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "match": {
      "CRAFT_NAME": "芒猕"
    }
  },
  "from": "1",
  "size": "10"
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
let result = {
                 "took": 3,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 14,
                         "relation": "eq"
                     },
                     "max_score": 1.5917585,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "YhVwfIkB5CwRTRdtrgkD",
                             "_score": 1.5917585,
                             "_source": {
                                 "AG_PRICE": 14.5,
                                 "CRAFT_NAME": "猕猴桃",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13201",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "pBV-fIkB5CwRTRdtEgqc",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "zhV_fIkB5CwRTRdtywp8",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "6hUAfYkB5CwRTRdtOxYR",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 12,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689955200000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1690011319000,
                                 "ID": 20959,
                                 "P_INDEX": "320401",
                                 "EUD_PIC": "/tc/20200817104333886984.jpg",
                                 "EUD_NAME": "江苏凌家塘市场发展有限公司"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20540",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 18,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689955200000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1690011326000,
                                 "ID": 20540,
                                 "P_INDEX": "110500",
                                 "EUD_PIC": "/tc/20210328232229261943.jpg",
                                 "EUD_NAME": "北京朝阳区大洋路综合市场"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20531",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 14,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689955200000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1690011312000,
                                 "ID": 20531,
                                 "P_INDEX": "110600",
                                 "EUD_PIC": "/tc/20210422093833425915.jpeg",
                                 "EUD_NAME": "北京新发地农副产品批发市场信息中心"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20536",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 20,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689955200000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1690011334000,
                                 "ID": 20536,
                                 "P_INDEX": "111200",
                                 "EUD_PIC": "/tc/20210330163120050216.jpg",
                                 "EUD_NAME": "北京八里桥农产品中心批发市场有限公司"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20570",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 8,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689955200000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1690011326000,
                                 "ID": 20570,
                                 "P_INDEX": "121100",
                                 "EUD_PIC": "/tc/20200330233852289284.jpg",
                                 "EUD_NAME": "天津市红旗农贸综合批发市场有限公司"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "71830481",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 6,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689955200000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1690011322000,
                                 "ID": 71830481,
                                 "P_INDEX": "140107",
                                 "EUD_PIC": "/tc/20220412164849161585.jpg",
                                 "EUD_NAME": "山西太原丈子头农产品物流园（原城东利民）"
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "2550411",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 6,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689955200000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1690011323000,
                                 "ID": 2550411,
                                 "P_INDEX": "140109",
                                 "EUD_PIC": "/tc/20201104152043439244.jpg",
                                 "EUD_NAME": "山西省太原市河西农产品有限公司"
                             }
                         }
                     ]
                 }
             }
```


### 文档 全文检索(完全匹配)
> 查询特殊字段 高亮显示

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query": {
    "match_phrase": {
      "CRAFT_NAME": "芒"
    }
  },
  "from": "1",
  "size": "3",
  "highlight": {
    "fields": {
      "CRAFT_NAME": {}
    }
  }
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
let result = {
                 "took": 4,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 12,
                         "relation": "eq"
                     },
                     "max_score": 0.25333747,
                     "hits": [
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "zhV_fIkB5CwRTRdtywp8",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 10,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689782400000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1689838523000,
                                 "ID": 71860010,
                                 "P_INDEX": "370828",
                                 "EUD_PIC": "/tc/20220211134437904645.jpg",
                                 "EUD_NAME": "山东凯盛国际农产品物流城"
                             },
                             "highlight": {
                                 "CRAFT_NAME": [
                                     "<em>芒</em>果"
                                 ]
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "6hUAfYkB5CwRTRdtOxYR",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 12,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689955200000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1690011319000,
                                 "ID": 20959,
                                 "P_INDEX": "320401",
                                 "EUD_PIC": "/tc/20200817104333886984.jpg",
                                 "EUD_NAME": "江苏凌家塘市场发展有限公司"
                             },
                             "highlight": {
                                 "CRAFT_NAME": [
                                     "<em>芒</em>果"
                                 ]
                             }
                         },
                         {
                             "_index": "shopping",
                             "_type": "_doc",
                             "_id": "20540",
                             "_score": 0.25333747,
                             "_source": {
                                 "AG_PRICE": 18,
                                 "CRAFT_NAME": "芒果",
                                 "C_UNIT": "元/公斤",
                                 "GET_P_DATE": 1689955200000,
                                 "CRAFT_INDEX": "13228",
                                 "PAR_INDEX": 13076,
                                 "PROMULGATE_DATE": 1690011326000,
                                 "ID": 20540,
                                 "P_INDEX": "110500",
                                 "EUD_PIC": "/tc/20210328232229261943.jpg",
                                 "EUD_NAME": "北京朝阳区大洋路综合市场"
                             },
                             "highlight": {
                                 "CRAFT_NAME": [
                                     "<em>芒</em>果"
                                 ]
                             }
                         }
                     ]
                 }
             }
```

### 文档 统计分组
> "size":"0" 加上可以把原始数据去掉

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "aggs": {
    "price_group": {
      "terms": {
        "field": "AG_PRICE"
      }
    }
  },
  "size": "0"
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
let result = {
                 "took": 9,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 15,
                         "relation": "eq"
                     },
                     "max_score": null,
                     "hits": []
                 },
                 "aggregations": {
                     "price_group": {
                         "doc_count_error_upper_bound": 0,
                         "sum_other_doc_count": 0,
                         "buckets": [
                             {
                                 "key": 8.0,
                                 "doc_count": 3
                             },
                             {
                                 "key": 6.0,
                                 "doc_count": 2
                             },
                             {
                                 "key": 10.0,
                                 "doc_count": 2
                             },
                             {
                                 "key": 12.0,
                                 "doc_count": 2
                             },
                             {
                                 "key": 14.5,
                                 "doc_count": 2
                             },
                             {
                                 "key": 4.300000190734863,
                                 "doc_count": 1
                             },
                             {
                                 "key": 14.0,
                                 "doc_count": 1
                             },
                             {
                                 "key": 18.0,
                                 "doc_count": 1
                             },
                             {
                                 "key": 20.0,
                                 "doc_count": 1
                             }
                         ]
                     }
                 }
             } ;
```

### 文档 计算平均值
> "size":"0" 加上可以把原始数据去掉


```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "aggs": {
    "price_avg": {
      "avg": {
        "field": "AG_PRICE"
      }
    }
  },
  "size": "0"
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/shopping/_search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
let result = {
                 "took": 1,
                 "timed_out": false,
                 "_shards": {
                     "total": 1,
                     "successful": 1,
                     "skipped": 0,
                     "failed": 0
                 },
                 "hits": {
                     "total": {
                         "value": 15,
                         "relation": "eq"
                     },
                     "max_score": null,
                     "hits": []
                 },
                 "aggregations": {
                     "price_avg": {
                         "value": 11.020000012715657
                     }
                 }
             }
```


### 文档映射关系

```javascript
// 创建索引

/*
var requestOptions = {
  method: 'PUT',
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/user", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
**/

/*
{

	"properties":{
		"name":{
			"type":"text",//可以分词
			"index":"true"//表示这个字段可以索引查询
			
		},
		"sex":{
			"type":"keyword",//表示不能够分词
			"index":"true"//表示这个字段可以索引查询
			
		},
		"tel":{
			"type":"keyword",//表示不能够分词
			"index":"false"//表示这个字段不可以索引查询
			
		}
	}
}
**/

//创建映射关系

/*
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "properties": {
    "name": {
      "type": "text",
      "index": "true"
    },
    "sex": {
      "type": "keyword",
      "index": "true"
    },
    "tel": {
      "type": "keyword",
      "index": "false"
    }
  }
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:9200/user/_mapping", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
**/


//批量新增 user

/*
http://127.0.0.1:9200/user/_doc/_bulk

{"create":{"_index":"user","_type":"_doc","_id":1}}
{"name":"李世民","sex":"男的","tel":"0000"}


{"create":{"_index":"user","_type":"_doc","_id":2}}
{"name":"赵飞燕","sex":"女","tel":"1111"}

{"create":{"_index":"user","_type":"_doc","_id":3}}
{"name":"李世绩","sex":"男的","tel":"2232"}

{"create":{"_index":"user","_type":"_doc","_id":4}}
{"name":"妲己","sex":"女","tel":"4334"}



**/

```

+ 查询 http://127.0.0.1:9200/user/_search

```json
{

    "query":{
        "match":{
            "name":"李"
        }
    }

}
//"李" 全文匹配
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 2,
            "relation": "eq"
        },
        "max_score": 0.6682933,
        "hits": [
            {
                "_index": "user",
                "_type": "_doc",
                "_id": "1",
                "_score": 0.6682933,
                "_source": {
                    "name": "李世民",
                    "sex": "男",
                    "tel": "0000"
                }
            },
            {
                "_index": "user",
                "_type": "_doc",
                "_id": "3",
                "_score": 0.6682933,
                "_source": {
                    "name": "李世绩",
                    "sex": "男",
                    "tel": "2232"
                }
            }
        ]
    }
}

```
//必须完全匹配
{

    "query":{
        "match":{
            "sex":"男的"
        }
    }

}

{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 2,
            "relation": "eq"
        },
        "max_score": 0.6931471,
        "hits": [
            {
                "_index": "user",
                "_type": "_doc",
                "_id": "1",
                "_score": 0.6931471,
                "_source": {
                    "name": "李世民",
                    "sex": "男的",
                    "tel": "0000"
                }
            },
            {
                "_index": "user",
                "_type": "_doc",
                "_id": "3",
                "_score": 0.6931471,
                "_source": {
                    "name": "李世绩",
                    "sex": "男的",
                    "tel": "2232"
                }
            }
        ]
    }
}


```json
{

    "query":{
        "match":{
            "tel":"4334"
        }
    }

}
// tel 不支持索引查询
{
    "error": {
        "root_cause": [
            {
                "type": "query_shard_exception",
                "reason": "failed to create query: Cannot search on field [tel] since it is not indexed.",
                "index_uuid": "ApOVvoz4QECdoA6RR4-UZg",
                "index": "user"
            }
        ],
        "type": "search_phase_execution_exception",
        "reason": "all shards failed",
        "phase": "query",
        "grouped": true,
        "failed_shards": [
            {
                "shard": 0,
                "index": "user",
                "node": "Jf6x5_1DTISSmQXznC4zsQ",
                "reason": {
                    "type": "query_shard_exception",
                    "reason": "failed to create query: Cannot search on field [tel] since it is not indexed.",
                    "index_uuid": "ApOVvoz4QECdoA6RR4-UZg",
                    "index": "user",
                    "caused_by": {
                        "type": "illegal_argument_exception",
                        "reason": "Cannot search on field [tel] since it is not indexed."
                    }
                }
            }
        ]
    },
    "status": 400
}
```


