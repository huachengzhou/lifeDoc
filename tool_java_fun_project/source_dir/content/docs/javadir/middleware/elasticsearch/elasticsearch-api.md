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


[参考](https://blog.csdn.net/W_Meng_H/article/details/123940475)