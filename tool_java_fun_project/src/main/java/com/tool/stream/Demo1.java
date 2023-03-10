package com.tool.stream;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Demo1 {

    public static class TestEntity {
        private Integer id;
        private String name;

        public TestEntity(Integer id, String name) {
            this.id = id;
            this.name = name;
        }

        public TestEntity() {
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        @Override
        public String toString() {
            return "TestEntity{" +
                    "id=" + id +
                    ", name='" + name + '\'' +
                    '}';
        }
    }

    public static void main(String[] args) {
        List<TestEntity> entityList = new ArrayList<>(2) ;
        entityList.add(new TestEntity(1,"图书馆"));
        entityList.add(new TestEntity(2,"艺术馆"));
        entityList.add(new TestEntity(1,"游泳池"));

//        Map<Integer, TestEntity> entityMap = entityList.stream().collect(Collectors.toMap(TestEntity::getId, user -> user));
        //下面的可以确保 百分之百 在key重复下不报错
        Map<Integer, TestEntity> entityMap = entityList.stream().collect(Collectors.toMap(TestEntity::getId, Function.identity(), (oldValue, newValue) -> newValue));

//        Map<Integer, String> stringMap = entityList.stream().collect(Collectors.toMap(TestEntity::getId, user -> user.getName()));
        Map<Integer, String> stringMap = entityList.stream().collect(Collectors.toMap(TestEntity::getId, t -> t.getName(), (oldValue, newValue) -> newValue));
        Map<Integer, List<TestEntity>> integerListMap = entityList.stream().collect(Collectors.groupingBy(oo -> oo.getId()));
        System.out.println(entityMap.get(1));
        System.out.println(stringMap.get(1));
        System.out.println(integerListMap.get(1));
        /*
        TestEntity{id=1, name='游泳池'}
        游泳池
        [TestEntity{id=1, name='图书馆'}, TestEntity{id=1, name='游泳池'}]
        * */
    }
}
