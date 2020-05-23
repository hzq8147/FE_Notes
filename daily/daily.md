## 记点零零散散乱七八糟的

### 2020-05-24

**addEventListener()的第三个参数**

DOM方法 addEventListener() 和 removeEventListener()是用来分配和删除事件的函数。 这两个方法都需要三个参数，分别为：

事件名称（String）、要触发的事件处理函数(Function)、**指定事件处理函数的时期或阶段(boolean)**。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gf2vh6sfomj30a7070aao.jpg)

由图可知捕获过程要先于冒泡过程

当第三个参数设置为true就在捕获过程中执行，反之就在冒泡过程中执行处理函数。