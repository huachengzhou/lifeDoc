---
title: "ik分词器(analysis)"
date: 2020-01-17T15:26:15Z
draft: false
weight: 1
---

# 分词器



## 什么是 Analysis

顾名思义，文本分析就是把全文本转换成一系列单词（term/token）的过程，也叫分词。在 ES 中，Analysis 是通过分词器（Analyzer） 来实现的，可使用 ES 内置的分析器或者按需定制化分析器。

举一个分词简单的例子：比如你输入 Mastering Elasticsearch，会自动帮你分成两个单词，一个是 mastering，另一个是 elasticsearch，可以看出单词也被转化成了小写的。

![][img_ik]
![][img_ik_]



## 分词器的组成

> 分词器是专门处理分词的组件，分词器由以下三部分组成：

+ Character Filters：针对原始文本处理，比如去除 html 标签
+ Tokenizer：按照规则切分为单词，比如按照空格切分
+ Token Filters：将切分的单词进行加工，比如大写转小写，删除 stopwords，增加同义语


![][img_2]
![][img_2_]



同时 Analyzer 三个部分也是有顺序的，从图中可以看出，从上到下依次经过 Character Filters，Tokenizer 以及 Token Filters，这个顺序比较好理解，一个文本进来肯定要先对文本数据进行处理，再去分词，最后对分词的结果进行过滤。

## ES 分词器

### 默认分词器 (Stamdard Analyzer)

```js
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "analyzer": "standard",
  "text": "In 2020, Java is the best language in the world."
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:9200/_analyze", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

var result = {
                 "tokens": [
                     {
                         "token": "in",
                         "start_offset": 0,
                         "end_offset": 2,
                         "type": "<ALPHANUM>",
                         "position": 0
                     },
                     {
                         "token": "2020",
                         "start_offset": 3,
                         "end_offset": 7,
                         "type": "<NUM>",
                         "position": 1
                     },
                     {
                         "token": "java",
                         "start_offset": 9,
                         "end_offset": 13,
                         "type": "<ALPHANUM>",
                         "position": 2
                     },
                     {
                         "token": "is",
                         "start_offset": 14,
                         "end_offset": 16,
                         "type": "<ALPHANUM>",
                         "position": 3
                     },
                     {
                         "token": "the",
                         "start_offset": 17,
                         "end_offset": 20,
                         "type": "<ALPHANUM>",
                         "position": 4
                     },
                     {
                         "token": "best",
                         "start_offset": 21,
                         "end_offset": 25,
                         "type": "<ALPHANUM>",
                         "position": 5
                     },
                     {
                         "token": "language",
                         "start_offset": 26,
                         "end_offset": 34,
                         "type": "<ALPHANUM>",
                         "position": 6
                     },
                     {
                         "token": "in",
                         "start_offset": 35,
                         "end_offset": 37,
                         "type": "<ALPHANUM>",
                         "position": 7
                     },
                     {
                         "token": "the",
                         "start_offset": 38,
                         "end_offset": 41,
                         "type": "<ALPHANUM>",
                         "position": 8
                     },
                     {
                         "token": "world",
                         "start_offset": 42,
                         "end_offset": 47,
                         "type": "<ALPHANUM>",
                         "position": 9
                     }
                 ]
             }
```

### elasticsearch-analysis-ik

> 中文轻量级分词器

+ [下载7.8](https://github.com/medcl/elasticsearch-analysis-ik/archive/refs/tags/v7.8.0.zip)
+ [下载其它版本](https://github.com/medcl/elasticsearch-analysis-ik/tags)

+ 解压

将文件复制到 es的安装目录/plugin/ik下面即可

+ 解压后文件树

```shell
 \plugins\ik\commons-codec-1.9.jar
    \plugins\ik\commons-logging-1.2.jar
      \plugins\ik\config\extra_main.dic
      \plugins\ik\config\extra_single_word.dic
      \plugins\ik\config\extra_single_word_full.dic
      \plugins\ik\config\extra_single_word_low_freq.dic
      \plugins\ik\config\extra_stopword.dic
      \plugins\ik\config\IKAnalyzer.cfg.xml
      \plugins\ik\config\main.dic
      \plugins\ik\config\preposition.dic
      \plugins\ik\config\quantifier.dic
      \plugins\ik\config\stopword.dic
      \plugins\ik\config\suffix.dic
      \plugins\ik\config\surname.dic
    \plugins\ik\elasticsearch-analysis-ik-7.8.0.jar
    \plugins\ik\httpclient-4.5.2.jar
    \plugins\ik\httpcore-4.4.4.jar
    \plugins\ik\plugin-descriptor.properties
    \plugins\ik\plugin-security.policy
```

到这里已经完成了，不需要去elasticSearch的 elasticsearch.yml 文件去配置


+ 重启

重启ElasticSearch

```shell
future versions of Elasticsearch will require Java 11; your Java version from [C:\Program Files\Java\jdk1.8.0_321\jre] does not meet this requirement
future versions of Elasticsearch will require Java 11; your Java version from [C:\Program Files\Java\jdk1.8.0_321\jre] does not meet this requirement
Warning: with JDK 8 on Windows, Elasticsearch may be unable to derive correct
  ergonomic settings due to a JDK issue (JDK-8074459). Please use a newer
  version of Java.
Warning: MaxDirectMemorySize may have been miscalculated due to JDK-8074459.
  Please use a newer version of Java or set MaxDirectMemorySize explicitly.
[2023-07-30T14:32:05,595][INFO ][o.e.n.Node               ] [DESKTOP-CCD057N] version[7.8.0], pid[16040], build[default/zip/757314695644ea9a1dc2fecd26d1a43856725e65/2020-06-14T19:35:50.234439Z], OS[Windows 10/10.0/amd64], JVM[Oracle Corporation/Java HotSpot(TM) 64-Bit Server VM/1.8.0_321/25.321-b07]
[2023-07-30T14:32:05,622][INFO ][o.e.n.Node               ] [DESKTOP-CCD057N] JVM home [C:\Program Files\Java\jdk1.8.0_321\jre]
[2023-07-30T14:32:05,622][INFO ][o.e.n.Node               ] [DESKTOP-CCD057N] JVM arguments [-Des.networkaddress.cache.ttl=60, -Des.networkaddress.cache.negative.ttl=10, -XX:+AlwaysPreTouch, -Xss1m, -Djava.awt.headless=true, -Dfile.encoding=UTF-8, -Djna.nosys=true, -XX:-OmitStackTraceInFastThrow, -Dio.netty.noUnsafe=true, -Dio.netty.noKeySetOptimization=true, -Dio.netty.recycler.maxCapacityPerThread=0, -Dio.netty.allocator.numDirectArenas=0, -Dlog4j.shutdownHookEnabled=false, -Dlog4j2.disable.jmx=true, -Djava.locale.providers=SPI,JRE, -Xms1g, -Xmx1g, -XX:+UseConcMarkSweepGC, -XX:CMSInitiatingOccupancyFraction=75, -XX:+UseCMSInitiatingOccupancyOnly, -Djava.io.tmpdir=C:\Users\noatn\AppData\Local\Temp\elasticsearch, -XX:+HeapDumpOnOutOfMemoryError, -XX:HeapDumpPath=data, -XX:ErrorFile=logs/hs_err_pid%p.log, -XX:+PrintGCDetails, -XX:+PrintGCDateStamps, -XX:+PrintTenuringDistribution, -XX:+PrintGCApplicationStoppedTime, -Xloggc:logs/gc.log, -XX:+UseGCLogFileRotation, -XX:NumberOfGCLogFiles=32, -XX:GCLogFileSize=64m, -XX:MaxDirectMemorySize=536870912, -Delasticsearch, -Des.path.home=D:\CS\elasticsearch_or_kibana\7.8\elasticsearch-7.8.0, -Des.path.conf=D:\CS\elasticsearch_or_kibana\7.8\elasticsearch-7.8.0\config, -Des.distribution.flavor=default, -Des.distribution.type=zip, -Des.bundled_jdk=true]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [aggs-matrix-stats]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [analysis-common]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [constant-keyword]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [flattened]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [frozen-indices]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [ingest-common]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [ingest-geoip]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [ingest-user-agent]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [kibana]
[2023-07-30T14:32:11,928][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [lang-expression]
[2023-07-30T14:32:11,958][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [lang-mustache]
[2023-07-30T14:32:11,960][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [lang-painless]
[2023-07-30T14:32:11,962][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [mapper-extras]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [parent-join]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [percolator]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [rank-eval]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [reindex]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [repository-url]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [search-business-rules]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [searchable-snapshots]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [spatial]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [tasks]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [transform]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [transport-netty4]
[2023-07-30T14:32:11,966][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [vectors]
[2023-07-30T14:32:11,982][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-analytics]
[2023-07-30T14:32:11,982][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-async-search]
[2023-07-30T14:32:11,982][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-autoscaling]
[2023-07-30T14:32:11,982][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-ccr]
[2023-07-30T14:32:11,982][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-core]
[2023-07-30T14:32:11,982][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-deprecation]
[2023-07-30T14:32:11,982][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-enrich]
[2023-07-30T14:32:11,982][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-eql]
[2023-07-30T14:32:11,982][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-graph]
[2023-07-30T14:32:11,998][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-identity-provider]
[2023-07-30T14:32:11,998][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-ilm]
[2023-07-30T14:32:12,005][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-logstash]
[2023-07-30T14:32:12,005][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-ml]
[2023-07-30T14:32:12,005][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-monitoring]
[2023-07-30T14:32:12,005][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-ql]
[2023-07-30T14:32:12,005][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-rollup]
[2023-07-30T14:32:12,005][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-security]
[2023-07-30T14:32:12,005][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-sql]
[2023-07-30T14:32:12,014][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-voting-only-node]
[2023-07-30T14:32:12,015][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded module [x-pack-watcher]
[2023-07-30T14:32:12,020][INFO ][o.e.p.PluginsService     ] [DESKTOP-CCD057N] loaded plugin [analysis-ik]
[2023-07-30T14:32:12,550][INFO ][o.e.e.NodeEnvironment    ] [DESKTOP-CCD057N] using [1] data paths, mounts [[(D:)]], net usable_space [174.3gb], net total_space [443.2gb], types [NTFS]
[2023-07-30T14:32:12,550][INFO ][o.e.e.NodeEnvironment    ] [DESKTOP-CCD057N] heap size [989.8mb], compressed ordinary object pointers [true]
[2023-07-30T14:32:13,010][INFO ][o.e.n.Node               ] [DESKTOP-CCD057N] node name [DESKTOP-CCD057N], node ID [Jf6x5_1DTISSmQXznC4zsQ], cluster name [elasticsearch]
[2023-07-30T14:32:20,649][INFO ][o.e.x.s.a.s.FileRolesStore] [DESKTOP-CCD057N] parsed [0] roles from file [D:\CS\elasticsearch_or_kibana\7.8\elasticsearch-7.8.0\config\roles.yml]
[2023-07-30T14:32:21,746][INFO ][o.e.x.m.p.l.CppLogMessageHandler] [DESKTOP-CCD057N] [controller/8512] [Main.cc@110] controller (64 bit): Version 7.8.0 (Build 58ff6912e20047) Copyright (c) 2020 Elasticsearch BV
[2023-07-30T14:32:23,029][INFO ][o.e.d.DiscoveryModule    ] [DESKTOP-CCD057N] using discovery type [zen] and seed hosts providers [settings]
[2023-07-30T14:32:24,444][INFO ][o.e.n.Node               ] [DESKTOP-CCD057N] initialized
[2023-07-30T14:32:24,455][INFO ][o.e.n.Node               ] [DESKTOP-CCD057N] starting ...
[2023-07-30T14:32:26,772][INFO ][o.e.t.TransportService   ] [DESKTOP-CCD057N] publish_address {127.0.0.1:9300}, bound_addresses {127.0.0.1:9300}, {[::1]:9300}
[2023-07-30T14:32:27,591][WARN ][o.e.b.BootstrapChecks    ] [DESKTOP-CCD057N] the default discovery settings are unsuitable for production use; at least one of [discovery.seed_hosts, discovery.seed_providers, cluster.initial_master_nodes] must be configured
[2023-07-30T14:32:27,591][INFO ][o.e.c.c.Coordinator      ] [DESKTOP-CCD057N] cluster UUID [iYr4n6mARy2LAfFsKzIMOA]
[2023-07-30T14:32:27,624][INFO ][o.e.c.c.ClusterBootstrapService] [DESKTOP-CCD057N] no discovery configuration found, will perform best-effort cluster bootstrapping after [3s] unless existing master is discovered
[2023-07-30T14:32:27,842][INFO ][o.e.c.s.MasterService    ] [DESKTOP-CCD057N] elected-as-master ([1] nodes joined)[{DESKTOP-CCD057N}{Jf6x5_1DTISSmQXznC4zsQ}{8nAsfgHRT72wU_-VwD7IAA}{127.0.0.1}{127.0.0.1:9300}{dilmrt}{ml.machine_memory=17033023488, xpack.installed=true, transform.node=true, ml.max_open_jobs=20} elect leader, _BECOME_MASTER_TASK_, _FINISH_ELECTION_], term: 9, version: 189, delta: master node changed {previous [], current [{DESKTOP-CCD057N}{Jf6x5_1DTISSmQXznC4zsQ}{8nAsfgHRT72wU_-VwD7IAA}{127.0.0.1}{127.0.0.1:9300}{dilmrt}{ml.machine_memory=17033023488, xpack.installed=true, transform.node=true, ml.max_open_jobs=20}]}
[2023-07-30T14:32:28,079][INFO ][o.e.c.s.ClusterApplierService] [DESKTOP-CCD057N] master node changed {previous [], current [{DESKTOP-CCD057N}{Jf6x5_1DTISSmQXznC4zsQ}{8nAsfgHRT72wU_-VwD7IAA}{127.0.0.1}{127.0.0.1:9300}{dilmrt}{ml.machine_memory=17033023488, xpack.installed=true, transform.node=true, ml.max_open_jobs=20}]}, term: 9, version: 189, reason: Publication{term=9, version=189}
[2023-07-30T14:32:28,857][INFO ][o.e.l.LicenseService     ] [DESKTOP-CCD057N] license [ec3ec33c-9703-4a5a-8717-a3ef82d465a1] mode [basic] - valid
[2023-07-30T14:32:28,862][INFO ][o.e.x.s.s.SecurityStatusChangeListener] [DESKTOP-CCD057N] Active license is now [BASIC]; Security is disabled
[2023-07-30T14:32:28,880][INFO ][o.e.g.GatewayService     ] [DESKTOP-CCD057N] recovered [12] indices into cluster_state
[2023-07-30T14:32:29,253][INFO ][o.w.a.d.Dictionary       ] [DESKTOP-CCD057N] try load config from D:\CS\elasticsearch_or_kibana\7.8\elasticsearch-7.8.0\config\analysis-ik\IKAnalyzer.cfg.xml
[2023-07-30T14:32:29,253][INFO ][o.w.a.d.Dictionary       ] [DESKTOP-CCD057N] try load config from D:\CS\elasticsearch_or_kibana\7.8\elasticsearch-7.8.0\plugins\ik\config\IKAnalyzer.cfg.xml
[2023-07-30T14:32:29,756][INFO ][o.e.h.AbstractHttpServerTransport] [DESKTOP-CCD057N] publish_address {127.0.0.1:9200}, bound_addresses {127.0.0.1:9200}, {[::1]:9200}
[2023-07-30T14:32:29,757][INFO ][o.e.n.Node               ] [DESKTOP-CCD057N] started
[2023-07-30T14:32:36,410][INFO ][o.e.c.r.a.AllocationService] [DESKTOP-CCD057N] Cluster health status changed from [RED] to [YELLOW] (reason: [shards started [[.kibana_task_manager_1][0]]]).
[2023-07-30T14:36:17,444][INFO ][o.e.c.m.MetadataCreateIndexService] [DESKTOP-CCD057N] [book2] creating index, cause [api], templates [], shards [1]/[1], mappings []
```

+ 测试

```js
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "text": "我是中国人"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:9200/book2/_analyze", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
var result = {
                 "tokens": [
                     {
                         "token": "我",
                         "start_offset": 0,
                         "end_offset": 1,
                         "type": "<IDEOGRAPHIC>",
                         "position": 0
                     },
                     {
                         "token": "是",
                         "start_offset": 1,
                         "end_offset": 2,
                         "type": "<IDEOGRAPHIC>",
                         "position": 1
                     },
                     {
                         "token": "中",
                         "start_offset": 2,
                         "end_offset": 3,
                         "type": "<IDEOGRAPHIC>",
                         "position": 2
                     },
                     {
                         "token": "国",
                         "start_offset": 3,
                         "end_offset": 4,
                         "type": "<IDEOGRAPHIC>",
                         "position": 3
                     },
                     {
                         "token": "人",
                         "start_offset": 4,
                         "end_offset": 5,
                         "type": "<IDEOGRAPHIC>",
                         "position": 4
                     }
                 ]
             }
```


+ 使用IK分词器之后，结果如下

```js
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "analyzer": "ik_max_word",
  "text": "中华人民共和国"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:9200/book2/_analyze", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
var result = {
                 "tokens": [
                     {
                         "token": "中华人民共和国",
                         "start_offset": 0,
                         "end_offset": 7,
                         "type": "CN_WORD",
                         "position": 0
                     },
                     {
                         "token": "中华人民",
                         "start_offset": 0,
                         "end_offset": 4,
                         "type": "CN_WORD",
                         "position": 1
                     },
                     {
                         "token": "中华",
                         "start_offset": 0,
                         "end_offset": 2,
                         "type": "CN_WORD",
                         "position": 2
                     },
                     {
                         "token": "华人",
                         "start_offset": 1,
                         "end_offset": 3,
                         "type": "CN_WORD",
                         "position": 3
                     },
                     {
                         "token": "人民共和国",
                         "start_offset": 2,
                         "end_offset": 7,
                         "type": "CN_WORD",
                         "position": 4
                     },
                     {
                         "token": "人民",
                         "start_offset": 2,
                         "end_offset": 4,
                         "type": "CN_WORD",
                         "position": 5
                     },
                     {
                         "token": "共和国",
                         "start_offset": 4,
                         "end_offset": 7,
                         "type": "CN_WORD",
                         "position": 6
                     },
                     {
                         "token": "共和",
                         "start_offset": 4,
                         "end_offset": 6,
                         "type": "CN_WORD",
                         "position": 7
                     },
                     {
                         "token": "国",
                         "start_offset": 6,
                         "end_offset": 7,
                         "type": "CN_CHAR",
                         "position": 8
                     }
                 ]
             }
```

+ 对于上面两个分词效果的解释：

如果未安装ik分词器，那么，你如果写 “analyzer”: “ik_max_word”，那么程序就会报错，因为你没有安装ik分词器

如果你安装了ik分词器之后，你不指定分词器，不加上 “analyzer”: “ik_max_word” 这句话，那么其分词效果跟你没有安装ik分词器是一致的，也是分词成每个汉字。

### ik分词器的分词类型

+ **ik_max_word**： 会将文本做最细粒度的拆分，比如会将“中华人民共和国国歌”拆分为“中华人民共和国,中华人民,中华,华人,人民共和国,人民,人,民,共和国,共和,和,国国,国歌”，会穷尽各种可能的组合；

+ **ik_smart**： 会做最粗粒度的拆分，比如会将“中华人民共和国国歌”拆分为“中华人民共和国,国歌”。



## language 分词器

 [language 分词器地址](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html)

> 一个用于解析特殊语言文本的analyzer集合。（ arabic,armenian, basque, brazilian, bulgarian, catalan, cjk, czech, danish, dutch, english, finnish, french,galician, german, greek, hindi, hungarian, indonesian, irish, italian, latvian, lithuanian, norwegian,persian, portuguese, romanian, russian, sorani, spanish, swedish, turkish, thai.）可惜没有中文。不予考虑


## snowball 分词器

## Whitespace 分词器
[地址](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-whitespace-analyzer.html)

[img_ik]:../../.././imgs/elasticsearch/image/ik1.png
[img_ik_]:../../../../imgs/elasticsearch/image/ik1.png

[img_2]:../../.././imgs/elasticsearch/image/2023-07-30_151158.png
[img_2_]:../../../../imgs/elasticsearch/image/2023-07-30_151158.png
