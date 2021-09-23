package com.tool;

import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.StrSubstitutor;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 实现描述：格式化工具类
 *
 * @author red
 * @version v1.0.0
 */
public class FormatUtils {

    /**
     * 将 BigDecimal 转换为 去掉末尾无效0 的字符
     *
     * @param number
     * @return
     */
    public static String convertBigDecimalToPlainString(BigDecimal number) {
        if (number == null) {
            return null;
        }

        BigDecimal zero = BigDecimal.ZERO;
        if (number.compareTo(zero) == 0) {
            number = zero;
        } else {
            number = number.stripTrailingZeros();
        }
        return number.toPlainString();
    }

    /**
     * 实体对象转换成map结构
     *
     * @param obj
     * @return
     * @throws IllegalAccessException
     */
    public static Map<String, Object> transBean2Map(Object obj) throws IllegalAccessException {

        if (obj == null)
            return null;

        Map<String, Object> map = Maps.newHashMap();

        for (Class<?> clazz = obj.getClass(); clazz != Object.class; clazz = clazz.getSuperclass()) {
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                String fieldName = field.getName();
                field.setAccessible(true);
                Object value = field.get(obj);

                if (value != null)
                    map.put(fieldName, value);
            }
        }

        return map;
    }

    /**
     * map对象转bean对象
     *
     * @param map
     * @param clazz
     * @param <T>
     * @return
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     * @throws IntrospectionException
     * @throws InstantiationException
     */
    public static <T> T transMap2Bean(Map<String, Object> map, Class<T> clazz) throws InvocationTargetException, IllegalAccessException, IntrospectionException, InstantiationException {
        T obj = clazz.newInstance();
        BeanInfo beanInfo = Introspector.getBeanInfo(clazz);
        PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();

        for (PropertyDescriptor property : propertyDescriptors) {
            String key = property.getName();
            if (map.containsKey(key)) {
                Object value = map.get(key);
                /** 得到property对应的setter方法 **/
                Method setter = property.getWriteMethod();
                setter.invoke(obj, value);
            }

        }

        return obj;
    }

    /**
     * 驼峰法转下划线
     *
     * @param param 原字符串
     * @return
     */
    public static String camelToUnderline(String param) {
        char UNDERLINE = '_';
        int len = param.length();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            char c = param.charAt(i);
            if (Character.isUpperCase(c)) {
                if (i > 0) {
                    sb.append(UNDERLINE);
                }
                sb.append(Character.toLowerCase(c));
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    /**
     * 下划线转驼峰法
     *
     * @param line       源字符串
     * @param smallCamel 大小驼峰,是否为小驼峰
     * @return
     */
    public static String underlineToCamel(String line, boolean smallCamel) {

        char UNDERLINE = '_';

        if (line.indexOf(UNDERLINE) < 0) {
            return line;//如果没有下下划线，则不进行处理
        }
        if (line == null || "".equals(line)) {
            return "";
        }
        StringBuffer sb = new StringBuffer();
        Pattern pattern = Pattern.compile("([A-Za-z\\d]+)(_)?");
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String word = matcher.group();
            sb.append(smallCamel && matcher.start() == 0 ? Character.toLowerCase(word.charAt(0)) : Character.toUpperCase(word.charAt(0)));
            int index = word.lastIndexOf(UNDERLINE);
            if (index > 0) {
                sb.append(word.substring(1, index).toLowerCase());
            } else {
                sb.append(word.substring(1).toLowerCase());
            }
        }
        return sb.toString();
    }

    public static String joinerComma(Iterable<?> parts) {
        if (parts == null)
            return null;
        String join = Joiner.on(",").skipNulls().join(parts);
        return join;
    }

    public static String transformListString(List<String> stringList) {
        if (CollectionUtils.isEmpty(stringList))
            return null;
        String join = Joiner.on(",").skipNulls().join(stringList);
        return join;
    }

    public static String transformListString(List<String> stringList, String spliter) {
        if (CollectionUtils.isEmpty(stringList))
            return null;
        String join = Joiner.on(spliter).skipNulls().join(stringList);
        return join;
    }

    public static List<String> transformString2List(String strs) {
        if (StringUtils.isBlank(strs))
            return null;
        List<String> strings = Splitter.on(",").trimResults().splitToList(strs);
        return Lists.newArrayList(strings);
    }

    public static List<String> transformString2List(String strs, String spliter) {
        if (StringUtils.isBlank(strs))
            return null;
        List<String> strings = Splitter.on(spliter).trimResults().splitToList(strs);
        return Lists.newArrayList(strings);
    }

    /**
     * 首字符大写
     *
     * @param str
     * @return
     */
    public static String toUpperCaseFirstChar(String str) {
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;

    }

    /**
     * 首字符小写
     *
     * @param str
     * @return
     */
    public static String toLowerCaseFirstChar(String str) {
        str = str.substring(0, 1).toLowerCase() + str.substring(1);
        return str;

    }

    /**
     * eg: ${user} like ${what}
     *
     * @param template
     * @param param
     * @return
     */
    public static String templateFormat(String template, Map<String, Object> param) {
        StrSubstitutor sub = new StrSubstitutor(param);
        return sub.replace(template);
    }

    /**
     * 将字符List转为整形List
     *
     * @param strings
     * @return
     */
    public static List<Integer> ListStringToListInteger(List<String> strings) {
        List<Integer> integers = new ArrayList<>();
        for (String s : strings) {
            integers.add(Integer.valueOf(s));
        }
        return integers;
    }

    /**
     * 实体名转换成数据库表名
     *
     * @param clazz
     * @return
     */
    public static String entityNameConvertToTableName(Class clazz) {
        return entityNameConvertToTableName(clazz, "tb");
    }

    /**
     * 实体名转换成数据库表名（自定义前缀）
     *
     * @param clazz
     * @param prefix
     * @return
     */
    public static String entityNameConvertToTableName(Class clazz, String prefix) {
        return String.format("%s_%s", prefix, camelToUnderline(clazz.getSimpleName()));
    }

    /**
     * 数字字符串0补齐
     *
     * @param sourceInt
     * @param formatLength
     * @return
     */
    public static String frontCompWithZore(int sourceInt, int formatLength) {
        return String.format("%0" + formatLength + "d", sourceInt);
    }

    /**
     * 数字转为百分比，并保留指定位小数
     *
     * @param number   小数
     * @param newScale 小数位数
     * @return
     */
    public static String numberToPercent(double number, Integer newScale) {
        number = number * 100;
        String pattern = "0.";
        for (int i = 0; i < newScale; i++) {
            pattern += "0";
        }
        DecimalFormat df = new DecimalFormat(pattern);
        String format = df.format(number);
        return String.format("%s%%", format);
    }

}
