---
title: "Java API SolrJ 的使用"
date: 2023-08-15
draft: false
weight: 3
---


# Java API SolrJ 的使用

## 一、SolrJ 简介


SolrJ 是操作 Solr 的 Java 客户端，它提供了增加、修改、删除、查询 Solr 索引的 Java 接口。通过 SolrJ 提供的 API 接口来操作 Solr 服务，SolrJ 底层是通过使用 httpClient 中的方法来完成 Solr的操作。


## 二、SolrJ 核心类 SolrClient

* SolrClient 有一些具体的实现，每个实现都针对不同的使用模式或弹性模型：

    * HttpSolrClient- 面向以查询为中心的工作负载，但也是一个很好的通用客户端。直接与单个 Solr 节点通信。

    * Http2SolrClient- 利用 HTTP/2 的异步、非阻塞和通用客户端。这个类是实验性的，因此它的 API 可能会在 SolrJ 的次要版本中更改或删除。

    * LBHttpSolrClient- 在 Solr 节点列表之间平衡请求负载。根据节点健康状况调整“服务中”节点列表。

    * LBHttp2SolrClient- 就像 LBHttpSolrClient 而是使用 Http2SolrClient。这个类是实验性的，因此它的 API 可能会在 SolrJ 的次要版本中更改或删除。

    * CloudSolrClient- 面向与 SolrCloud 部署通信。使用已经记录的 ZooKeeper 状态来发现请求并将其路由到健康的 Solr 节点。

    * ConcurrentUpdateSolrClient- 面向以索引为中心的工作负载。在将更大的批次发送到 Solr 之前在内部缓冲文档。

    * ConcurrentUpdateHttp2SolrClient- 就像 ConcurrentUpdateSolrClient 而是使用 Http2SolrClient。这个类是实验性的，因此它的 API 可能会在 SolrJ 的次要版本中更改或删除。



SolrJ 所有 API 接口Solr 8.11.0 solr-solrj API。



### 三、SolrClient 类的简单使用（增删改查）

在使用前先引入 SolrJ 依赖

```xml
<dependency>
  <groupId>org.apache.solr</groupId>
  <artifactId>solr-solrj</artifactId>
  <version>8.11.0</version>
</dependency>
```


+ 1、添加文档

```java
@Test
public void testAdd() throws Exception{
	//1.创建连接
	HttpSolrClient solrServer = new HttpSolrClient.Builder("http://localhost:8983/solr/solrTest").build();
    for (int i = 1; i <= 10; i++){ 
        //2.创建一个文档对象
	    SolrInputDocument inputDocument = new SolrInputDocument();
	    //向文档中添加域以及对应的值(注意：所有的域必须在schema.xml中定义过,前两篇导入时已定义)
	    inputDocument.addField("id", i);
	    inputDocument.addField("name", "名称"+i);
	    inputDocument.addField("content", "内容"+i);
	    //3.将文档写入索引库中
	    solrServer.add(inputDocument); 
    }	
    
	//4.提交
	solrServer.commit();
}
```

+ 2、更新文档(其实更新的内容不存在则是新增)

```java
@Test
public void testUpdate() throws Exception{
	//1.创建连接
	HttpSolrClient solrServer = new HttpSolrClient.Builder("http://localhost:8983/solr/solrTest").build();
	//2.创建一个文档对象
	SolrInputDocument inputDocument = new SolrInputDocument();
	inputDocument.addField("id", "1");
	//修改id为1的信息(信息存在则更新，不存在则新增)
	inputDocument.addField("name", "名称1");
	inputDocument.addField("content", "内容1");
	//3.将文档写入索引库中
	solrServer.add(inputDocument);
	//4.提交
	solrServer.commit();
}
```

+ 3、查询单个

```java
@Test
public void testQuery() throws Exception{
	//1.创建连接
	HttpSolrClient solrServer = new HttpSolrClient.Builder("http://localhost:8983/solr/solrTest").build();
	//2.创建查询语句
	SolrQuery query = new SolrQuery();
	//3.设置查询条件
	query.set("q", "id:1");
	//4.执行查询
	QueryResponse queryResponse = solrServer.query(query);
	//5.取文档列表(public class SolrDocumentList extends ArrayList<SolrDocument>)
	SolrDocumentList documentList = queryResponse.getResults();
	for (SolrDocument solrDocument : documentList) {
		System.out.println("id:"+solrDocument.get("id")+" ");
		System.out.println("名称:"+solrDocument.get("name")+" ");
		System.out.println("内容:"+solrDocument.get("content")+" ");
	}
}
```


+ 4、多条件查询带分页

```java
@Test
public void testQueryByCon() throws Exception{
	//创建连接
	HttpSolrClient solrServer = new HttpSolrClient.Builder("http://localhost:8983/solr/solrTest").build();
	//创建查询语句
	SolrQuery query = new SolrQuery();
	//设置查询条件
    //设置查询关键字
	query.set("q", "*称");
    //按照id降序排列
	query.setSort("id", SolrQuery.ORDER.desc);
	//分页条件
    query.setStart(0);
	query.setRows(2);
    //默认在名称域进行查询
	query.set("df", "name");
    //设置高亮
    solrQuery.setHighlight(true);
    //设置高亮的字段
    solrQuery.addHighlightField("name,content");
    //设置高亮的样式
    solrQuery.setHighlightSimplePre("<font color='red'>");
    solrQuery.setHighlightSimplePost("</font>");
	//执行查询
	QueryResponse queryResponse = solrServer.query(query);
    //返回高亮显示结果
    Map<String, Map<String, List<String>>> highlighting = queryResponse.getHighlighting();
	//获取文档列表
	SolrDocumentList documentList = queryResponse.getResults();
	System.out.println("总记录数:" + documentList.getNumFound());
	for (SolrDocument solrDocument : documentList) {
		System.out.println("id:"+solrDocument.get("id")+" ");
		System.out.println("名称:"+solrDocument.get("name")+" ");
		System.out.println("内容:"+solrDocument.get("content")+" ");
	}
}
```
+ 5、删除文档

```java
/**
 * 根据id删除文档
 */
@Test
public void testDeleteById() throws Exception{
	//1.创建连接
	HttpSolrClient solrServer = new HttpSolrClient.Builder("http://localhost:8983/solr/solrTest").build();
	//2.删除文档
	solrServer.deleteById("1");
	//3.提交
	solrServer.commit();
}
 
 
/**
 * 根据条件删除文档
 */
@Test
public void testDeleteById() throws Exception{
	//1.创建连接
	HttpSolrClient solrServer = new HttpSolrClient.Builder("http://localhost:8983/solr/solrTest").build();
	//2.删除文档
	solrServer.deleteByQuery("name:名称");
	//3.提交
	solrServer.commit();
}
```
