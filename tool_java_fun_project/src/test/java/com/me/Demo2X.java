package com.me;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.testng.annotations.Test;

import java.io.File;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Demo2X {


    @Test
    public void test2() throws Exception {
        final String dir = "D:\\myProjects\\lifeDoc\\tool_java_fun_project\\source_dir\\content\\docs\\algorithm\\data-structure\\black_horse\\数据结构与算法1.md";
        String fileToString = FileUtils.readFileToString(new File(dir), "UTF-8");
        Pattern pattern = Pattern.compile("\\$\\$");
        Matcher matcher = pattern.matcher(fileToString);

        int count = 0;
        while (matcher.find()){
            matcher.group();
            count++;
        }

        System.out.println(count);

        boolean flag = true;
        StringBuffer stringBuffer = new StringBuffer();
//        while (matcher.find()) {
//            matcher.appendReplacement(stringBuffer, flag ? "{{< katex display  >}}" : "{{< /katex >}}");
//            flag = false;
//        }


//        System.out.println(stringBuffer.toString());


        while (count != 0){
            fileToString = StringUtils.replaceOnce(fileToString,"$$",flag ? "{{< katex display  >}}\r" : "{{< /katex >}}\r") ;
            flag = false;
            count--;
        }

        System.out.println(fileToString);
    }

}
