package com.tool.stream;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Demo2 {
    public static class TestEntity {
        private String uuid;
        private Double price;

        private String name;

        public String toString() {
            return "TestEntity{" +
                    "uuid='" + uuid + '\'' +
                    ", price=" + price +
                    ", name='" + name + '\'' +
                    '}';
        }

        public TestEntity(String uuid, Double price, String name) {
            this.uuid = uuid;
            this.price = price;
            this.name = name;
        }

        public TestEntity() {
        }

        public String getUuid() {
            return uuid;
        }

        public void setUuid(String uuid) {
            this.uuid = uuid;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static void main(String[] args) {
        Function<Double, Double> function = (oo -> {
            Random random = new Random(System.currentTimeMillis());
            return random.nextDouble() * 100 * oo;
        });
        List<TestEntity> entityList = new ArrayList<>();
        entityList.add(new TestEntity(UUID.randomUUID().toString(), function.apply(100.01d), "a"));
        entityList.add(new TestEntity(UUID.randomUUID().toString(), function.apply(199.01d), "a"));
        entityList.add(new TestEntity(UUID.randomUUID().toString(), function.apply(97.01d), "b"));
        Map<String, List<TestEntity>> listMap = entityList.stream().collect(Collectors.groupingBy(obj -> obj.getName()));
        Map<String, Long> longMap = entityList.stream().collect(Collectors.groupingBy(obj -> obj.getName(), Collectors.counting()));
        Map<String, DoubleSummaryStatistics> doubleSummaryStatisticsMap = entityList.stream().collect(Collectors.groupingBy(obj -> obj.getName(), Collectors.summarizingDouble(TestEntity::getPrice)));
        doubleSummaryStatisticsMap.entrySet().stream().forEach(obj -> {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("名称:").append( obj.getKey()).append(" ") ;
            stringBuilder.append("最大值:" + obj.getValue().getMax());
            stringBuilder.append("最小值:" + obj.getValue().getMin());
            stringBuilder.append("合计值:" + obj.getValue().getSum());
            stringBuilder.append("平均值:" + obj.getValue().getAverage());
            stringBuilder.append("数量:" + obj.getValue().getCount());
            System.out.println(stringBuilder.toString());
        });
        /*
        最大值:14170.806808512518最小值:7121.362689911748合计值:21292.169498424264平均值:10646.084749212132数量:2
        最大值:6907.74317116627最小值:6907.74317116627合计值:6907.74317116627平均值:6907.74317116627数量:1
        * */
    }
}
