package com.tool;

import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.LocalTime;
import org.joda.time.Period;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 实现描述：日期处理工具
 *
 * @author red
 * @version v1.0.0
 */
public final class DateUtils {

    public final static int MON = 1;
    public final static int TUE = 2;
    public final static int WED = 3;
    public final static int THU = 4;
    public final static int FRI = 5;
    public final static int SAT = 6;
    public final static int SUN = 7;
    public final static String DATE_CHINESE_PATTERN = "yyyy年MM月dd日";
    public final static String DATE_MONTH_DAY_CHINESE_PATTERN = "MM月dd日";
    /**
     * 标准的中文小时分钟格式
     */
    public final static String HOUR_MINUTE_CHINESE_PATTERN = "HH点mm分";
    /**
     * 标准日期格式
     */
    public final static String DATE_PATTERN = "yyyy-MM-dd";
    public final static String DATE_YYYY_MM = "yyyy-MM";
    public final static String DATE_SHORT_PATTERN = "yyyyMMdd";
    public final static String DATE_SLASH_PATTERN = "yyyy/MM/dd";
    /**
     * 标准日期时分秒毫秒格式
     */
    public final static String DATETIME_MILL_SECOND = "yyyy-MM-dd HH:mm:ss.SSS";
    /**
     * 标准时间格式
     */
    public final static String DATETIME_PATTERN = "yyyy-MM-dd HH:mm:ss";
    /**
     * 标准时间格式，不含秒
     */
    public final static String DATETIME_PATTERN_SHORT = "yyyy-MM-dd HH:mm";
    /**
     * 特殊的格式 针对创建订单，拼凑的最晚支付时间
     */
    public final static String DATETIME_PATTERN_CREAT_ORDER = "yyyy-MM-ddHH:mm";
    public final static String DATETIME_SHORT_PATTERN = "yyyyMMddHHmmss";
    /**
     * 标准年小时分钟格式
     */
    public final static String HOUR_MINUTE = "HH:mm";
    /**
     * 标准年小时分钟秒格式
     */
    public final static String HOUR_MINUTE_SECOND = "HH:mm:ss";
    /**
     * Number of milliseconds in a standard second.
     */
    public static final long MILLIS_PER_SECOND = 1000;
    /**
     * Number of milliseconds in a standard minute.
     */
    public static final long MILLIS_PER_MINUTE = 60 * MILLIS_PER_SECOND;
    /**
     * Number of milliseconds in a standard hour.
     */
    public static final long MILLIS_PER_HOUR = 60 * MILLIS_PER_MINUTE;
    /**
     * Number of milliseconds in a standard day.
     */
    public static final long MILLIS_PER_DAY = 24 * MILLIS_PER_HOUR;
    /**
     * Number of day in a year
     */
    public static final int DAYS_PER_YEAR = 365;
    /**
     * 标准年月格式
     */
    public final static String MONTH_PATTERN = "yyyy-MM";
    private final static Logger logger = LoggerFactory.getLogger(DateUtils.class);
    private final static String[] WEEK_NAMES = {"星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"};
    private final static char[] upper = "0一二三四五六七八九十".toCharArray();

    public static Date min() {
        return new Date(0L);
    }

    public static String format(Date time) {
        return format(time, "yyyy-MM-dd HH:mm:ss");
    }

    public static String formatNoSec(Date time) {
        return format(time, "yyyy-MM-dd HH:mm");
    }

    public static String format(Date time, String pattern) {
        if (time == null) {
            return StringUtils.EMPTY;
        }
        return new DateTime(time).toString(pattern);
    }

    public static Date parse(String time) {
        return DateTime.parse(time.replace(' ', 'T')).toDate();
    }

    public static Date parseTime(String time) {
        return new DateTime(0L).withMillisOfDay(LocalTime.parse(time).getMillisOfDay()).toDate();
    }

    public static Date secondsLater(int seconds) {
        return new DateTime().plusSeconds(seconds).toDate();
    }

    public static Date secondsAgo(int seconds) {
        return new DateTime().minusSeconds(seconds).toDate();
    }

    public static int secondsLater(Date future) {
        return (int) ((future.getTime() - System.currentTimeMillis()) / 1000L);
    }

    public static boolean isBeforeHoursAgo(Date time, int hours) {
        return new DateTime(time).plusHours(hours).isBeforeNow();
    }

    public static boolean isBeforeMinutesAgo(Date time, int minutes) {
        return new DateTime(time).plusMinutes(minutes).isBeforeNow();
    }

    public static int diffMinutes(Date from, Date to) {
        Period period = new Period(new DateTime(from), new DateTime(to));
        return period.toStandardMinutes().getMinutes();
    }

    /**
     * 在指定日期增加指定年
     *
     * @param date  指定日期
     * @param years 指定年数
     * @return
     */
    public static Date addYear(Date date, int years) {
        if (years == 0) {
            return date;
        }
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.YEAR, years);
        return c.getTime();
    }

    /**
     * 在指定日期减少指定年数
     *
     * @param date
     * @param years
     * @return
     */
    public static Date subtractYear(Date date, int years) {
        return addYear(date, -years);
    }

    /**
     * 在指定日期增加指定月数
     *
     * @param date   指定日期
     * @param months 指定月数
     * @return
     */
    public static Date addMonth(Date date, int months) {
        if (months == 0) {
            return date;
        }
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.MONTH, months);
        return c.getTime();
    }

    /**
     * 在指定日期减少指定月数
     *
     * @param date
     * @param months
     * @return
     */
    public static Date subtractMonth(Date date, int months) {
        return addMonth(date, -months);
    }

    /**
     * 在指定日期增加指定天数
     *
     * @param date 指定日期
     * @param days 指定天数
     * @return
     */
    public static Date addDay(Date date, int days) {
        if (days == 0) {
            return date;
        }
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DAY_OF_YEAR, days);
        return c.getTime();
    }

    /**
     * 在指定日期减少指定天数
     *
     * @param date 指定日期
     * @param days 指定天数
     * @return
     */
    public static Date subtractDay(Date date, int days) {
        return addDay(date, -days);
    }

    /**
     * 在指定日期增加指定天数
     *
     * @param date 指定日期
     * @param days 指定天数
     * @return
     */
    public static Date addDay(String date, int days) {
        return addDay(convertDate(date), days);
    }

    public static Date addMinute(Date date, int minute) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.MINUTE, minute);
        return c.getTime();
    }

    public static Date addHour(Date date, int hour) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.HOUR, hour);
        return c.getTime();
    }

    /**
     * 当前日期之后
     *
     * @param date
     * @return
     */
    public static boolean afterToday(Object date) {
        Date currentDate = new Date();
        return compareDate(date, currentDate) == 1;
    }

    /**
     * 当前时间之后
     *
     * @param date
     * @return
     */
    public static boolean afterTodayDate(Date date) {
        Date currentDate = new Date();
        return currentDate.compareTo(date) == -1;
    }

    /**
     * 当前日期之前
     *
     * @param date
     * @return
     */
    public static boolean beforeToday(Object date) {
        Date currentDate = new Date();
        return compareDate(date, currentDate) == -1;
    }

    /**
     * 当前时间之前
     *
     * @param date
     * @return
     */
    public static boolean beforeTodayDate(Date date) {
        Date currentDate = new Date();
        return currentDate.compareTo(date) == 1;
    }

    /**
     * 比较两个日期date1大于date2 返回1 等于返回0 小于返回-1
     *
     * @param date1
     * @param date2
     * @return
     */
    public static int compareDate(Object date1, Object date2) {
        if (date1 == null || date2 == null) {
            String msg = "illegal arguments,date1 and date2 must be not null.";
            throw new IllegalArgumentException(msg);
        }
        Date d1 = (Date) (date1 instanceof String ? convertDate((String) date1) : date1);
        Date d2 = (Date) (date2 instanceof String ? convertDate((String) date2) : date2);
        return round(d1, Calendar.DATE).compareTo(round(d2, Calendar.DATE));
    }

    public static long compareDateTime(Object date1, Object date2) {
        if (date1 == null || date2 == null) {
            String msg = "illegal arguments,date1 and date2 must be not null.";
            throw new IllegalArgumentException(msg);
        }
        Date d1 = (Date) (date1 instanceof String ? convertDate((String) date1) : date1);
        Date d2 = (Date) (date2 instanceof String ? convertDate((String) date2) : date2);
        return d1.getTime() - d2.getTime();
    }

    public static Date convertDate(Date date, String pattern) {
        if (StringUtils.isBlank(pattern)) {
            String msg = "the date or pattern is empty.";
            throw new IllegalArgumentException(msg);
        }
        String dateForPattern = formatDate(date, pattern);
        return convertDate(dateForPattern, pattern);
    }

    /**
     * 将long型整数转化为时间。
     *
     * @param date 时间对应的long值
     * @return 时间对象
     */
    public static Date convertDate(Long date) {
        return new Date(date);
    }

    /**
     * 将日期或者时间戳转化为日期对象
     *
     * @param date yyyy-MM-dd or yyyy-MM-dd HH:mm:ss or yyyy-MM-dd HH:mm:ss.SSS
     * @return
     */
    public static Date convertDate(String date) {
        if (StringUtils.isBlank(date)) {
            return null;
        }
        if (StringUtils.isNumeric(date)) {
            long timestamp = Long.parseLong(date);
            if (timestamp > 0 && timestamp < Long.MAX_VALUE) {
                return new Date(timestamp);
            } else {
                return null;
            }
        }
        if (date.indexOf(":") > 0) {
            return convertDate(date, DATETIME_PATTERN);
        } else if (date.indexOf(".") > 0) {
            return convertDate(date, DATETIME_MILL_SECOND);
        } else {
            return convertDate(date, DATE_PATTERN);
        }
    }

    /**
     * 将年份、月份、日期转化为日期对象
     *
     * @param year
     * @param month
     * @param day
     * @return
     */
    public static Date convertDate(int year, int month, int day) {
        String dateString = year + "-" + month + "-" + day;
        return convertDate(dateString, DATE_PATTERN);
    }

    /**
     * 将日期或者时间字符串转化为日期对象
     *
     * @param date    日期字符串
     * @param pattern 格式字符串</br> yyyy-MM-DD, yyyy/MM/DD, yyyyMMdd</br> yyyy-MM-dd-HH:mm:ss, yyyy-MM-dd HH:mm:ss
     *                格式字符串可选字符："GyMdkHmsSEDFwWahKzZ"
     * @return Date
     */
    public static Date convertDate(String date, String pattern) {
        try {
            if (StringUtils.isEmpty(pattern) || StringUtils.isEmpty(date)) {
                String msg = "the date or pattern is empty.";
                throw new IllegalArgumentException(msg);
            }
            SimpleDateFormat df = new SimpleDateFormat(pattern.trim());
            return df.parse(date.trim());
        } catch (Exception e) {
            logger.error("Method===convertDate error!", e);
            return null;
        }
    }

    /**
     * 将时间字符串转化为时间对象Time
     *
     * @param time    时间字符串
     * @param pattern 格式字符串 yyyy-MM-dd HH:mm:ss or yyyy-MM-dd HH:mm:ss.SSS
     * @return
     */
    public static Time convertTime(String time, String pattern) {
        if ("24:00:00".equals(time)) {
            time = "23:59:59";
        }
        Date d = convertDate(time, pattern);
        return new Time(d.getTime());
    }

    /**
     * 获得日期相差天数
     *
     * @param date1 日期
     * @param date2 日期
     * @return
     */
    public static int diffDate(Date date1, Date date2) {
        return (int) ((date1.getTime() - date2.getTime()) / MILLIS_PER_DAY);
    }

    /**
     * 获取两个日期相差的分钟数
     *
     * @param date1
     * @param date2
     * @return
     */
    public static int diffMinute(Date date1, Date date2) {
        return (int) ((date1.getTime() - date2.getTime()) / MILLIS_PER_MINUTE);
    }

    public static long diffSeconds(Date date1, Date date2) {
        return ((date1.getTime() - date2.getTime()) / MILLIS_PER_SECOND);
    }

    /**
     * 格式为时间字符串
     *
     * @param date 日期
     * @return yyyy-MM-dd Date
     */
    public static String formatDate(Date date) {
        try {
            return formatDate(date, DATE_PATTERN);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 按指定格式字符串格式时间
     *
     * @param date    日期或者时间
     * @param pattern 格式化字符串 yyyy-MM-dd， yyyy-MM-dd HH:mm:ss, yyyy年MM月dd日 etc.</br>
     * @return
     */
    public static String formatDate(Date date, String pattern) {
        if (null == date || StringUtils.isBlank(pattern)) {
            return null;
        }
        SimpleDateFormat format = new SimpleDateFormat(pattern.trim());
        return format.format(date);
    }

    /**
     * 格式为时间戳字符串
     *
     * @param date 时间
     * @return yyyy-MM-dd HH:mm:ss Date
     */
    public static String formatDateTime(Date date) {
        try {
            return formatDate(date, DATETIME_PATTERN);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 将制定时间格式为字符串'yyyyMMddHHmmss'.
     *
     * @return
     */
    public static String formatDateToYMDHMS(Date date) {
        return formatDate(date, DATETIME_SHORT_PATTERN);
    }

    public static String formatMonth(Date date) {
        return formatDate(date, MONTH_PATTERN);
    }

    /**
     * 将当前时间格式为字符串'yyyyMMddHHmmss'.
     *
     * @return
     */
    public static String formatNowToYMDHMS() {
        return formatDateToYMDHMS(new Date());
    }

    public static String formatNowToYMD() {
        return formatDate(new Date(), DATE_SHORT_PATTERN);
    }

    public static Timestamp getCurrentTimestamp() {
        return new Timestamp(new Date().getTime());
    }

    public static Date getDateFromShortString(String str) {
        SimpleDateFormat simpleDF = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return simpleDF.parse(str);
        } catch (ParseException e) {
            logger.warn("parse date error", e);
        }
        return null;
    }

    /**
     * 获得本周第一天
     *
     * @param date
     * @return
     */
    public static Date getFirstDayOfThisWeek(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        return cal.getTime();
    }

    /**
     * 获得小时
     *
     * @param date
     * @return
     */
    public static int getHourOfDay(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.HOUR_OF_DAY);
    }

    public static Date getLastMonth() {
        Calendar c = Calendar.getInstance();
        int month = c.get(Calendar.MONTH);
        c.set(Calendar.MONTH, month - 1);
        return c.getTime();
    }

    /**
     * 获得分钟数
     *
     * @param date
     * @return
     */
    public static int getMinute(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.MINUTE);
    }

    /**
     * 获取后续第n天日期
     *
     * @param date
     * @param n    第n天
     * @return
     */
    public static Date getNextNDay(Date date, int n) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, n);
        return cal.getTime();
    }

    /**
     * 获得星期数
     *
     * @param date 日期
     * @return
     */
    public static int getWeekNumber(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int number = c.get(Calendar.DAY_OF_WEEK) - 1;
        if (number == 0) {
            number = 7;
        }
        return number;
    }

    /**
     * 获得星期名称
     *
     * @param date
     * @return
     */
    public static String getWeekNumberString(Date date) {
        int dayNum = getWeekNumber(date);
        return WEEK_NAMES[dayNum - 1];
    }

    /**
     * 是否同一天
     *
     * @param date1
     * @param date2
     * @return
     */
    public static boolean isSameDay(Object date1, Object date2) {
        return compareDate(date1, date2) == 0;
    }

    /**
     * 检查时间或者字符串是否合法
     *
     * @param date    时间
     * @param pattern 格式串
     * @return
     */
    public static boolean isValidDate(String date, String pattern) {
        try {
            convertDate(pattern, date);
            return true;
        } catch (Exception e) {
            logger.error("Method===isValidDate error!", e);
            return false;
        }
    }

    /**
     * 获得当前时间
     *
     * @return Timestamp
     */
    public static Date now() {
        return new Date();
    }

    /**
     * 获得当前时间戳
     *
     * @return Timestamp
     */
    public static Timestamp nowTimestamp() {
        return new Timestamp(new Date().getTime());
    }

    /**
     * 获得当前时间字符串,格式为：yyyy-MM-dd HH:mm:ss
     *
     * @return
     */
    public static String nowDateTime() {
        return formatDate(new Date(), DATETIME_PATTERN);
    }

    /**
     * 按指定roundType格式化日期。
     *
     * @param date      日期
     * @param roundType
     * @return Date
     */
    public static Date round(Date date, int roundType) {
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(date.getTime());
        switch (roundType) {
            case Calendar.MONTH:
                c.set(Calendar.DAY_OF_MONTH, 1);
            case Calendar.DATE:
                c.set(Calendar.HOUR_OF_DAY, 0);
            case Calendar.HOUR:
                c.set(Calendar.MINUTE, 0);
            case Calendar.MINUTE:
                c.set(Calendar.SECOND, 0);
            case Calendar.SECOND:
                c.set(Calendar.MILLISECOND, 0);
                return c.getTime();
            default:
                throw new IllegalArgumentException("invalid round roundType.");
        }
    }

    /**
     * 获得当前日期对象
     *
     * @return
     */
    public static Date today() {
        return convertDate(formatDate(new Date()), DATE_PATTERN);
    }

    /**
     * 获得当前日期字符串,格式为：yyyy-MM-dd
     *
     * @return
     */
    public static String todayDate() {
        return formatDate(new Date());
    }

    /**
     * 将日期或者时间字符串转化为Timestamp对象
     *
     * @param date    日期字符串
     * @param pattern 格式字符串</br> yyyy-MM-DD, yyyy/MM/DD, yyyyMMdd</br> yyyy-MM-dd-HH:mm:ss, yyyy-MM-dd HH:mm:ss
     * @return Timestamp
     * @author reeboo
     */
    public static Timestamp toTimestamp(String date, String pattern) {
        SimpleDateFormat format = new SimpleDateFormat(pattern.trim());
        try {
            return new Timestamp(format.parse(date).getTime());
        } catch (ParseException e) {
        }
        return null;
    }

    public static Date getFirstDateOfCurrentMonth(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

    public static Date setDateTime(Date date, Date time) {
        return new DateTime(date).withMillisOfDay(new DateTime(time).getMillisOfDay()).toDate();
    }

    public static Date getFirstDateFromDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

    /**
     * 判断当前时间是否在某个区间内
     *
     * @param startDate
     * @param endDate
     * @return
     */
    public static boolean todayInClose(Date startDate, Date endDate) {
        Date currentDate = convertDate(new Date(), DATE_PATTERN);
        return currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime();
    }

    /**
     * 判断某个时间是否在对应的时间段内
     *
     * @param startDate
     * @param endDate
     * @param time
     * @return
     */
    public final static boolean timeInClose(Date startDate, Date endDate, Date time) {
        return time.getTime() >= startDate.getTime() && time.getTime() <= endDate.getTime();
    }

    // 时间转换成毫秒,空返回-1
    public static Long getTime(Date date) {
        if (null == date) {
            return null;
        }
        return date.getTime();
    }

    /**
     * 判断两个时间区间是否有交集
     *
     * @param closeOneStartDate
     * @param closeOneEndDate
     * @param closeTwoStartDate
     * @param closeTwoEndDate
     * @return
     */
    public static boolean timeIntersection(Date closeOneStartDate, Date closeOneEndDate, Date closeTwoStartDate,
                                           Date closeTwoEndDate) {
        long start = Math.max(closeOneStartDate.getTime(), closeTwoStartDate.getTime());
        long end = Math.min(closeOneEndDate.getTime(), closeTwoEndDate.getTime());
        return start <= end;
    }

    /**
     * 返回四位年份
     *
     * @param date
     * @return
     */
    public static int getYear(Date date) {
        if (date == null)
            return -1;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }

    /**
     * 返回月数(1-12)
     *
     * @param date
     * @return
     */
    public static int getMonth(Date date) {
        if (date == null)
            return -1;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.MONTH) + 1;
    }

    /**
     * 返回月几(1-31)
     *
     * @param date
     * @return
     */
    public static int getMonthDay(Date date) {
        if (date == null)
            return -1;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.DAY_OF_MONTH);
    }

    /**
     * 获取某个日期的上一天
     *
     * @param date
     * @return
     */
    public static Date getPrevDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        return calendar.getTime();
    }

    /**
     * 校验是否是日期时间格式（yyyy-MM-dd HH:mm:ss）
     *
     * @param dateStr
     * @return
     */
    public static boolean matchDatetimePattern(String dateStr) {
        return matchPattern(dateStr, DATETIME_PATTERN);
    }

    /**
     * 校验是否是指定的日期格式
     *
     * @param dateStr
     * @return
     */
    public static boolean matchPattern(String dateStr, String pattern) {
        if (StringUtils.isEmpty(dateStr) || dateStr.length() != pattern.length()) {
            return false;
        }

        try {
            Date date = convertDate(dateStr, pattern);
            if (date == null) {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    /**
     * 获得该月第一天
     *
     * @param year
     * @param month
     * @return
     */
    public static String getFirstDayOfMonth(Integer year, Integer month) {
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR, year);
        //设置月份
        cal.set(Calendar.MONTH, month - 1);
        //获取某月最小天数
        int firstDay = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最小天数
        cal.set(Calendar.DAY_OF_MONTH, firstDay);
        //格式化日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String firstDayOfMonth = sdf.format(cal.getTime());
        return firstDayOfMonth;
    }

    /**
     * 获得该月最后一天
     *
     * @param year
     * @param month
     * @return
     */
    public static String getLastDayOfMonth(Integer year, Integer month) {
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR, year);
        //设置月份
        cal.set(Calendar.MONTH, month - 1);
        //获取某月最大天数
        int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        //格式化日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String lastDayOfMonth = sdf.format(cal.getTime());
        return lastDayOfMonth;
    }

    public static String getUpperDate(String date) {
        //支持yyyy-MM-dd、yyyy/MM/dd、yyyyMMdd等格式
        //返回格式：二0一八年六月十四日
        if (date == null)
            return null;
        //非数字的都去掉
        date = date.replaceAll("\\D", "");
        if (date.length() != 8)
            return null;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 4; i++) {//年
            sb.append(upper[Integer.parseInt(date.substring(i, i + 1))]);
        }
        sb.append("年");//拼接年
        int month = Integer.parseInt(date.substring(4, 6));
        if (month <= 10) {
            sb.append(upper[month]);
        } else {
            sb.append("十").append(upper[month % 10]);
        }
        sb.append("月");//拼接月

        int day = Integer.parseInt(date.substring(6));
        if (day <= 10) {
            sb.append(upper[day]);
        } else if (day < 20) {
            sb.append("十").append(upper[day % 10]);
        } else {
            sb.append(upper[day / 10]).append("十");
            int tmp = day % 10;
            if (tmp != 0)
                sb.append(upper[tmp]);
        }
        sb.append("日");//拼接日
        return sb.toString();
    }
}
