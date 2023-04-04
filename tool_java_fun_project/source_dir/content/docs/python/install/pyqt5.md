---
title: "python pyqt5"
date: 2023-03-02
draft: false
weight: 9
---

# pyqt5

## 基本结构

```python

# 导入需要的包
from PyQt5.QtWidgets import (QApplication, QWidget, QLabel, QPushButton)
import sys as sysUtils

# 创建一个应用程序
app = QApplication(sysUtils.argv)


# 控件也可以作为一个容器(承载其他的控件)
# 控件操作 start
window = QWidget()
window.setWindowTitle( "燕雀安知鸿鹄之志哉")
window.resize(600, 600)
window.move(200, 200)

# window 相当于是构建器
label = QLabel(window)

label.setText(
    "第一眼就看上的衣服往往你买不起，第一眼就心动的人往往他不会喜欢你。你真正喜欢想要的，没有一样是可以轻易得到的。这就是努力的理由")

label.move(100,100)

# show方法 不要放在前面了
window.show()

# 控件操作 end


# 开始执行应用程序，并进入消息循环
# 让整个程序开始执行,并且进入到消息循环(无限循环)
# 检测整个程序所接收到的用户的交互信息
# sysUtils.exit(app.exec())
sysUtils.exit(app.exec_())
# sysUtils.exit(1)
# while True:
#     pass
```

## 表格

+ QTableWidget常用方法

| 方法 | 描述 |
| --- | --- |
| setRowCount(rows) | 设置QTableWidget表格控件的行数 |
| setColumnCount(columns) | 设置QTableWidget表格控件的列数 |
| setHorizontalHeaderLabels(labels) | 设置QTableWidget表格控件的水平标签 |
| setVerticalHeaderLabels(labels) | 设置QTableWidget表格控件的垂直标签 |
| setRowHeight(row) | 设置单元格行的高度 |
| setColumnWidth(column) | 设置单元格列的宽度 |
| setItem(row,column,item) | 设置QTableWidgetItem给指定的行和列 |
| insertRow(row) | 在行索引处插入行 |
| insertColumn(column) | 在列索引处插入列 |
| removeRow(row) | 在行索引处删除行 |
| removeColumn(column) | 在列索引处删除列 |
| findItems(text,flags) | 使用给定的标志查找文本与字符串文本匹配的项目 |
| setCellWidget(row,column,widget) | 给指定行和列的单元格设置组件 |
| removeCellWidget(row,column) | 删除指定行和列的单元格的组件 |
| item(row,column) | 返回给定行和列的项目（如果已设置）；否则返回None |
| row(item) | 返回该表格项的行索引 |
| column(item) | 返回该表格项的列索引 |
| rowCount() | 返回表格的所有行数 |
| columnCount() | 返回表格的所有列数 |
| currentItem() | 返回当前的表格项 |
| currentRow() | 返回当前表格项的行索引 |
| currentColumn() | 返回当前表格项的列索引 |
| selectedItems() | 返回所有选定表格项的列表 |
| horizontalHeader().hide() | 隐藏水平表头 |
| verticalHeader().hide() | 隐藏垂直表头 |
| clear() | 清除表格内容和表头 |
| clearContents() | 清除表格内容 |
| setEditTriggers(triggers) | 设置编辑规则  QAbstractItemView.NoEditTriggers0No：不能对表格内容进行修改  QAbstractItemView.CurrentChanged1Editing：任何时候都能对单元格进行修改  QAbstractItemView.DoubleClicked2Editing：双击单元格  QAbstractItemView.SelectedClicked4Editing：单击已经选中的内容  QAbstractItemView.EditKeyPressed8Editing：当修改键按下时修改单元格  QAbstractItemView.AnyKeyPressed16Editing：按任意键修改单元格  QAbstractItemView.AllEditTriggers31Editing：包括以上所有条件 |
| setSelectionBehavior(behavior) | 设置表格选择行为  QAbstractItemView.SelectItems0Selecting：选中单个单元格  QAbstractItemView.SelectRows1Selecting：选中一行  QAbstractItemView.SelectColumns2Selecting：选中一列 |

+ QTableWidgetItem常用方法

| 方法 | 描述 |
| --- | --- |
| checkState() | 返回复选状态 |
| setCheckState(state) | 设置复选框的勾选状态  Qt.Checked：选中状态  Qt.PartiallyChecked：半选中状态  Qt.Unchecked：没有被选中 |
| icon() | 返回列表项的图标 |
| setIcon(icon) | 设置列表项的图标 |
| isHidden() | 返回列表项是否隐藏，如果隐藏返回True;不隐藏返回False |
| setHidden(hide) | 设置列表项是否隐藏，如果True则隐藏;False则不隐藏 |
| text() | 返回列表项的文本 |
| setText(text) | 设置列表项的文本 |
| flags() | 返回列表项的项目标志 |
| setForeground(brush) | 设置前景色 |
| setBackground(brush) | 设置背景色 |
| setFlags(flags) | 设置列表项的项目标志设置为flags |
| setTextAlignment(alignment) | 单元格文本对齐方式        Qt.AlignLeft：将单元格内的内容沿单元格的左边缘对齐          Qt.AlignRight：将单元格内的内容沿单元格的右边缘对齐  Qt.AlignHCenter：在可用空间中，居中显示在水平方向上  Qt.AlignJustify：将文本在可用空间内对齐，默认从左到右  Qt.AlignTop：与顶部对齐  Qt.AlignBottom：与底部对齐  Qt.AlignVCenter：在可用空间中，居中显示在垂直方向上  Qt.AlignBaseline：与基线对齐 |

+ QTableWidget常用信号

| 信号 | 描述 |
| --- | --- |
| itemClicked(item) | 当单击表格中单元格时，发射此信号 |
| itemDoubleClicked(item) | 当双击表格中单元格时，发射此信号 |
| itemChanged(item) | 当改变表格中单元格时，发射此信号 |
| itemEntered(item) | 当鼠标光标进入表格的单元格时，发射此信号 |
| itemPressed(item) | 当鼠标在表格的单元格上按下时，发射此信号 |
| itemSelectionChanged() | 当选择的单元格发生改变时，发射此信号 |
| cellClicked(row,column) | 当单击表格中单元格时，发射此信号 |
| cellDoubleClicked(row,column) | 当双击表格中单元格时，发射此信号 |
| cellEntered(row,column) | 当鼠标光标进入表格的单元格时，发射此信号 |
| cellPressed(row,column) | 当鼠标在表格的单元格上按下时，发射此信号 |



## qcss学习
> 有相当一部分语法和css相同
>  labelB.setObjectName("b") 表示 QLabel设置id=b选择器  labelB_1.setProperty("level", "1") 表示设置了属性level="1"

+ qcss

```css
QPushButton{
    background-color: #6496c8;
    border: none;
    color: #fff;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 9px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}

QLabel {
    border:2px solid blue; border-radius:10px

}

QLabel#b{
    border:2px solid red; border-radius:10px

}

QLabel#b[level="1"]{
    border:4px solid #0000CD; border-radius:10px
}

QLabel#b[level="2"]{
    border:4px solid #000000; border-radius:10px
}
```

+ 例子

```python
from PyQt5.Qt import *
import sys as sysUtils
import pathlib as pathLib

# 导入文件 qcss
class QSSLoader:
    def __init__(self):
        pass

    # 注解表示本方法是静态方法 不需要创建对象就可以调用 注意这个是高版本python语法
    @staticmethod
    def read_qss_file(qss_file_name):
        """从文件中读取qss的静态方法"""
        with open(qss_file_name, "r", encoding="UTF-8") as file:
            return file.read()


class MyWindow1(QWidget):

    def __init__(self, title):
        super().__init__()
        self.setWindowTitle(title)
        self.resize(500, 500)
        self.move(300, 300)
        self.setupUi()
        self.show()
        pass

    def setupUi(self):
        # 定义一个主容器
        parentQWidget = QWidget()
        parentQWidget.setParent(self)
        doubleX = 200
        doubleY = 200

        btnA = QPushButton(parentQWidget)
        btnA.setText("按钮")
        btnA.move(doubleX, doubleY)
        btnA.resize(50, 50)

        labelA = QLabel()
        labelA.setParent(parentQWidget)
        labelA.move(doubleX + 70, doubleY + 50)
        labelA.setText("标签A")
        labelA.resize(50, 50)

        labelB = QLabel()
        labelB.setParent(parentQWidget)
        labelB.move(doubleX + 70 + 50+20, doubleY + 50)
        # 设置 id选择器
        labelB.setObjectName("b")
        labelB.setText("标签B")
        labelB.resize(50, 50)

        labelB_1 = QLabel()
        labelB_1.setParent(parentQWidget)
        labelB_1.move(doubleX + 70, doubleY + 50 + 30 + 50)
        # 设置 id选择器
        labelB_1.setObjectName("b")
        # 设置属性
        labelB_1.setProperty("level", "1")
        labelB_1.setText("标签B1")
        labelB_1.resize(50, 50)

        labelB_2 = QLabel()
        labelB_2.setParent(parentQWidget)
        labelB_2.move(doubleX + 70 + 50+20, doubleY + 50 + 30 + 50)
        # 设置 id选择器
        labelB_2.setObjectName("b")
        # 设置属性
        labelB_2.setProperty("level", "2")
        labelB_2.setText("标签B2")
        labelB_2.resize(50, 50)

    pass


if __name__ == '__main__':
    dirCss = pathLib.Path(pathLib.Path.cwd().joinpath(*('resources', "d.qcss")))
    style_sheet = QSSLoader.read_qss_file(str(dirCss))
    app = QApplication(sysUtils.argv)

    myWindow = MyWindow1("qcss学习")
    # 注入 css 样式
    myWindow.setStyleSheet(style_sheet)
    print(style_sheet)

    sysUtils.exit(app.exec_())
```

## 信号 机制 简单学习

```python
from PyQt5 import QtCore
from PyQt5.Qt import *
import sys as sysUtils
import uuid as uuidUtils
import datetime as datetimeUtils
import random

# 简单 信号 机制 学习
class MyWindow(QWidget):

    def __init__(self, title):
        super().__init__()
        self.setWindowTitle(title)
        self.resize(500, 500)
        self.move(200, 200)
        self.setupUi()

        self.setupQObject1()
        self.setupQObject2()
        self.setupObject3()
        self.setupObject4()
        self.setupObject5()
        self.setupObject6()

        self.show()

        pass

    def setupUi(self):
        labelA = QLabel(self)
        labelA.resize(100, 100)
        labelA.setText("label")
        labelA.move(100, 100)
        labelA.setStyleSheet("font-weight: bold;background-color:gold;")
        pass

    # 简单设置一下name 看什么效果
    def setupQObject1(self):
        obj = QObject()
        str1 = str(datetimeUtils.datetime.now())

        print(obj.objectName(), str1)

        # 对象名称发生改变时发射此信号 connect 后面写触发后要调用的函数
        obj.objectNameChanged.connect(self.changeQObjectNameEvent)

        obj.setObjectName(str(uuidUtils.uuid3(uuidUtils.NAMESPACE_DNS, str1)))

        # 断开 信号与槽的连接
        obj.objectNameChanged.disconnect()

        obj.setObjectName(str(uuidUtils.uuid3(uuidUtils.NAMESPACE_DNS, str(random.randrange(100, 10000)))))
        pass

    # 连续改变 name 监听状态
    def setupQObject2(self):
        objX = QObject()
        # 使用匿名函数
        objX.objectNameChanged.connect(lambda e: print("setupQObject2 name 改变", e))
        # 连续设置 名称改变
        objX.setObjectName("x")
        objX.setObjectName("y")
        objX.setObjectName("z")
        pass

    # 阻断信号 之 disconnect
    def setupObject3(self):
        objX = QObject()
        # 使用匿名函数
        objX.objectNameChanged.connect(lambda e: print("setupQObject3 name 改变", e))
        objX.setObjectName("x")

        # 阻断连接
        # objX.objectNameChanged.disconnect()
        objX.setObjectName("y")
        pass

    # 阻断信号 之 blockSignals
    def setupObject4(self):
        objX = QObject()
        # 使用匿名函数
        objX.objectNameChanged.connect(lambda e: print("setupQObject4 name 改变", e))
        objX.setObjectName(str(random.randrange(100, 100000)))
        print("信号状态 False就表示没有被阻断,True表示阻断:", objX.signalsBlocked())
        # 注释下面的代码 本方法会打印两次
        objX.blockSignals(True)

        objX.setObjectName(str(random.randrange(100, 100000)))
        print("信号状态 False就表示没有被阻断,True表示阻断:", objX.signalsBlocked())
        pass

    # destroyed 信号 销毁事件
    def setupObject5(self):
        objX = QObject()
        objX.destroyed.connect(lambda e: print("setupObject5 对象被销毁 ", e))
        pass

    # 获取某个对象信号 到底有多少连接槽
    def setupObject6(self):
        objX = QObject()
        changeEd = objX.objectNameChanged
        changeEd.connect(lambda x: print("setupObject6 连接槽1:", x))
        changeEd.connect(lambda x: print("setupObject6 连接槽2:", x))
        changeEd.connect(lambda x: print("setupObject6 连接槽3:", x))

        print("setupObject6 连接槽数量:",objX.receivers(changeEd))
        pass

    def changeQObjectNameEvent(self, e):
        print("QObject Name 改变", e)


if __name__ == '__main__':
    app = QApplication(sysUtils.argv)
    myW = MyWindow("QObject 学习")

    sysUtils.exit(app.exec_())
    pass
```

