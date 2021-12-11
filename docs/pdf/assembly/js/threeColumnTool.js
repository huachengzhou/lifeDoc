/**
 * 用于拼接html字段
 * @param name
 * @param attribute
 * @param text
 * @constructor
 */
function ThreeObj(name, attribute, text) {
    this.name = name;
    this.attribute = attribute;
    this.text = text;
}

ThreeObj.prototype = {
    constructor: ThreeObj,  //每个函数都有prototype属性，指向该函数原型对象，原型对象都有constructor属性，这是一个指向prototype属性所在函数的指针
    toString: function () {
        var arr = [];
        arr.push("<");
        arr.push(this.name);
        var keys = Object.keys(this.attribute);
        var len = keys.length;
        if (len >= 1) {
            for (var i = 0; i < len; i++) {
                var obj = this.attribute[keys[i]];
                if (obj) {
                    arr.push(" ");
                    arr.push(keys[i]);
                    arr.push("=");
                    arr.push("'");
                    arr.push(obj);
                    arr.push("'");
                }
            }
        }
        arr.push(">");
        arr.push(this.text);
        arr.push("<");
        arr.push("/");
        arr.push(this.name);
        arr.push(">");
        return arr.join("");
    },
    setName: function (name) {
        this.name = name;
        return this;
    },
    setText: function (text) {
        this.text = text;
        return this;
    },
    setAttribute: function (attribute) {
        this.attribute = attribute;
        return this;
    }
};

var threeColumn = {};

threeColumn.target = $("#threeColumnDemo");

threeColumn.handleEvent = function (key, _this) {
    switch (key) {
        case "Java.core": {
            var html = "";
            var tree = new ThreeObj("h2", {"class": "article-title"}, "Java 简介");
            html += tree.toString();
            tree.setName("p").setAttribute({}).setText("Java是由Sun Microsystems公司于1995年5月推出的Java面向对象程序设计语言和Java平台的总称。由James Gosling和同事们共同研发，并在1995年正式推出。");
            html += tree.toString();
            tree.setName("h2").setAttribute({}).setText("Java分为三个体系：");
            html += tree.toString();
            var tempA = "";
            tree.setName("li").setAttribute({}).setText("JavaSE（J2SE）（Java2 Platform Standard Edition，java平台标准版）");
            tempA += tree.toString();
            tree.setName("li").setAttribute({}).setText("JavaEE(J2EE)(Java 2 Platform,Enterprise Edition，java平台企业版)");
            tempA += tree.toString();
            tree.setName("li").setAttribute({}).setText("JavaME(J2ME)(Java 2 Platform Micro Edition，java平台微型版)。");
            tempA += tree.toString();
            tree.setName("ul").setAttribute({}).setText(tempA);
            html += tree.toString();
            tree.setName("h2").setAttribute({}).setText("主要特性：");
            html += tree.toString();
            var tempB = "";
            tree.setName("li").setAttribute({}).setText("Java语言是简单的：" + "<P>Java语言的语法与C语言和C++语言很接近，使得大多数程序员很容易学习和使用。另一方面，Java丢弃了C++中很少使用的、很难理解的、令人迷惑的那些特性，如操作符重载、多继承、自动的强制类型转换。特别地，Java语言不使用指针，而是引用。并提供了自动的废料收集，使得程序员不必为内存管理而担忧。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java语言是面向对象的：" + "<P>Java语言提供类、接口和继承等面向对象的特性，为了简单起见，只支持类之间的单继承，但支持接口之间的多继承，并支持类与接口之间的实现机制（关键字为implements）。Java语言全面支持动态绑定，而C++语言只对虚函数使用动态绑定。总之，Java语言是一个纯的面向对象程序设计语言。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java语言是分布式的：" + "<P>Java语言支持Internet应用的开发，在基本的Java应用编程接口中有一个网络应用编程接口（java net），它提供了用于网络应用编程的类库，包括URL、URLConnection、Socket、ServerSocket等。Java的RMI（远程方法激活）机制也是开发分布式应用的重要手段。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java语言是健壮的：" + "<P>Java的强类型机制、异常处理、垃圾的自动收集等是Java程序健壮性的重要保证。对指针的丢弃是Java的明智选择。Java的安全检查机制使得Java更具健壮性。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java语言是安全的：" + "<P>Java通常被用在网络环境中，为此，Java提供了一个安全机制以防恶意代码的攻击。除了Java语言具有的许多安全特性以外，Java对通过网络下载的类具有一个安全防范机制（类ClassLoader），如分配不同的名字空间以防替代本地的同名类、字节代码检查，并提供安全管理机制（类SecurityManager）让Java应用设置安全哨兵。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java语言是体系结构中立的：" + "<P>Java程序（后缀为java的文件）在Java平台上被编译为体系结构中立的字节码格式（后缀为class的文件），然后可以在实现这个Java平台的任何系统中运行。这种途径适合于异构的网络环境和软件的分发。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java语言是可移植的：" + "<P>这种可移植性来源于体系结构中立性，另外，Java还严格规定了各个基本数据类型的长度。Java系统本身也具有很强的可移植性，Java编译器是用Java实现的，Java的运行环境是用ANSI C实现的。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java语言是解释型的：" + "<P>如前所述，Java程序在Java平台上被编译为字节码格式，然后可以在实现这个Java平台的任何系统中运行。在运行时，Java平台中的Java解释器对这些字节码进行解释执行，执行过程中需要的类在联接阶段被载入到运行环境中。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java是高性能的：" + "<P>与那些解释型的高级脚本语言相比，Java的确是高性能的。事实上，Java的运行速度随着JIT(Just-In-Time）编译器技术的发展越来越接近于C++。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java语言是多线程的：" + "<P>在Java语言中，线程是一种特殊的对象，它必须由Thread类或其子（孙）类来创建。通常有两种方法来创建线程：其一，使用型构为Thread(Runnable)的构造子类将一个实现了Runnable接口的对象包装成一个线程，其二，从Thread类派生出子类并重写run方法，使用该子类创建的对象即为线程。值得注意的是Thread类已经实现了Runnable接口，因此，任何一个线程均有它的run方法，而run方法中包含了线程所要运行的代码。线程的活动由一组方法来控制。Java语言支持多个线程的同时执行，并提供多线程之间的同步机制（关键字为synchronized）。</p>");
            tempB += tree.toString();
            tree.setName("li").setAttribute({}).setText("Java语言是动态的：" + "<P>Java语言的设计目标之一是适应于动态变化的环境。Java程序需要的类能够动态地被载入到运行环境，也可以通过网络来载入所需要的类。这也有利于软件的升级。另外，Java中的类有一个运行时刻的表示，能进行运行时刻的类型检查。</p>");
            tempB += tree.toString();
            tree.setName("ul").setAttribute({}).setText(tempB);
            html += tree.toString();
            //end
            tree.setName("article").setAttribute({}).setText(html);
            html = tree.toString();
            threeColumn.target.empty().append(html);
            break;
        }
        case "Java.obj": {
            var html = "";
            var tree = new ThreeObj("h2", {"class": "article-title"}, "面向对象");
            html += tree.toString();
            //end
            tree.setName("article").setAttribute({}).setText(html);
            html = tree.toString();
            threeColumn.target.empty().append(html);
            break;
        }
        case "technology.stack": {
            var html = "";
            var tree = new ThreeObj("h2", {"class": "article-title"}, "技术栈");
            html += tree.toString();

            var tempA = "";
            tree.setName("li").setAttribute({}).setText("<P> 入门就是熟悉各种框架，进阶就是能根据问题场景选择使用什么技术，高阶就是内功的修炼了，核心就是是网络、安全和存储</p>");
            tempA += tree.toString();
            tree.setName("ul").setAttribute({}).setText(tempA);
            html += tree.toString();

            var tempE1 = "";
            tree.setName("li").setAttribute({}).setText("<P> 进程线程+配置+数据库+网络->各种新名词</p>");
            tempE1 += tree.toString();
            tree.setName("ul").setAttribute({}).setText(tempE1);
            html += tree.toString();


            var tempB = "";
            tree.setName("li").setAttribute({}).setText("<P> 入门就是熟悉各种框架 （因为刚入门的你还没有遇上什么难题，难题都是dalao们扛下来的，你只能多学点框架，但是不知道他们将会用在哪些场景，太细节的坑也没遇到过）</p>");
            tempB += tree.toString();
            tree.setName("ul").setAttribute({}).setText(tempB);
            html += tree.toString();

            var tempC = "";
            tree.setName("li").setAttribute({}).setText("<P>  进阶就是能根据问题场景选择使用什么技术 （你可能已经完成了一个或多个项目，能够独立处理项目中遇到的很多大小坑，甚至你这时候已经是团队的项目经理，遇到问题老板第一个会追责你，你不得不努力解决遇到的坑，下次见到这个坑时，你就知道用什么方法解决了）</p>");
            tempC += tree.toString();
            tree.setName("ul").setAttribute({}).setText(tempC);
            html += tree.toString();

            var tempD = "";
            tree.setName("li").setAttribute({}).setText("<P>  高阶就是内功的修炼了，核心就是是网络、安全和存储。 （你早已经坐稳团队的leader位置，自己的项目经历过无数的恶劣的场景，也加班熬夜解决了团队各种棘手的问题，但你并不非常高兴，因为遇到的坑多了，就想深入仔细研究一下这些坑到底是什么，你决定往深入了研究，你终于明白不同系统的网络之间怎么连接才最稳定，系统怎么设计才安全，自己的存储系统的IO为什么老是突然飙高。）</p>");
            tempD += tree.toString();
            tree.setName("ul").setAttribute({}).setText(tempD);
            html += tree.toString();

            //end
            tree.setName("article").setAttribute({}).setText(html);
            html = tree.toString();
            threeColumn.target.empty().append(html);
            break;
        }
        case "Java.structure": {
            threeColumn.target.empty().append(threeColumn.handleEvent.print(
                [new ThreeObj("h2", {"class": "article-title"}, "程序结构"),
                    new ThreeObj("ul", {}, new ThreeObj("li", {"class": "article-title"}, "<P> Java是区分大小写的</p>").toString())
                ]
            ));
            break;
        }
        default:
            break;
    }
};


threeColumn.handleEvent.print = function (arr) {
    var text = "";
    if ($.isArray(arr)) {
        $.each(arr, function (k, obj) {
            text += obj.toString();
        });
    }
    return text;
};
