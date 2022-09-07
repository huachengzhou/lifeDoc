package com.tool.cas;

import sun.misc.Unsafe;
import java.lang.reflect.Field;

public final class UnsafeAccessor {
    private static Unsafe unsafe;
    //Unsafe提供的getUnsafe()方法只能被根类加载器加载的类所调用，也就是jdk内部的类。我们可以通过反射来获取Unsafe对象
    static {
        try {
            //这个名字是 theUnsafe 里面的不要随便写
            Field unsafeFile = Unsafe.class.getDeclaredField("theUnsafe");
            unsafeFile.setAccessible(true);
            //因为是静态属性
            unsafe = (Unsafe) unsafeFile.get(null);
        } catch (Exception e) {
        }
    }

    public static Unsafe getUnsafe() {
        return unsafe;
    }

}