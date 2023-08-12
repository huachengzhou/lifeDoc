---
title: "ElasticSearch API"
date: 2020-01-17T15:26:15Z
draft: false
weight: 6
---


# 数据准备

```
-- mysql
CREATE TABLE `goods`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` decimal(22, 0) NULL DEFAULT NULL,
  `stock` double NULL DEFAULT NULL,
  `saleNum` double NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  `categoryName` varchar(600) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `brandName` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `spec` varchar(600) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;



-- sqlserver

CREATE TABLE goods (
  id int identity(1,1) not null primary key,
  title varchar(300)  DEFAULT NULL,
  price decimal(22,0) DEFAULT NULL,
  stock int   DEFAULT NULL,
  saleNum int DEFAULT NULL,
  createTime datetime DEFAULT NULL,
  categoryName varchar(600)  DEFAULT NULL,
  brandName varchar(300)  DEFAULT NULL,
  spec varchar(600)  DEFAULT NULL,
  status int DEFAULT NULL
);

-- jpa
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

/**
 * Goods实体对象
 */
@Data
@Accessors(chain = true)   // 链式赋值(连续set方法)
@AllArgsConstructor        // 全参构造
@NoArgsConstructor         // 无参构造
// 指定当前类对象对应哪个ES中的索引
// 如果索引不存在
@Document(indexName = "goods")
public class Goods {

    //https://www.cnblogs.com/tanghaorong/p/16365684.html

    /**
     * 商品编号
     */
    @Id
    @Field(type = FieldType.Long)
    private Long id;

    /**
     * 商品标题
     */
    @Field(type = FieldType.Text, analyzer = "ik_max_word", searchAnalyzer = "ik_smart")
    private String title;

    /**
     * 商品价格
     */
    @Field(type = FieldType.Double)
    private BigDecimal price;

    /**
     * 商品库存
     */
    @Field(type = FieldType.Integer)
    private Integer stock;

    /**
     * 商品销售数量
     */
    @Field(type = FieldType.Integer)
    private Integer saleNum;

    /**
     * 商品分类
     */
    @Field(type = FieldType.Keyword)
    private String categoryName;

    /**
     * 商品品牌
     */
    @Field(type = FieldType.Keyword)
    private String brandName;

    /**
     * 上下架状态
     */
    @Field(type = FieldType.Integer)
    private Integer status;

    /**
     * 商品创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Field(type = FieldType.Date, format = DateFormat.date, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDate createTime;

}
```



# 简单查询


sqlserver

```sql
-- 不分页
select * from dbo.goods ;


-- offset /fetch next（2012版本及以上才有） 分页
select * from dbo.goods
order by id  
offset 0 rows
fetch next 100 rows only ;


-- 低版本
	SELECT
		* 
	FROM
		( SELECT top 100 * FROM ( SELECT top 100 * FROM dbo.goods ORDER BY id ASC ) -- 其中里面这层，必须指定按照升序排序，省略的话，查询出的结果是错误的。
		AS temp_sum_goods ORDER BY id DESC ) temp_order 
	ORDER BY
	id ASC;



```


mysql

```mysql
select * from mysqldemo.goods ;

select * from mysqldemo.goods limit 100 ;
```


es http




```http
//goods简单分页查询  from+size 浅分页


get http://127.0.0.1:9200/goods/_search

GET /goods/_search HTTP/1.1
Host: 127.0.0.1:9200
Content-Type: application/json
Content-Length: 33

{
  "from": 1,
  "size": 100
}
```

es java

```java 
 SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder() ;
BoolQueryBuilder queryBuilder = new BoolQueryBuilder();
searchSourceBuilder.query(queryBuilder).from(1).size(100);
SearchRequest searchRequest = new SearchRequest() ;
searchRequest.indices("goods");
searchRequest.source(searchSourceBuilder);
SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
SearchHits hits = searchResponse.getInternalResponse().hits();
SearchHit[] searchHits = hits.getHits();
for (SearchHit hit : searchHits) {
    Map<String, Object> sourceAsMap = hit.getSourceAsMap();
    System.out.println(JSONUtil.toJsonStr(sourceAsMap));
}
restHighLevelClient.close();
```


es java jpa

```java
 PageRequest pageRequest = PageRequest.of(1,100) ;
Page<Goods> goodsList = goodsRepository.findAll(pageRequest);
for (Goods goods:goodsList){
    System.out.println(goods);
}
```


elasticsearch data

<table>
<thead>
<tr>
<th>Keyword</th>
<th>Sample</th>
<th>Elasticsearch Query String</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>And</code></td>
<td><code>findByNameAndPrice</code></td>
<td><code>{"bool" : {"must" : [ {"field" : {"name" : "?"}}, {"field" : {"price" : "?"}} ]}}</code></td>
</tr>
<tr>
<td><code>Or</code></td>
<td><code>findByNameOrPrice</code></td>
<td><code>{"bool" : {"should" : [ {"field" : {"name" : "?"}}, {"field" : {"price" : "?"}} ]}}</code></td>
</tr>
<tr>
<td><code>Is</code></td>
<td><code>findByName</code></td>
<td><code>{"bool" : {"must" : {"field" : {"name" : "?"}}}}</code></td>
</tr>
<tr>
<td><code>Not</code></td>
<td><code>findByNameNot</code></td>
<td><code>{"bool" : {"must_not" : {"field" : {"name" : "?"}}}}</code></td>
</tr>
<tr>
<td><code>Between</code></td>
<td><code>findByPriceBetween</code></td>
<td><code>{"bool" : {"must" : {"range" : {"price" : {"from" : ?,"to" : ?,"include_lower" : true,"include_upper" : true}}}}}</code></td>
</tr>
<tr>
<td><code>LessThanEqual</code></td>
<td><code>findByPriceLessThan</code></td>
<td><code>{"bool" : {"must" : {"range" : {"price" : {"from" : null,"to" : ?,"include_lower" : true,"include_upper" : true}}}}}</code></td>
</tr>
<tr>
<td><code>GreaterThanEqual</code></td>
<td><code>findByPriceGreaterThan</code></td>
<td><code>{"bool" : {"must" : {"range" : {"price" : {"from" : ?,"to" : null,"include_lower" : true,"include_upper" : true}}}}}</code></td>
</tr>
<tr>
<td><code>Before</code></td>
<td><code>findByPriceBefore</code></td>
<td><code>{"bool" : {"must" : {"range" : {"price" : {"from" : null,"to" : ?,"include_lower" : true,"include_upper" : true}}}}}</code></td>
</tr>
<tr>
<td><code>After</code></td>
<td><code>findByPriceAfter</code></td>
<td><code>{"bool" : {"must" : {"range" : {"price" : {"from" : ?,"to" : null,"include_lower" : true,"include_upper" : true}}}}}</code></td>
</tr>
<tr>
<td><code>Like</code></td>
<td><code>findByNameLike</code></td>
<td><code>{"bool" : {"must" : {"field" : {"name" : {"query" : "?*","analyze_wildcard" : true}}}}}</code></td>
</tr>
<tr>
<td><code>StartingWith</code></td>
<td><code>findByNameStartingWith</code></td>
<td><code>{"bool" : {"must" : {"field" : {"name" : {"query" : "?*","analyze_wildcard" : true}}}}}</code></td>
</tr>
<tr>
<td><code>EndingWith</code></td>
<td><code>findByNameEndingWith</code></td>
<td><code>{"bool" : {"must" : {"field" : {"name" : {"query" : "*?","analyze_wildcard" : true}}}}}</code></td>
</tr>
<tr>
<td><code>Contains/Containing</code></td>
<td><code>findByNameContaining</code></td>
<td><code>{"bool" : {"must" : {"field" : {"name" : {"query" : "**?**","analyze_wildcard" : true}}}}}</code></td>
</tr>
<tr>
<td><code>In</code></td>
<td><code>findByNameIn(Collection&lt;String&gt;names)</code></td>
<td><code>{"bool" : {"must" : {"bool" : {"should" : [ {"field" : {"name" : "?"}}, {"field" : {"name" : "?"}} ]}}}}</code></td>
</tr>
<tr>
<td><code>NotIn</code></td>
<td><code>findByNameNotIn(Collection&lt;String&gt;names)</code></td>
<td><code>{"bool" : {"must_not" : {"bool" : {"should" : {"field" : {"name" : "?"}}}}}}</code></td>
</tr>
<tr>
<td><code>Near</code></td>
<td><code>findByStoreNear</code></td>
<td><code>Not Supported Yet !</code></td>
</tr>
<tr>
<td><code>True</code></td>
<td><code>findByAvailableTrue</code></td>
<td><code>{"bool" : {"must" : {"field" : {"available" : true}}}}</code></td>
</tr>
<tr>
<td><code>False</code></td>
<td><code>findByAvailableFalse</code></td>
<td><code>{"bool" : {"must" : {"field" : {"available" : false}}}}</code></td>
</tr>
<tr>
<td><code>OrderBy</code></td>
<td><code>findByAvailableTrueOrderByNameDesc</code></td>
<td><code>{"sort" : [{ "name" : {"order" : "desc"} }],"bool" : {"must" : {"field" : {"available" : true}}}}</code></td>
</tr>
</tbody>
</table>





# 使用ElasticsearchRestTemplate高级查询操作


## 精确查询(term)


term查询：不会分析查询条件，只有当词条和查询字符串完全匹配时才匹配，也就是精确查找，比如数字，日期，布尔值或 not_analyzed 的字符串(未经分析的文本数据类型)

terms查询：terms 跟 term 有点类似，但 terms 允许指定多个匹配条件。 如果某个字段指定了多个值，那么文档需要一起去 做匹配：


```java
  /**
     * 精确查询（termQuery）
     */
    @Test
    public void termQuery() {
        //查询条件(词条查询：对应ES query里的term)
        TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("categoryName", "手机");
        //创建查询条件构建器SearchSourceBuilder(对应ES外面的大括号)
        NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(termQueryBuilder).build();
        org.springframework.data.elasticsearch.core.SearchHits<Goods> searchHits = elasticsearchRestTemplate.search(nativeSearchQuery, Goods.class);
        Iterator<org.springframework.data.elasticsearch.core.SearchHit<Goods>> iterator = searchHits.iterator();
        while (iterator.hasNext()) {
            org.springframework.data.elasticsearch.core.SearchHit<Goods> searchHit = iterator.next();
            System.out.println(searchHit.getContent());
        }
    }

    /**
     * terms:多个查询内容在一个字段中进行查询
     */
    @Test
    public void termsQuery(){
        //查询条件(词条查询：对应ES query里的term)
        TermsQueryBuilder termsQueryBuilder = QueryBuilders.termsQuery("categoryName", "手机","平板电视");
        //创建查询条件构建器SearchSourceBuilder(对应ES外面的大括号)
        NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(termsQueryBuilder).build();
        org.springframework.data.elasticsearch.core.SearchHits<Goods> searchHits = elasticsearchRestTemplate.search(nativeSearchQuery, Goods.class);
        Iterator<org.springframework.data.elasticsearch.core.SearchHit<Goods>> iterator = searchHits.iterator();
        while (iterator.hasNext()) {
            org.springframework.data.elasticsearch.core.SearchHit<Goods> searchHit = iterator.next();
            System.out.println(searchHit.getContent());
        }
    }

```


## 全文查询(match)

全文查询会分析查询条件，先将查询条件进行分词，然后查询，求并集。


> term和match的区别是：match是经过analyer的，也就是说，文档首先被分析器给处理了。根据不同的分析器，分析的结果也稍显不同，然后再根据分词结果进行匹配。term则不经过分词，它是直接去倒排索引中查找了精确的值了。


match 查询语法汇总：


* match_all：查询全部。
* match：返回所有匹配的分词。
* match_phrase：短语查询，在match的基础上进一步查询词组，可以指定slop分词间隔。
* match_phrase_prefix：前缀查询，根据短语中最后一个词组做前缀匹配，可以应用于搜索提示，但注意和max_expanions搭配。其实默认是50.......
* multi_match：多字段查询，使用相当的灵活，可以完成match_phrase和match_phrase_prefix的工作。


```java
 @Test
    public void matchQuery() {
        //查询条件(词条查询：对应ES query里的match)
        MatchQueryBuilder matchQueryBuilder = QueryBuilders.matchQuery("title", "Apple IPhone 白色").analyzer("ik_smart").operator(Operator.AND);
        //创建查询条件构建器SearchSourceBuilder(对应ES外面的大括号)
        NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(matchQueryBuilder).build();
        //查询,获取查询结果
        org.springframework.data.elasticsearch.core.SearchHits<Goods> searchHits = elasticsearchRestTemplate.search(nativeSearchQuery, Goods.class);
        //获取总记录数
        long totalHits = searchHits.getTotalHits();
        System.out.println("totalHits = " + totalHits);
        Iterator<org.springframework.data.elasticsearch.core.SearchHit<Goods>> iterator = searchHits.iterator();
        while (iterator.hasNext()) {
            org.springframework.data.elasticsearch.core.SearchHit<Goods> searchHit = iterator.next();
            System.out.println(searchHit.getContent());
        }
    }

    /**
     * match_all：查询全部。
     */
    @Test
    public void matchAllQuery(){
        //查询条件(词条查询：对应ES query里的match)
        MatchAllQueryBuilder matchAllQueryBuilder = QueryBuilders.matchAllQuery();
        //创建查询条件构建器SearchSourceBuilder(对应ES外面的大括号)
        NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(matchAllQueryBuilder).build();
        //查询,获取查询结果
        org.springframework.data.elasticsearch.core.SearchHits<Goods> searchHits = elasticsearchRestTemplate.search(nativeSearchQuery, Goods.class);
        //获取总记录数
        long totalHits = searchHits.getTotalHits();
        System.out.println("totalHits = " + totalHits);
        Iterator<org.springframework.data.elasticsearch.core.SearchHit<Goods>> iterator = searchHits.iterator();
        while (iterator.hasNext()) {
            org.springframework.data.elasticsearch.core.SearchHit<Goods> searchHit = iterator.next();
            System.out.println(searchHit.getContent());
        }
    }

    /**
     * match_phrase：短语查询，在match的基础上进一步查询词组，可以指定slop分词间隔。
     */
    @Test
    public void matchPhraseQuery(){
        //查询条件(词条查询：对应ES query里的match_all)
        MatchPhraseQueryBuilder matchPhraseQueryBuilder = QueryBuilders.matchPhraseQuery("title","华为") ;
        //创建查询条件构建器SearchSourceBuilder(对应ES外面的大括号)
        NativeSearchQuery  nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(matchPhraseQueryBuilder).build();
        //查询,获取查询结果
        org.springframework.data.elasticsearch.core.SearchHits<Goods> searchHits = elasticsearchRestTemplate.search(nativeSearchQuery, Goods.class);
        //获取总记录数
        long totalHits = searchHits.getTotalHits();
        System.out.println("totalHits = " + totalHits);
        Iterator<org.springframework.data.elasticsearch.core.SearchHit<Goods>> iterator = searchHits.iterator();
        while (iterator.hasNext()) {
            org.springframework.data.elasticsearch.core.SearchHit<Goods> searchHit = iterator.next();
            System.out.println(searchHit.getContent());
        }
    }

    /**
     * multi_match：多字段查询，使用相当的灵活，可以完成match_phrase和match_phrase_prefix的工作。
     */
    @Test
    public void multiMatchQuery(){
        //查询条件(词条查询：对应ES query里的multi_match)
        MultiMatchQueryBuilder multiMatchQueryBuilder = QueryBuilders.multiMatchQuery("华为","title","categoryName").analyzer("ik_smart") ;
//        MultiMatchQueryBuilder multiMatchQueryBuilder = QueryBuilders.multiMatchQuery("华为和Apple","title","categoryName").analyzer("ik_smart") ;
        //创建查询条件构建器SearchSourceBuilder(对应ES外面的大括号)
        NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(multiMatchQueryBuilder).build();
        //查询,获取查询结果
        org.springframework.data.elasticsearch.core.SearchHits<Goods> searchHits = elasticsearchRestTemplate.search(nativeSearchQuery, Goods.class);
        //获取总记录数
        long totalHits = searchHits.getTotalHits();
        System.out.println("totalHits = " + totalHits);
        Iterator<org.springframework.data.elasticsearch.core.SearchHit<Goods>> iterator = searchHits.iterator();
        while (iterator.hasNext()) {
            org.springframework.data.elasticsearch.core.SearchHit<Goods> searchHit = iterator.next();
            System.out.println(searchHit.getContent());
        }
    }

```


[参考](https://blog.csdn.net/W_Meng_H/article/details/123940475)