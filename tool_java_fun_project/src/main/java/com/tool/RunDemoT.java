package com.tool;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.testng.annotations.Test;

import java.io.File;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class RunDemoT {

    @Test
    public void testRun() {
        String value = "<a href=\"/life\"><span>所悟所想</span>";
        value = "    <a href=\"/life/posts/\" > dshsdhsdsdhsdhsdh" ;
        Pattern compile = Pattern.compile("a[\\s]*href=\"/life\"");
        compile = Pattern.compile("<a[\\s]*href=\"/life/posts");
        System.out.println(value);
        Matcher matcher = compile.matcher(value);
        System.out.println(compile.pattern());
        if (matcher.find()){
            System.out.println(matcher.group());
        }
//        while (matcher.find()){
//            System.out.println(matcher.group());
//        }
    }


    @Test
    public void run() throws Exception {
        new RunDemo().threeCompress();
    }

    @Test
    public void transformImgToPNGTest() {
        String path = "D:\\myProjects\\lifeDoc\\tool_java_fun_project\\source_dir\\content";
        String[] extensions = new String[]{"jpg", "jpeg", "gif", "bmp","jfif"};
        transformImgToPNG(new File(path), extensions);
    }

    private void transformImgToPNG(File file, String[] extensions) {
        if (file == null || extensions == null || extensions.length == 0) {
            return;
        }
        if (file.isFile()) {
            String extension = FilenameUtils.getExtension(file.getName());
            if (StringUtils.isBlank(extension)) {
                return;
            }
            extension = extension.toLowerCase();//必须转为小写,因为我的extensions里面全部定义为小写
            if (ArrayUtils.contains(extensions, extension)) {
                ImageConvertUtils.jpeg2png(file);
                System.out.println(file.getPath());
            }

        } else {
            File[] files = file.listFiles();
            if (files.length == 0) {
                return;
            }
            for (File f : files) {
                transformImgToPNG(f, extensions);
            }
        }

    }


}
