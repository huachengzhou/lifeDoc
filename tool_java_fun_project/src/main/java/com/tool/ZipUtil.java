package com.tool;

import org.apache.commons.io.FilenameUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.*;

/**
 * java.util.zip压缩/解压文件
 */
public class ZipUtil {

    /**
     * 缓冲器大小
     */
    private static final int BUFFER = 512;
    private static final int buffer = 2048;
    /**
     * 压缩得到的文件的后缀名
     */
    private static final String SUFFIX = ".zip";

    /**
     * 得到源文件路径的所有文件
     *
     * @param dirFile 压缩源文件路径
     */
    public static List<File> getAllFile(File dirFile) {

        List<File> fileList = new ArrayList<>();

        File[] files = dirFile.listFiles();
        for (File file : files) {//文件
            if (file.isFile()) {
                fileList.add(file);
                System.out.println("add file:" + file.getName());
            } else {//目录
                if (file.listFiles().length != 0) {//非空目录
                    fileList.addAll(getAllFile(file));//把递归文件加到fileList中
                } else {//空目录
                    fileList.add(file);
                    System.out.println("add empty dir:" + file.getName());
                }
            }
        }
        return fileList;
    }

    /**
     * 获取相对路径
     *
     * @param dirPath 源文件路径
     * @param file    准备压缩的单个文件
     */
    public static String getRelativePath(String dirPath, File file) {
        File dirFile = new File(dirPath);
        String relativePath = file.getName();

        while (true) {
            file = file.getParentFile();
            if (file == null) break;
            if (file.equals(dirFile)) {
                break;
            } else {
                relativePath = file.getName() + "/" + relativePath;
            }
        }
        return relativePath;
    }


    /**
     * @param destPath 解压目标路径
     * @param fileName 解压文件的相对路径
     */
    public static File createFile(String destPath, String fileName) {

        String[] dirs = fileName.split("/");//将文件名的各级目录分解
        File file = new File(destPath);

        if (dirs.length > 1) {//文件有上级目录
            for (int i = 0; i < dirs.length - 1; i++) {
                file = new File(file, dirs[i]);//依次创建文件对象知道文件的上一级目录
            }

            if (!file.exists()) {
                file.mkdirs();//文件对应目录若不存在，则创建
                try {
                    System.out.println("mkdirs: " + file.getCanonicalPath());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            file = new File(file, dirs[dirs.length - 1]);//创建文件

            return file;
        } else {
            if (!file.exists()) {//若目标路径的目录不存在，则创建
                file.mkdirs();
                try {
                    System.out.println("mkdirs: " + file.getCanonicalPath());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            file = new File(file, dirs[0]);//创建文件

            return file;
        }

    }

    /**
     * 没有指定压缩目标路径进行压缩,用默认的路径进行压缩
     *
     * @param dirPath 压缩源文件路径
     */
    public static void compress(String dirPath) {

        int firstIndex = dirPath.indexOf("/");
        int lastIndex = dirPath.lastIndexOf("/");
        String zipFileName = dirPath.substring(0, firstIndex + 1) + dirPath.substring(lastIndex + 1);
        compress(dirPath, zipFileName);
    }

    /**
     * 压缩文件
     *
     * @param dirPath     压缩源文件路径
     * @param zipFileName 压缩目标文件路径
     */
    public static void compress(String dirPath, String zipFileName) {


        zipFileName = zipFileName + SUFFIX;//添加文件的后缀名

        File dirFile = new File(dirPath);
        List<File> fileList = getAllFile(dirFile);

        byte[] buffer = new byte[BUFFER];
        ZipEntry zipEntry = null;
        int readLength = 0;     //每次读取出来的长度

        try {
            // 对输出文件做CRC32校验
            CheckedOutputStream cos = new CheckedOutputStream(new FileOutputStream(
                    zipFileName), new CRC32());
            ZipOutputStream zos = new ZipOutputStream(cos);

            for (File file : fileList) {

                if (file.isFile()) {   //若是文件，则压缩文件

                    zipEntry = new ZipEntry(getRelativePath(dirPath, file));  //
                    zipEntry.setSize(file.length());
                    zipEntry.setTime(file.lastModified());
                    zos.putNextEntry(zipEntry);

                    InputStream is = new BufferedInputStream(new FileInputStream(file));

                    while ((readLength = is.read(buffer, 0, BUFFER)) != -1) {
                        zos.write(buffer, 0, readLength);
                    }
                    is.close();
                    System.out.println("file compress:" + file.getCanonicalPath());
                } else {     //若是空目录，则写入zip条目中

                    zipEntry = new ZipEntry(getRelativePath(dirPath, file));
                    zos.putNextEntry(zipEntry);
                    System.out.println("dir compress: " + file.getCanonicalPath() + "/");
                }
            }
            zos.close();  //最后得关闭流，不然压缩最后一个文件会出错
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 解压
     */
    public static void decompress(String zipFileName, String destPath) {

        try {

            zipFileName = zipFileName + SUFFIX;
            ZipInputStream zis = new ZipInputStream(new FileInputStream(zipFileName));
            ZipEntry zipEntry = null;
            byte[] buffer = new byte[BUFFER];//缓冲器
            int readLength = 0;//每次读出来的长度
            while ((zipEntry = zis.getNextEntry()) != null) {
                if (zipEntry.isDirectory()) {//若是目录
                    File file = new File(destPath + "/" + zipEntry.getName());
                    if (!file.exists()) {
                        file.mkdirs();
                        System.out.println("mkdirs:" + file.getCanonicalPath());
                        continue;
                    }
                }//若是文件
                File file = createFile(destPath, zipEntry.getName());
                System.out.println("file created: " + file.getCanonicalPath());
                OutputStream os = new FileOutputStream(file);
                while ((readLength = zis.read(buffer, 0, BUFFER)) != -1) {
                    os.write(buffer, 0, readLength);
                }
                os.close();
                System.out.println("file uncompressed: " + file.getCanonicalPath());
            }


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 解压Zip文件
     *
     * @param path 文件目录
     */
    public static void unZip(String path) {
        int count = -1;
        String savepath = "";
        File file = null;
        InputStream is = null;
        FileOutputStream fos = null;
        BufferedOutputStream bos = null;
        savepath = path.substring(0, path.lastIndexOf(".")) + File.separator; //保存解压文件目录
        new File(savepath).mkdir(); //创建保存目录
        org.apache.tools.zip.ZipFile zipFile = null;
        try {
            zipFile = new org.apache.tools.zip.ZipFile(path, "gbk"); //解决中文乱码问题
            Enumeration<?> entries = zipFile.getEntries();
            while (entries.hasMoreElements()) {
                byte buf[] = new byte[buffer];
                org.apache.tools.zip.ZipEntry entry = (org.apache.tools.zip.ZipEntry) entries.nextElement();
                String filename = entry.getName();
                boolean ismkdir = false;
                if (filename.lastIndexOf("/") != -1) { //检查此文件是否带有文件夹
                    ismkdir = true;
                }
                filename = savepath + filename;
                if (entry.isDirectory()) { //如果是文件夹先创建
                    file = new File(filename);
                    file.mkdirs();
                    continue;
                }
                file = new File(filename);
                if (!file.exists()) { //如果是目录先创建
                    if (ismkdir) {
                        new File(filename.substring(0, filename.lastIndexOf("/"))).mkdirs(); //目录先创建
                    }
                }
                file.createNewFile(); //创建文件
                is = zipFile.getInputStream(entry);
                fos = new FileOutputStream(file);
                bos = new BufferedOutputStream(fos, buffer);
                while ((count = is.read(buf)) > -1) {
                    bos.write(buf, 0, count);
                }
                bos.flush();
                bos.close();
                fos.close();
                is.close();
            }
            zipFile.close();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                if (bos != null) {
                    bos.close();
                }
                if (fos != null) {
                    fos.close();
                }
                if (is != null) {
                    is.close();
                }
                if (zipFile != null) {
                    zipFile.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}