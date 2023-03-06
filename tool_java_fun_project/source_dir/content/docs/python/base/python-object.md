---
title: "python 面向对象"
date: 2021-04-15
draft: false
weight: 1
---


## 面向对象

*   `类(Class):` 用来描述具有相同的属性和方法的对象的集合。它定义了该集合中每个对象所共有的属性和方法。对象是类的实例。
*   `类变量：`类变量在整个实例化的对象中是公用的。类变量定义在类中且在函数体之外。类变量通常不作为实例变量使用。
*   `数据成员：`类变量或者实例变量, 用于处理类及其实例对象的相关的数据。
*   `方法重写：`如果从父类继承的方法不能满足子类的需求，可以对其进行改写，这个过程叫方法的覆盖（override），也称为方法的重写。
*   `局部变量：`定义在方法中的变量，只作用于当前实例的类。
*   `实例变量：`在类的声明中，属性是用变量来表示的。这种变量就称为实例变量，是在类声明的内部但是在类的其他成员方法之外声明的。
*   `继承：`即一个派生类（derived class）继承基类（base class）的字段和方法。继承也允许把一个派生类的对象作为一个基类对象对待。例如，有这样一个设计：一个Dog类型的对象派生自Animal类，这是模拟"是一个（is-a）"关系（例图，Dog是一个Animal）。
*   `实例化：`创建一个类的实例，类的具体对象。
*   `方法：`类中定义的函数。
*   `对象：`通过类定义的数据结构实例。对象包括两个数据成员（类变量和实例变量）和方法。


```python
import random


class Employee:
    # 所有员工的基类 empCount 变量是一个类变量，它的值将在这个类的所有实例之间共享
    empCount = 0

    # 类的构造函数或初始化方法，当创建了这个类的实例时就会调用该方法
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1

    def displayCount(self):
        print("Total Employee", Employee.empCount, sep="  _")

    def displayEmployee(self):
        print("name:", self.name, " ;", "salary:", self.salary)

# 定义实例 1
t1 = Employee("张三", random.random() * random.random() * 10000)
t1.displayCount()
t1.displayEmployee()

# 定义实例 2
t2 = Employee("李四", random.random() * random.random() * 10000)
t2.displayCount()
t2.displayEmployee()
```

### 内置类属性

*   __dict__ : 类的属性（包含一个字典，由类的数据属性组成）
*   __doc__ :类的文档字符串
*   __name__: 类名
*   __module__: 类定义所在的模块（类的全名是'__main__.className'，如果类位于一个导入模块mymod中，那么className.__module__ 等于 mymod）
*   __bases__ : 类的所有父类构成元素（包含了一个由所有父类组成的元组）


```python
import random

class Person:
    hand = ""
    footer = ""
    head = ""


# 这里是继承 Person
class Teacher(Person) :
    # 静态类变量
    empCount = 0

    def __init__(self,name,position):
        self.name = name
        self.position = position


    def print(self):
        print("名字:",self.name,"  职位:",self.position)
        print("__dict__ ",Teacher.__dict__ ,sep=":")
        print("__doc__",Teacher.__doc__,sep=":")
        print("__name__",Teacher.__name__,sep=":")
        print("__module__",Teacher.__module__,sep=":")
        print("__bases__ ",Teacher.__bases__ ,sep=":")


t1 = Teacher('张老师','数学')
t1.print()


t2 = Teacher('李老师','英语')
t2.print()

```
