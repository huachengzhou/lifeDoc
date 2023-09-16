---
title: "AdminUI 简单使用"
date: 2023-08-15
draft: false
weight: 1
---

> 访问方式 http://ip:端口号/solr 

## 1、基本查询

| 参数 | 意义 |
| --- | --- |
| q | 查询的关键字，此参数最为重要，例如，q=id:1，默认为q=_:_， |
| fl | 指定返回哪些字段，用逗号或空格分隔，注意：字段区分大小写，例如，fl= id,title,sort |
| start | 返回结果的第几条记录开始，一般分页用，默认0开始 |
| rows | 指定返回结果最多有多少条记录，默认值为 10，配合start实现分页 |
| sort | 排序方式，例如id desc 表示按照 “id” 降序 |
| wt | (writer type)指定输出格式，有 xml, json, php等 |
| fq | （filter query）过虑查询，提供一个可选的筛选器查询。返回在q查询符合结果中同时符合的fq条件的查询结果，例如：q=id:1&fq=sort:[1 TO 5]，找关键字id为1 的，并且sort是1到5之间的。 |
| df | 默认的查询字段，一般默认指定。 |
| qt | （query type）指定那个类型来处理查询请求，一般不用指定，默认是standard。 |
| indent | 返回的结果是否缩进，默认关闭，用 indent=true |
| version | 查询语法的版本，建议不使用它，由服务器指定默认值。 |


## 2、Solr 的检索运算符

| 符号 | 意义 |
| --- | --- |
| “:” | 指定字段查指定值，如返回所有值_:_ |
| “?” | 表示单个任意字符的通配 |
| “*” | 表示多个任意字符的通配（不能在检索的项开始使用*或者?符号） |
| “~” | 表示模糊检索，如检索拼写类似于”roam”的项这样写：roam~将找到形如foam和roams的单词；roam~0.8，检索返回相似度在0.8以上的记录。 |
| AND || | 布尔操作符 |
| OR、&& | 布尔操作符 |
| NOT、!、- | （排除操作符不能单独与项使用构成查询） |
| “+” | 存在操作符，要求符号”+”后的项必须在文档相应的域中存在² |
| ( ) | 用于构成子查询 |
| [] | 包含范围检索，如检索某时间段记录，包含头尾，date:[201507 TO 201510] |
| {} | 不包含范围检索，如检索某时间段记录，不包含头尾date:{201507 TO 201510} |

## 3、高亮

| 符号 | 意义 |
| --- | --- |
| h1 | *   是否高亮，hl=true，表示采用高亮|
| hl.fl | *   设定高亮显示的字段，用空格或逗号隔开的字段列表。要启用某个字段的highlight功能，就得保证该字段在schema中是stored。如果该参数未被给出，那么就会高亮默认字段 standard handler会用df参数，dismax字段用qf参数。你可以使用星号去方便的高亮所有字段。如果你使用了通配符，那么要考虑启用hl.requiredFieldMatch选项。|
| hl.requireFieldMatch | *   如果置为true，除非用hl.fl指定了该字段，查询结果才会被高亮。它的默认值是false。|
| hl.usePhraseHighlighter | *   如果一个查询中含有短语（引号框起来的）那么会保证一定要完全匹配短语的才会被高亮。|
| hl.highlightMultiTerm | *   如果使用通配符和模糊搜索，那么会确保与通配符匹配的term会高亮。默认为false，同时hl.usePhraseHighlighter要为true。|
| hl.fragsize | -返回的最大字符数。默认是100.如果为0，那么该字段不会被fragmented且整个字段的值会被返回。 |

## 4、分组（Field Facet）

> facet 参数字段必须被索引，facet=on 或 facet=true

| 符号 | 意义 |
| --- | --- |
| facet.field | 分组的字段 |
| facet.prefix | 表示Facet字段前缀 |
| facet.limit | Facet字段返回条数 |
| facet.offict | 开始条数,偏移量,它与facet.limit配合使用可以达到分页的效果 |
| facet.mincount | Facet字段最小count,默认为0 |
| facet.missing | 如果为on或true,那么将统计那些Facet字段值为null的记录 |
| facet.sort | 表示 Facet 字段值以哪种顺序返回 .格式为 true(count)|false(index,lex)，true(count) 表示按照 count 值从大到小排列，false(index,lex) 表示按照字段值的自然顺序 (字母 , 数字的顺序 ) 排列 . 默认情况下为 true(count) |



## 5、分组（Date Facet）


| 符号 | 意义 |
| --- | --- |
| facet.date | 该参数表示需要进行 Date Facet 的字段名 , 与 facet.field 一样 , 该参数可以被设置多次 , 表示对多个字段进行 Date Facet. |
| facet.date.start | 起始时间 , 时间的一般格式为 ” 2015-12-31T23:59:59Z”, 另外可以使用 ”NOW”,”YEAR”,”MONTH” 等等 , |
| facet.date.end | 结束时间 |
| facet.date.gap | 时间间隔,如果 start 为 2015-1-1,end 为 2016-1-1，gap 设置为 ”+1MONTH” 表示间隔1 个月 , 那么将会把这段时间划分为 12 个间隔段 . |
| facet.date.hardend | 表示 gap 迭代到 end 时，还剩余的一部分时间段，是否继续去下一个间隔. 取值可以为 true |



