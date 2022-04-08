package com.tool;

import com.google.common.collect.Ordering;
import org.apache.commons.lang3.StringUtils;
import org.testng.annotations.Test;

import java.io.File;
import java.util.*;

public class FileImageLastUpdateSoft {


    @Test
    public void printImageTime() {
        String dir = "C:\\Users\\HP\\Downloads";
        String baseName = "imgs/mysql/install/" ;
        File file = new File(dir);
        if (!file.isDirectory()){
            System.out.println("不是文件夹");
            return;
        }
        File[] files = file.listFiles();
        if (files.length == 0){
            System.out.println("文件夹无元素");
            return;
        }
        List<String> params = new ArrayList<>(files.length*2) ;
        List<File> fileList = new ArrayList<>(files.length);
        for (int i = 0; i < files.length; i++) {
            fileList.add(files[i]);
        }
        Ordering<File> fileOrdering = Ordering.from(new Comparator<File>() {
            @Override
            public int compare(File o1, File o2) {
                long x = o1.lastModified(), y = o2.lastModified();
                return (x < y) ? -1 : ((x == y) ? 0 : 1);
            }
        });
        Collections.sort(fileList,fileOrdering);
        Iterator<File> iterator = fileList.iterator();
        int i = 1;
        System.out.println("");
        while (iterator.hasNext()){
            File next = iterator.next();
            if (!StringUtils.contains(next.getName(),"微信")) {
                continue;
            }
            String name = "[img"+i+"]" ;
            String name_ = "[img"+i+"_]" ;
            System.out.println(name+":../.././"+baseName+next.getName());
            System.out.println(name_+":../../../"+baseName+next.getName());
            if (i % 4 == 0){
                System.out.println();
            }
            params.add("![]"+name) ;
            params.add("![]"+name_) ;
            i++;
        }

        System.out.println();
        params.forEach(s -> {
            System.out.println(s);
        });
    }


}
