---
title: "基本配置"
date: 2023-08-15
draft: false
weight: 2
---

# Solr 基本配置

> 在 Solr 中有几个配置文件，您将在执行过程中与之交互。这些文件中的很多都是 XML 格式的，尽管与配置设置交互的 API 在需要时往往接受 JSON 以进行编程访问。
  
  
 
* solr.xml 指定 Solr 服务器实例的配置选项。有关 solr.xml 请参阅Solr 核心和 solr.xml 的更多信息。

* 每个 Solr 核心：
    * core.properties 定义每个核心的特定属性，例如其名称、核心所属的集合、模式的位置和其他参数。有关更多详细信息 core.properties，请参阅定义 core.properties部分。
    
    * solrconfig.xml 控制高层行为。例如，您可以为数据目录指定一个备用位置。有关更多信息 solrconfig.xml，请参阅配置 solrconfig.xml。
   
    * managed-schema（或 schema.xml 改为）描述您将要求 Solr 索引的文档。Schema 将文档定义为字段的集合。您可以定义字段类型和字段本身。字段类型定义功能强大，包括有关 Solr 如何处理传入字段值和查询值的信息。有关 Solr 架构的更多信息，请参阅文档、字段和架构设计以及架构 API。
    
    * data/ 包含低级索引文件的目录。
    
## 一、 域中常用标签介绍

域（managed-schema）相当于数据库的表字段，用户存放数据，因此用户根据业务需要去定义相关的Field（域），一般来说，每一种对应着一种数据，用户对同一种数据进行相同的操作。
域的常用属性:


+ name：指定域的名称
+ type：指定域的类型
+ indexed：是否索引
+ stored：是否存储
+ required：是否必须
+ multiValued：是否多值




### 1、域（managed-schema）

Solr中默认定义唯一主键key为id域

![][img1]
![][img1_]

Solr在删除、更新索引时使用id域进行判断，也可以自定义唯一主键。

**注意在创建索引时必须指定唯一约束**

```xml
<field name="id" type="long" indexed="true" stored="true"/>
<field name="name" type="text_smartcn" indexed="true" stored="true"/>
<field name="content" type="text_ik" multiValued="true" indexed="true" stored="true"/>
```


### 2、copyField （复制域）

copyField复制域，可以将多个Field复制到一个Field中，以便进行统一的检索。

比如，根据关键字只搜索 item_keywords 域的内容就相当于搜索 name、content，即将 name、content 复制到 item_keywords 域中。

目标域必须是多值的。 


```xml
<field name="item_keywords" type="text_ik" indexed="true" stored="false" multiValued="true"/>
<copyField source="name" dest="item_keywords"/>
<copyField source="content" dest="item_keywords"/>
```


### 3、dynamicField（动态字段）

动态字段就是不用指定具体的名称，只要定义字段名称的规则，例如定义一个 dynamicField，name 为*_i，定义它的 type 为 text，那么在使用这个字段的时候，
任何以_i结尾的字段都被认为是符合这个定义的，例如：name_i，gender_i，school_i等。
自定义 Field 名为：product_title_t，“product_title_t” 和 managed-schema 文件中的 dynamicField 规则匹配成功。


```xml
<dynamicField name="item_spec_*" type="string" indexed="true" stored="true" />
```



## 二、Solr 添加中文分词器

其实 Solr 已经自带了中文分词器 lucene-analyzers-smartcn 在解压后 \solr-8.11\solr-8.11.0\contrib\analysis-extras\lucene-libs 目录下 lucene-analyzers-smartcn.jar 这就是 Solr 自带的中文分词器，我们只需要将该文件拷贝到 Solr 服务 Jetty 或 Tomcat 的 webapp/WEB-INF/lib/ 目录下就可以了。



```shell
cp /solr-8.11.0/contrib/analysis-extras/lucene-libs/lucene-analyzers-smartcn-8.11.0.jar  /solr-8.11.0/server/solr-webapp/webapp/WEB-INF/lib
```

在你指定 Solr 核心的 conf 目录下 managed-schema 文件中添加以下内容就ok了

```xml
 <!-- 配置中文分词器 -->
<fieldType name="text_smartcn" class="solr.TextField" positionIncrementGap="100">
    <analyzer type="index">
        <tokenizer class="org.apache.lucene.analysis.cn.smart.HMMChineseTokenizerFactory"/>
    </analyzer>
    <analyzer type="query">
        <tokenizer class="org.apache.lucene.analysis.cn.smart.HMMChineseTokenizerFactory"/>
    </analyzer>
</fieldType>
```

如果你觉得 Solr 自带的中文分词器满足不了你预期的分词效果，那你也可以添加外部的分词器。
首先我们先去下载你要添加的外部分词器IK 分词器下载（ik-analyzer-solr）。
在将该文件拷贝到 Solr 服务 Jetty 或 Tomcat 的 webapp/WEB-INF/lib/ 目录下，最后配置在     managed-schema 文件中添加以下内容就ok了



```xml
<!-- ik分词器 -->
<fieldType name="text_ik" class="solr.TextField">
  <analyzer type="index">
      <tokenizer class="org.wltea.analyzer.lucene.IKTokenizerFactory" useSmart="false" conf="ik.conf"/>
      <filter class="solr.LowerCaseFilterFactory"/>
  </analyzer>
  <analyzer type="query">
      <tokenizer class="org.wltea.analyzer.lucene.IKTokenizerFactory" useSmart="true" conf="ik.conf"/>
      <filter class="solr.LowerCaseFilterFactory"/>
  </analyzer>
</fieldType>
```

最后在 managed-schema 文件中给要分词的字段指定分词器


```xml
<field name="name" type="text_smartcn" indexed="true" stored="true"/>
<field name="content" type="text_ik" multiValued="true" indexed="true" stored="true"/>
```

**注意：indexed="true"，solr默认下content这个字段的indexed的值是false，需要改成true，在搜索时这个字段才能用到上面的分词器。**

配置完重启 Solr 就 ok 了。



## 三、Solr 配置数据库

### 1、配置数据源

如果想要导入数据库，需要将相应的数据库驱动的 jar 包导入到 Solr 服务 Jetty 或 Tomcat 的 webapp/WEB-INF/lib/ 目录下。
然后在你自己的核心源文件夹打开 conf 文件夹，我们需要配置 solrconfig.xml，managed-schema 文件增加一个数据库配置文件。



### 2、配置 solrconfig.xml

数据库 Solr 的 jar 包引入，找到对应配置位置加入如下配置，在 solrconfig.xml 文件75行左右。

```xml
 <lib dir="${solr.install.dir:../../../..}/dist/" regex="solr-dataimporthandler-\d.*\.jar" />
```
增加数据源配置 xml 文件，找到 name 为 /select 的 requestHandler 节点，在上面加入以下配置，其中 config 里面为数据源配置文件名字。

```xml
<requestHandler name="/dataimport" class="org.apache.solr.handler.dataimport.DataImportHandler"> 
       <lst name="defaults"> 
          <str name="config">data-config.xml</str> 
       </lst> 
</requestHandler>
```


在 Solr 核心 conf 文件夹下新增配置数据源的 xml 文件（也就是 solrconfig.xml 文件中 name 为 /dataimport 的 requestHandler 节点中 config 指定的文件）。


+ dataSource：中配置数据库数据
+ type：为类型
+ driver：为对应数据库的驱动类
+ url：为数据库地址
+ user：为数据库账户
+ password：为数据库密码
+ entity：为需要的查询数据源语句

其中 entity 节点下 field 为查出的数据需要向 Solr 中存储的字段已经对应存入到 Solr 中的字段名称。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<dataConfig>
    <dataSource type="JdbcDataSource"
                driver="com.mysql.jdbc.Driver"
                url="jdbc:mysql://192.168.1.11:3306/solr_xt?characterEncoding=utf-8&amp;useUnicode=true&amp;zeroDateTimeBehavior=convertToNull"
                user="root"
                password="root" />
    <document>
    <entity name="solrTest" query="SELECT name,content FROM solrTest">
        <!-- 查询的数据和数据库索引意义对应 column 是查询的字段 name 是 Solr 索引对应的字段 -->       
        <field column="id" name="id"/>         
        <field column="name" name="id" />
        <field column="content" name="title" />
    </entity>
    </document>
</dataConfig>
```


最后记得修改 Solr 核心 core/conf 目录下 managed-schema 文件 <field/> 标签，新增需要索引的列。

完成所有配置后记得要重启 Solr 服务。


## 四、Solr 配置全量更新

完成以上第2步数据源配置后，直接在 Solr AdminUI 管理页面就行数据全量更新就行了。

![][img2]
![][img2_]


## 五、Solr 配置增量更新

在做数据增量更新时，需要做增量更新的数据源表几个增量必要条件必须存在。

+ 如果只涉及添加，与修改业务，那么数据库里只需额外有一个 timpstamp 字段就可以了，默认值为当前系统时间，CURRENT_TIMESTAMP。
+ 如果还涉及删除业务，那么数据里就需额外再多添加一个字段 isdelete，int 类型的用0,1来标识，此条记录是否被删除。

增量更新就是在全量更新的基础上加上一些配置：

+ query：查询数据库表符合记录数据。
+ deltaQuery：增量索引查询主键ID，注意这个只能返回ID字段。
+ deltaImportQuery：增量索引查询导入数据。
+ deletedPkQuery：增量索引删除主键ID查询。


```xml
<?xml version="1.0" encoding="UTF-8" ?>
<dataConfig> 
    <!--数据源-->
    <dataSource type="JdbcDataSource"
                driver="com.mysql.jdbc.Driver"
                url="jdbc:mysql://192.168.1.11:3306/solr_xt?characterEncoding=utf-8&amp;useUnicode=true&amp;zeroDateTimeBehavior=convertToNull"
                user="root"
                password="root"/>
    <document> 
 
        <entity name="solrTest" 
        query="SELECT id,name,content FROM solrTest where flag = '0'"
        deltaImportQuery = "SELECT id,name,content FROM solrTest where fid = '${dataimporter.delta.fid}'"
        deltaQuery = "SELECT id FROM solrTest where flastupdatetime > '${dataimporter.last_index_time}' and flag = '0'"
        deletedPkQuery = "SELECT id FROM solrTest where flag = '1'"
        >
            <!-- 查询的数据和数据库索引意义对应 column 是查询的字段 name 是 Solr 索引对应的字段 -->
            <field column="id" name="id"/>            
            <field column="name" name="name"/>
            <field column="content" name="content"/>
        </entity>
        
    </document> 
</dataConfig>
```

完成配置在 Solr AdminUI 管理页面就行数据增量更新就行了


![][img3]
![][img3_]




[img1]:../../.././imgs/java/solr/20210723093545494.png
[img1_]:../../../../imgs/java/solr/20210723093545494.png

[img2]:../../.././imgs/java/solr/20210721143922946.png
[img2_]:../../../../imgs/java/solr/20210721143922946.png

[img3]:../../.././imgs/java/solr/20210721155253170.png
[img3_]:../../../../imgs/java/solr/20210721155253170.png

