package com.tool;


import java.math.BigDecimal;
import java.util.Scanner;

public class JZChange {

    public static void main(String[] args) {
        JZChange t = new JZChange();
        Scanner input=new Scanner(System.in);

        System.out.println("Please input d:");
        double d=input.nextDouble();
        String s = t.decimal2BinaryStr(d);
        System.out.println("十进制数"+d+"转成二进制数为："+s);
    }

    /**
     * 十进制数转二进制数
     * @param d 十进制数
     * @return 十进制数转换成二进制的字符串
     */
    public static String decimal2BinaryStr(double d){
        String result = decimal2BinaryStr_Inte(d);
        result += decimal2BinaryStr_Deci(d);
        return result;
    }

    /**
     * 十进制整数部分转二进制数
     * @param d 十进制数
     * @return 十进制整数部分转换成二进制的字符串
     */
    public static String decimal2BinaryStr_Inte(double d){
//      return Integer.toBinaryString((int)d);
        /*
         * 本来利用上面的Integer.toBinaryString(int)就可以得到整数部分的二进制结果，
         * 但为了展示十进制转二进制的算法，现选择以下程序来进行转换
         */
        String result = "";
        long inte = (long)d;
        int index = 0;
        while(true){
            result += inte%2;
            inte = inte/2;
            index++;
            if(index%4 == 0){
                result+=" ";
            }
            if(inte==0){
                while(index%4!=0){
                    result+="0";
                    index++;
                }
                break;
            }
        }
        char[] c = result.toCharArray();
        char[] cc = new char[c.length];
        for(int i=c.length; i>0; i--){
            cc[cc.length-i] = c[i-1];
        }
        return new String(cc);
    }
    /**
     * 十进制小数部分转二进制
     * @param d 十进制数
     * @return 十进制小数部分转换成二进制小数的字符串
     */
    public static String decimal2BinaryStr_Deci(double d){
        return decimal2BinaryStr_Deci(d, 0);
    }

    /**
     * 十进制小数部分转二进制
     * @param d 十进制数
     * @param scale 小数部分精确的位数
     * @return 十进制小数部分转换成二进制小数的字符串
     */
    public static String decimal2BinaryStr_Deci(double d, int scale){
        double deci = sub(d,(long)d);
        if(deci==0){
            return "";
        }
        //为了防止程序因所转换的数据转换后的结果是一个无限循环的二进制小数，因此给其一个默认的精确度
        if(scale==0){
            scale = (String.valueOf(deci).length()-2)*4;
        }
        int index = 0;
        StringBuilder inteStr = new StringBuilder();
        double tempD = 0.d;
        while(true){
            if(deci==0 || index==scale){
                while(index%4!=0){
                    inteStr.append("0");
                    index++;
                }
                break;
            }
            if(index==0){
                inteStr.append(".");
            }
            tempD = deci*2;
            inteStr.append((int)tempD);
            deci = sub(tempD ,(int)tempD);
            index++;
            if(index%4 == 0){
                inteStr.append(" ");
            }
        }
        return inteStr.toString();
    }


    /**
     * 提供精确的减法运算。
     * @param v1 被减数
     * @param v2 减数
     * @return 两个参数的差
     */
    public static double sub(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.subtract(b2).doubleValue();
    }
}
