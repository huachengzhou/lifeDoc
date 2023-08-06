package com.tool;

import com.google.common.collect.Ordering;
import org.apache.commons.lang3.StringUtils;
import org.testng.annotations.Test;

import java.io.File;
import java.util.*;

public class FileImageLastUpdateSoft {


    @Test
    public void printImageTime() {
        final String userDir = System.getProperty("user.dir");
        String dir = "C:\\Users\\noatn\\Downloads";
        String baseName = "imgs/elasticsearch/image/";
        String dir1 = userDir + "\\source_dir\\content\\docs\\javadir\\middleware\\elasticsearch_principle.md";


        final String imgs = userDir + "\\source_dir\\content\\docs\\imgs";
        String string = "";
        int minLen = Math.min(dir1.length(), imgs.length());
        for (int i = 0; i < minLen; i++) {
            String value1 = dir1.substring(0, i);
            String value2 = imgs.substring(0, i);
            if (!value1.equals(value2)) {
                String vString = dir1.length() == minLen ? dir1 : imgs;
                string = vString.substring(0, i - 1);
                break;
            }
        }
        String dir1Fix = StringUtils.remove(dir1, string);
        int length = dir1Fix.split("\\\\").length + 1;
        File file = new File(dir);
        if (!file.isDirectory()) {
            System.out.println("不是文件夹");
            return;
        }
        File[] files = file.listFiles();
        if (files.length == 0) {
            System.out.println("文件夹无元素");
            return;
        }
        List<String> params = new ArrayList<>(files.length * 2);
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
        Collections.sort(fileList, fileOrdering);
        Iterator<File> iterator = fileList.iterator();
        int i = 0;
        System.out.println("");
        while (iterator.hasNext()) {
            File next = iterator.next();
//            if (!StringUtils.contains(next.getName(),"微信截图")) {
//                continue;
//            }
            String name = "[img" + i + "]";
            String name_ = "[img" + i + "_]";
            StringBuilder stringBuilder = new StringBuilder();
            StringBuffer stringBuffer = new StringBuffer();
            stringBuilder.append(":");
            stringBuffer.append(":");
            for (int j = 0; j < length; j++) {
                if (j != length - 1) {
                    stringBuffer.append("../");
                    stringBuilder.append("../");
                } else {
                    stringBuffer.append("../");
                    stringBuilder.append("./");
                }
            }

            String s1 = ":../.././";
            String s2 = ":../../../";
            System.out.println(name + stringBuilder.toString() + baseName + next.getName());
            System.out.println(name_ + stringBuffer.toString() + baseName + next.getName());
            if (i % 4 == 0) {
                System.out.println();
            }
            params.add("![]" + name);
            params.add("![]" + name_);
            i++;
        }

        System.out.println();
        params.forEach(s -> {
            System.out.println(s);
        });
    }


}
