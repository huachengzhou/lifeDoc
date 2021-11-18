package com.tool;

import org.apache.commons.io.FilenameUtils;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class ImageConvertUtils {

    public static void jpeg2png(String IMAGE_PATH_JPEG) {
        File file = new File(IMAGE_PATH_JPEG);
        jpeg2png(file);
    }

    public static void jpeg2png(File file) {
        //读取图片
        try {
            BufferedImage bufferedImage = ImageIO.read(file);
            String IMAGE_PATH_JPEG = file.getPath() ;
            String IMAGE_PATH_PNG_NEW = FilenameUtils.getFullPath(IMAGE_PATH_JPEG) + FilenameUtils.getBaseName(IMAGE_PATH_JPEG) + ".png";
            //转成png、
            BufferedImage bufferedImage1 = new BufferedImage(bufferedImage.getWidth(),
                    bufferedImage.getHeight(),
                    BufferedImage.TYPE_INT_ARGB);
            bufferedImage1.createGraphics().drawImage(bufferedImage, 0, 0, Color.white, null);
            FileOutputStream fos = new FileOutputStream(IMAGE_PATH_PNG_NEW);
            ImageIO.write(bufferedImage1, "png", fos);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
