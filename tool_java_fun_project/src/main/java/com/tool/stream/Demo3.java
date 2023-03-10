package com.tool.stream;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Demo3 {
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
        List<TestEntity> entityList = new ArrayList<>();
        Function<Double, Double> function = (oo -> {
            Random random = new Random(System.currentTimeMillis());
            return random.nextDouble() * 100 * oo;
        });
        entityList.add(new TestEntity(UUID.randomUUID().toString(), function.apply(100.01d), "a"));
        entityList.add(new TestEntity(UUID.randomUUID().toString(), function.apply(199.01d), "a"));
        entityList.add(new TestEntity(UUID.randomUUID().toString(), function.apply(97.01d), "b"));

        entityList.stream().collect(Collectors.groupingBy( obj -> obj.getName() ,Collectors.summarizingDouble(ooEntity -> ooEntity.getPrice()))).forEach((s, obj) -> {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("名称:").append(s).append(" ") ;
            stringBuilder.append("最大值:" + obj.getMax());
            stringBuilder.append("最小值:" + obj.getMin());
            stringBuilder.append("合计值:" + obj.getSum());
            stringBuilder.append("平均值:" + obj.getAverage());
            stringBuilder.append("数量:" + obj.getCount());
            System.out.println(stringBuilder.toString());
        });

        System.out.println(Arrays.toString(entityList.stream().map(obj -> obj.toString()).collect(Collectors.toList()).toArray())); ;

        Double sumValue = entityList.stream().map(obj -> obj.getPrice()).reduce((sum, res) -> sum + res).get();
        System.out.println("sumValue:"+sumValue);
    }
}
