package com.me;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

import java.io.File;
import java.util.Arrays;

/**
 * @author : chengdu
 * @date :  2023/8/5-08
 **/
public class Demo1X {

    @Test
    public void test1(){
        String node1Path = "D:\\CS\\elasticsearch_or_kibana\\elasticsearch-cluster\\elasticsearch-node-1\\data\\nodes\\0\\indices" ;
        String node2Path = "D:\\CS\\elasticsearch_or_kibana\\elasticsearch-cluster\\elasticsearch-node-2\\data\\nodes\\0\\indices" ;
        String node3Path = "D:\\CS\\elasticsearch_or_kibana\\elasticsearch-cluster\\elasticsearch-node-3\\data\\nodes\\0\\indices" ;

        printFile(node1Path);
        printFile(node2Path);
        printFile(node3Path);
    }

    private String[] printFile(String path) {
        File file = new File(path);
        File[] files = file.listFiles();
        String[] strings = new String[files.length] ;
        int i = 0;
        for (File f:files){
            strings[i] = f.getName();
            System.out.println(f.getName());
            i++;
        }

        System.out.println();
//        System.out.println(Arrays.toString(strings));
        return strings;
    }

}
