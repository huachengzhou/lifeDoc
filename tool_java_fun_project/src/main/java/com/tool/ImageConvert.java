package com.tool;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class ImageConvert {

    private static final String IMAGE_PATH_PNG = "D:\\myProjects\\lifeDoc\\tool_java_fun_project\\source_dir\\content\\docs\\english_study\\maimemo\\img\\v2-3c104f49875c4faf76879578c4aef347_720w.png";
    private static final String IMAGE_PATH_PNG_NEW = "D:\\myProjects\\lifeDoc\\tool_java_fun_project\\source_dir\\content\\docs\\english_study\\maimemo\\img\\v2-3d8e6dd3329993731e0e9f8ab1ff5d0e_720w.png";

    private static final String IMAGE_PATH_JPEG = "D:\\myProjects\\lifeDoc\\tool_java_fun_project\\source_dir\\content\\docs\\english_study\\maimemo\\img\\v2-3c104f49875c4faf76879578c4aef347_720w.jpg";
    private static final String IMAGE_PATH_JPEG_NEW = "D:\\myProjects\\lifeDoc\\tool_java_fun_project\\source_dir\\content\\docs\\english_study\\maimemo\\img\\v2-3d8e6dd3329993731e0e9f8ab1ff5d0e_720w.jpg";

    public static void main(String[] args) {
        jpeg2png();
    }

    public static void png2jpeg() {
        //读取图片
        FileOutputStream fos =null;
        try {
            BufferedImage bufferedImage = ImageIO.read(new File(IMAGE_PATH_PNG));
            //转成jpeg、
            BufferedImage bufferedImage1 = new BufferedImage(bufferedImage.getWidth(),
                    bufferedImage.getHeight(),
                    BufferedImage.TYPE_INT_RGB);
            bufferedImage1.createGraphics().drawImage(bufferedImage,0,0, Color.white,null);
            fos = new FileOutputStream(IMAGE_PATH_JPEG_NEW);
            ImageIO.write(bufferedImage,"jpg",fos);
            fos.flush();
        } catch (IOException e) {
            e.printStackTrace();
            try {
                fos.close();
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        }
    }

    public static void jpeg2png() {
        //读取图片
        try {
            BufferedImage bufferedImage = ImageIO.read(new File(IMAGE_PATH_JPEG));
            //转成png、
            BufferedImage bufferedImage1 = new BufferedImage(bufferedImage.getWidth(),
                    bufferedImage.getHeight(),
                    BufferedImage.TYPE_INT_ARGB);
            bufferedImage1.createGraphics().drawImage(bufferedImage,0,0, Color.white,null);
            FileOutputStream fos = new FileOutputStream(IMAGE_PATH_PNG_NEW);
            ImageIO.write(bufferedImage1,"png",fos);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}