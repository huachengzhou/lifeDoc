---
title : 'IO'
date : '2021-02-15'
draft : false
tags : ["tool"]
categories : ["java","index"]
author : 'zch'
description : '测试博客'
lastmod : '2021-02-15'
---




## org.apache.commons.io.FilenameUtils 文件名称操作


+ FilenameUtils.getExtension(fileName) 获取文件后缀 //text

+ FilenameUtils.getName(fileName) 获取文件完整名称 //c.text

+ FilenameUtils.getBaseName(fileName) 获取文件名称 //c

+ FilenameUtils.getFullPath(fileName) 获取文件的完整路径 //D:\data\


```
String path = "D:\\data\\假设开发法土地模板.docx" ;
String fullPath = FilenameUtils.getFullPath(path);
System.out.println("fullPath:"+fullPath);//D:\data\

String name = FilenameUtils.getName(path);
System.out.println("name:"+name); //假设开发法土地模板.docx

String prefix = FilenameUtils.getPrefix(path);
System.out.println("prefix:"+prefix); //D:\

int prefixLength = FilenameUtils.getPrefixLength(path);
System.out.println("prefixLength:"+prefixLength); //3

String path1 = FilenameUtils.getPath(path);
System.out.println("path:"+path1); //data\

String baseName = FilenameUtils.getBaseName(path);
System.out.println("baseName:"+baseName); //假设开发法土地模板

String extension = FilenameUtils.getExtension(path);
System.out.println("extension:"+extension); //docx

```


## FileUtils：提供文件操作（移动文件，读取文件，检查文件是否存在等等）

```
String path = "D:\\data\\test";
String fileSize = FileUtils.byteCountToDisplaySize(1024 * 1024);
// 转换文件长度单位
Assert.assertEquals("1 MB", fileSize);

// 清空某目录下的所有目录,含文件夹和文件,注意是目录下,不包含父目录
FileUtils.cleanDirectory(new File(path));

// copy URL中文件到參數2
FileUtils.copyURLToFile(new URL("https://v3.bootcss.com/"), new File("D:\\data\\test1\\a1.txt"));//a1.txt 里面拷贝下来是一个网页

// 强制删除文件
FileUtils.forceDelete(new File("D:\\data\\test1\\a1.txt"));

// 将文件转为 InputStream
FileUtils.openInputStream(new File("D:\\data\\aac.pptx"));
//openOutStream
FileUtils.openOutputStream(new File("D:\\data\\aac.pptx"));

// 读取文件转为字节数组
byte[] bytes = FileUtils.readFileToByteArray(new File("D:\\data\\aab.pptx"));

// 读取文件转换为String类型,方便文本读取
FileUtils.readFileToString(new File("D:\\data\\aab.pptx"),"UTF-8");

// 返回目录的大小
long size = FileUtils.sizeOfDirectory(new File("D:\\data\\"));

// 写字符串到参数1文件中
FileUtils.writeStringToFile(new File("D:\\data\\test1\\b2.txt"), "test", "UTF-8");

// 将参数1目录下的全部内容复制到参数2目录
FileUtils.copyDirectory(new File("D:\\data\\test1"), new File("D:\\data\\test2"));

// 将参数1目录整个复制到参数2目录下
FileUtils.copyDirectoryToDirectory(new File("D:\\data") , new File("D:\\data\\test1"));

// copy参数1文件到参数2
FileUtils.copyFile(new File("D:\\data\\test1\\b2.txt"), new File("D:\\data\\b1.txt"));

// copy参数1文件到参数2目录下
FileUtils.copyFileToDirectory(new File("D:\\data\\b1.txt") , new File("D:\\data\\test2")) ;

//读取文件的每一行
List<String> stringList = FileUtils.readLines(new File("D:\\data\\b1.txt"));
```
 
## IOCase：提供字符串操作以及比较的方法



## FileSystemUtils：提供查看指定目录剩余空间的方法

```
 long spaceKb = FileSystemUtils.freeSpaceKb("D:\\data\\");//247018912 kb
 System.out.println(spaceKb);
```



## IOUtils

```
 Reader reader = new InputStreamReader(new FileInputStream(new File("D:\\data\\b1.txt"))) ;
IOUtils.copy(reader,new FileOutputStream("D:\\data\\b3.txt")) ;

byte[] toByteArray = IOUtils.toByteArray(new URL("https://www.bootcss.com/"));
```













































































































