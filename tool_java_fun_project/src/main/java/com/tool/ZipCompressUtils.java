package com.tool;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;
/**
 *
 * 文件压缩成zip
 *
 */
public class ZipCompressUtils {

    /**
     *
     * 将文件夹及文件夹包含的内容压缩成zip文件
     * (为了解决中文乱码的问题，ZipOutputStream用org.apache.tools.zip.*)
     *
     * @param inputFile 源文件
     * @param delFlag 删除源文件标记
     * @return File 压缩后的文件
     */
    public static File zipCompress(File inputFile, boolean delFlag) throws Exception{
        File zipFile = null;
        //创建zip输出流
        //为了解决中文乱码的问题,ZipOutputStream用org.apache.tools.zip.*
        //不要用 java.util.zip.*
        ZipOutputStream zos = null;
        if(inputFile != null && inputFile.exists()) {
            try {
                String path = inputFile.getCanonicalPath();
                String zipFileName = path + ".zip";
                zipFile = new File(zipFileName);
                if(zipFile.exists()) {
                    zipFile.delete();
                }
                zipFile.createNewFile();//创建文件
                zos = new ZipOutputStream(new FileOutputStream(zipFile));
                //解决中文乱码问题,指定编码GBK
                zos.setEncoding("GBK");
                //压缩文件或文件夹
                compressFile(zos, inputFile, inputFile.getName());
            }catch(Exception e) {
                System.out.println("文件压缩异常：" + e);
                throw e;
            }finally {
                try {
                    if(zos != null) {
                        //先调用outputStream的flush()再关闭流；
                        //流如果未正常关闭,则会在解压的时候出现压缩文件损坏的现象
                        zos.flush();
                        zos.close();
                    }

                    if(delFlag) {
                        //递归删除源文件及源文件夹
                        deleteFile(inputFile);
                    }
                }catch(Exception ex) {
                    System.out.println("输出流关闭异常：" + ex);
                }
            }
        }
        return zipFile;
    }

    /**
     * 压缩文件或文件夹
     * (ZipEntry 使用org.apache.tools.zip.*，不要用 java.util.zip.*)
     *
     * @param zos zip输出流
     * @param sourceFile 源文件
     * @param baseName 父路径
     * @throws Exception 异常
     */
    private static void compressFile(ZipOutputStream zos, File sourceFile, String baseName) throws Exception{
        if(!sourceFile.exists()) {
            return;
        }

        //若路径为目录（文件夹）
        if(sourceFile.isDirectory()) {
            //取出文件夹中的文件（或子文件夹）
            File[] fileList = sourceFile.listFiles();
            //若文件夹为空，则创建一个目录进入点
            if(fileList.length == 0) {
                //文件名称后跟File.separator表示这是一个文件夹
                zos.putNextEntry(new ZipEntry(baseName + File.separator));
                //若文件夹非空，则递归调用compressFile,对文件夹中的每个文件或每个文件夹进行压缩
            }else {
                for(int i = 0; i < fileList.length; i++) {
                    compressFile(zos, fileList[i],
                            baseName + File.separator + fileList[i].getName());
                }
            }

            //若为文件,则先创建目录进入点,再将文件写入zip文件中
        }else {
            ZipEntry ze = new ZipEntry(baseName);
            //设置ZipEntry的最后修改时间为源文件的最后修改时间
            ze.setTime(sourceFile.lastModified());
            zos.putNextEntry(ze);

            FileInputStream fis = new FileInputStream(sourceFile);
            copyStream(fis, zos);
            try {
                if(fis != null) {
                    fis.close();
                }
            }catch(Exception e) {
                System.out.println("输入流关闭异常：" + e);
            }
        }
    }

    /**
     * 流拷贝
     *
     * @param in 输入流
     * @param out 输出流
     * @throws IOException
     */
    private static void copyStream(InputStream in, OutputStream out) throws IOException{
        int bufferLength = 1024 * 100;
        synchronized(in) {
            synchronized(out) {
                int count = 0;
                byte[] buffer = new byte[bufferLength];
                while((count = in.read(buffer, 0, bufferLength)) != -1) {
                    out.write(buffer, 0, count);
                }
                out.flush();
            }
        }
    }

    /**
     * 递归删除文件夹中的目录及文件
     *
     * @param sourceFile
     * @throws Exception
     */
    private static void deleteFile(File sourceFile) throws Exception{
        //如果路径为目录
        if(sourceFile.isDirectory()) {
            //取出文件夹中的文件或子文件夹
            File[] fList = sourceFile.listFiles();
            if(fList.length == 0) {
                sourceFile.delete();
            }else {
                for(int i = 0; i < fList.length; i++) {
                    deleteFile(fList[i]);
                }
                sourceFile.delete();
            }
            //如果为文件则直接删除
        }else {
            sourceFile.delete();
        }
    }

    /**
     *     当前路径下若已有同名文件又不愿意覆盖，
     *     则依次追加后缀
     *
     * @param path
     * @param docName
     * @return
     * @throws Exception
     */
    private static File createFile(String path, final String docName) throws Exception{
        //创建目标文件
        File destFile = new File(path, docName);
        //如果路径下存在同名文件又不愿意覆盖，
        //那么则依次给文件加后缀（2）、（3）……
        if(destFile.exists()) {
            int i = 1;
            do {
                ++i;
                //按“.”分割
                String[] doc = docName.split("\\.");
                destFile = new File(path, doc[0] + "(" + i + ")" + "." + doc[1]);

                //直到文件创建成功则跳出循环
            }while(!destFile.createNewFile());
        }else {
            destFile.createNewFile();
        }
        return destFile;
    }

    /**
     * 过滤非法字符
     * @param inputStr 输入字符串
     * @return
     */
    private static String filterIllegalSymbol(String inputStr) {
        if(StringUtils.isEmpty(inputStr)) {
            return null;
        }
        String regEx = "[ _`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]|\n|\r|\t";
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(inputStr);
        //若包含非法字符则循环处理
        if(matcher.find()) {
            char[] regExCharArray = regEx.toCharArray();
            for(int i = 0; i < regExCharArray.length; i++) {
                char c = regExCharArray[i];
                System.out.println(i + " 当前字符：" + c);
                if(inputStr.indexOf(c) != -1) {
                    System.out.println("过滤前：" + inputStr);
                    //因为某些符号在正则表达示中有相应意义，所以要加上“\\”表示转义，
                    //否则会报错，例如java.util.regex.PatternSyntaxException: Dangling meta character '*' near index 0
                    inputStr = inputStr.replaceAll("\\\\" + String.valueOf(c), "");
                    System.out.println("过滤后：" +inputStr);
                }
            }
        }
        //测试用
        System.out.println(inputStr);
        return inputStr;

    }


}





