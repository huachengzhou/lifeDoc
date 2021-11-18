package com.tool;

import com.tool.entity.AttributeEntity;
import com.tool.entity.LabelEntity;
import org.apache.commons.lang3.StringUtils;
import org.testng.annotations.Test;

import java.io.*;
import java.net.URL;
import java.util.*;
import java.util.regex.Pattern;

public class RunDemo {

    //D:\IdeaProjects\motorcycle
    private String getDir() {
        URL resource = RunDemo.class.getClassLoader().getResource(File.separator);
        File file = new File(resource.getFile());
        String path = file.getParentFile().getParentFile().getParentFile().getParentFile().getPath();
        return path;
    }


    @Test
    public void firstCompress() throws Exception {
        String source_dir = "source_dir";
        String dir = getDir() + File.separator + "tool_java_fun_project" + File.separator;
        String path = dir + source_dir + ".zip";
        File file = new File(path);
        ZipUtil.unZip(file.getPath());
        String dir1 = dir + source_dir + File.separator + source_dir;
        String dir2 = dir + source_dir + File.separator;
        System.out.println(dir1);
        System.out.println(dir2);

        org.apache.commons.io.FileUtils.copyDirectory(new File(dir1), new File(dir2));
        org.apache.commons.io.FileUtils.deleteDirectory(new File(dir1));
    }

    @Test
    public void twoCompress() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(getDir());
        stringBuilder.append(File.separator).append("tool_java_fun_project").append(File.separator).append("source_dir").append(File.separator).append("public");
        File file = new File(stringBuilder.toString());
        String oldText = "https://huachengzhou.github.io/cycle/";
//        String newText = "";
        String newText = "/";
        FileUtils.replaceContent(file, oldText, newText);
    }


    @Test
    public void threeCompress() throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(getDir());
        stringBuilder.append(File.separator).append("tool_java_fun_project").append(File.separator).append("source_dir").append(File.separator).append("public");
        List<LabelEntity> labelEntities = new ArrayList<>(4);
        LabelEntity labelEntity = null;
        {
            labelEntity = new LabelEntity();
            labelEntity.setEle("link");
            labelEntity.getAttributeEntities().add(new AttributeEntity("rel", "manifest"));
            labelEntities.add(labelEntity);
        }
        {
            labelEntity = new LabelEntity();
            labelEntity.setEle("link");
            labelEntity.getAttributeEntities().add(new AttributeEntity("rel", "icon"));
            labelEntities.add(labelEntity);
        }
        {
            labelEntity = new LabelEntity();
            labelEntity.setEle("link");
            labelEntity.getAttributeEntities().add(new AttributeEntity("rel", "stylesheet"));
            labelEntities.add(labelEntity);
        }
        {
            labelEntity = new LabelEntity();
            labelEntity.setEle("script");
            labelEntity.getAttributeEntities().add(new AttributeEntity("defer"));
            labelEntities.add(labelEntity);
        }
        File file = new File(stringBuilder.toString());
        File file2 = new File(getDir() + File.separator + "docs");
        FileUtils.replaceNewContent(file, labelEntities, "/life/", new StringBuilder());

        labelEntities.clear();
        {
            labelEntity = new LabelEntity();
            labelEntity.setEle("a");
            labelEntity.getAttributeEntities().add(new AttributeEntity("href"));
            labelEntities.add(labelEntity);
        }
        {
            labelEntity = new LabelEntity();
            labelEntity.setEle("link");
            labelEntity.getAttributeEntities().add(new AttributeEntity("rel", "alternate"));
            labelEntity.getAttributeEntities().add(new AttributeEntity("type", "application/rss+xml"));
            labelEntities.add(labelEntity);
        }
        FileUtils.replaceNewContent(file, labelEntities, "https://huachengzhou.github.io/life/", new StringBuilder());

        FileUtils.replaceCustomContent(file, Pattern.compile("<a[\\s]*href=\"/life/posts"), "/life/", new StringBuilder());
        FileUtils.replaceCustomContent(file, Pattern.compile("<a[\\s]*href=\"/life"), "/life", new StringBuilder());
        FileUtils.replaceCustomContent(file, Pattern.compile("<img[\\s]*src=\"/life"), "/life/", new StringBuilder());

        //强行删除dns静态资源保护效果 ...sha256
        FileUtils.replaceCustomContent(file, Pattern.compile("^<link[\\s\\S]+ integrity=\"[\\s\\S]+\""), Pattern.compile("integrity=\"[\\s\\S]+\""), " ");
        FileUtils.replaceCustomContent(file, Pattern.compile("^<script[\\s\\S]+ integrity=\"[\\s\\S]+\""), Pattern.compile("integrity=\"[\\s\\S]+\""), " ");
//        org.apache.commons.io.FileUtils.copyDirectory(file, file2);
//        org.apache.commons.io.FileUtils.deleteDirectory(file);
    }

    @Test
    public void lastCompress() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(getDir());
        stringBuilder.append(File.separator).append("tool_java_fun_project").append(File.separator).append("source_dir");

        File file = new File(stringBuilder.toString());
        try {
            ZipCompressUtils.zipCompress(file, true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testProcess() {
        List<String> stringList = new ArrayList<>(4);
//        stringList.add("ping 127.0.0.1");
        stringList.add("d:");
        stringList.add("cd D:\\IdeaProjects\\motorcycle\\tool_java_fun_project\\source_dir ");
        stringList.add("hugo --buildDrafts");
        Runtime run = Runtime.getRuntime();
//        String[] cmd = new String[] { "cmd.exe", "/C", StringUtils.join(stringList)};
//        String cmd = "cmd /k dir";
//        String cmd = "cmd /c dir";
        String cmd = "cmd /c " + StringUtils.join(stringList, " ; ");

        try {
            Process p = run.exec(cmd);
            InputStream ins = p.getInputStream();
            InputStream ers = p.getErrorStream();
            new Thread(new InputStreamThread(ins)).start();
            p.waitFor();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


//        Iterator<String> iterator = stringList.iterator();
//        while (iterator.hasNext()){
//            String next = iterator.next();
//            try {
//
//                Process p = run.exec(next);
//                InputStream ins = p.getInputStream();
//                InputStream ers = p.getErrorStream();
//                new Thread(new InputStreamThread(ins)).start();
//                p.waitFor();
//            } catch (IOException e) {
//                e.printStackTrace();
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//        }
    }

    class InputStreamThread implements Runnable {
        private InputStream ins = null;
        private BufferedReader bfr = null;

        public InputStreamThread(InputStream ins) {
            this.ins = ins;
            this.bfr = new BufferedReader(new InputStreamReader(ins));
        }

        @Override
        public void run() {
            String line = null;
            byte[] b = new byte[100];
            int num = 0;
            try {
                while ((num = ins.read(b)) != -1) {
                    System.out.println(new String(b, "gb2312"));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
