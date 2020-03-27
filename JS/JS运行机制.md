**原文：**[「硬核JS」一次搞懂JS运行机制](https://juejin.im/post/5e22b391f265da3e204d8c14#heading-24)

----

###进程线程

**进程** Cpu资源分配最小单位 

**线程** CPU调度的最小单位，线程是程序中的一个执行流，一个进程中可以有多个线程。 程序执行的最小单位

**单线程** 一个进程中只有一个执行流

**多线程** 一个进程有多个执行流。单个程序创建多个并行执行的线程完成各自的任务。

###JS为什么是单线程

JavaScript主要用于是与用户互动和操作DOM。以防止复杂的同步问题。比如一个线程操作DOM添加内容，另一个线程删除这个节点，给浏览器带来渲染问题

###浏览器

**浏览器主进程**只有一个 负责界面显示页面管理网络资源的管理和下载

**第三方插件进程**

**GPU进程**

**渲染进程** 负责页面渲染，脚本执行，事件处理

浏览器多进程 防止一个页面崩溃影响整个浏览器

###渲染进程

renderer进程 内部是多线程

**GUI渲染线程** 负责渲染浏览器页面 解析HTML CSS，构建DOM树和RenderObject树，页面布局和绘制等

修改一些元素的颜色和背景色 会触发**重绘(Repaint)**

修改元素的尺寸会触发**回流（Reflow)**

当需要重绘和回流时GUI线程执行 绘制页面

**GUI渲染线程和JS引擎线程是互斥的**，JS引擎执行时GUI线程会被挂起，GUI更新会保存在队列里，等到JS引擎空闲时执行（JS执行时间过长导致页面渲染不流畅）


> 例如浏览器渲染的时候遇到script标签，就会停止GUI的渲染，然后js引擎线程开始工作，执行里面的js代码，等js执行完毕，js引擎线程停止工作，GUI继续渲染下面的内容。

**JS引擎线程** 浏览器同时只有一个JS引擎线程在运行JS程序，js是单线程运行的。一个Tab页面（renderer进程）中无论什么时候都只有一个JS线程在运行JS程序

**事件触发线程** 控制时间循环，属于浏览器，并且管理这一个任务队列。js遇到事件绑定和一些异步操作（setTimeout,ajax异步请求)会走事件触发线程，异步事件有结果之后，将回调操作添加到任务队列，等待JS引擎空闲时处理。

**定时器触发线程** setTImeout setInterval 所在线程 触发计时并触发定时，然后添加到事件触发线程的任务队列中。等待JS引擎空闲后执行

>W3C在HTML标准中规定，规定要求setTimeout中低于4ms的时间间隔算为4ms

**异步http请求线程** XMLHttpRequest在连接后通过浏览器新开的线程请求。当执行http异步请求时，把异步请求事件添加到异步请求线程，等到http状态变化后，再把回调函数添加到任务队列，等待js引擎线程来执行。

###事件循环

主线程-> 执行栈

事件触发线程-> 任务队列 (task quene)  异步任务一旦有了结果，就在任务队列中存放事件回调。

一旦**执行栈**中所有同步的任务执行完毕，js引擎线程空闲，开始读取**任务队列**，将事件回调添加到执行栈中，开始执行

执行栈顺序执行->同步继续执行->异步交由异步线程处理->事件回调放入任务队列->同步继续执行->执行栈空->询问任务队列是否存在事件回调->有回调放入执行栈末尾继续执行->没有则不停询问任务队列

###宏任务 微任务

**宏任务**每次执行栈执行的代码当做是一个宏任务，每个宏任务会从头到尾执行完毕。

常见宏任务： 

* 主代码块
* setTimeout
* setInterval
* setImmediate() -Node
* requestAnimationFrame ()-浏览器

**微任务**在当前宏任务完成之后立刻执行的任务。

ES6引入Promise标准

常见的微任务：

* process.nextTick()-Node
* Promise().then()
* catch
* finally
* Object.observe
* MutationObserver 

>宏任务 -> 微任务 -> GUI渲染 -> 宏任务 ->...

**宏任务和微任务不在一个任务队列**

>setTimeout 是宏任务，时间回调在宏任务队列。
>Promise.then()是一个微任务，事件回调在微任务队列

new Promise实例化中所执行的代码是同步执行的，只有then中注册的回调才是异步执行。

![](https://user-gold-cdn.xitu.io/2020/1/18/16fb7adf5afc036d?imageslim)

**async/await**本质上还是Promise的一些封装，await 关键字效果与Promise.then效果类似

记两道练习题

1、

```
setTimeout(() => console.log(4))

async function test() {
  console.log(1)
  await Promise.resolve()
  console.log(3)
}

async function test1(){
    console.log(4);
    await test();
    console.log(5);
}
test1();
console.log(2);
```
4 1 2 3 5 4

2、

```
function test() {
  console.log(1)
  setTimeout(function () { 	// timer1
    console.log(2)
  }, 1000)
}

test();

setTimeout(function () { 		// timer2
  console.log(3)
})
new Promise(function (resolve) {
  console.log(4)
  setTimeout(function () { 	// timer3
    console.log(5)
  }, 100)
  resolve()
}).then(function () {
  setTimeout(function () { 	// timer4
    console.log(6)
  }, 0)
  console.log(7)
})
console.log(8)
```
1 4 8 7  3 6 5 2

###NodeJs运行机制

在Node环境下，process.nextTick的优先级高于Promise。可以简单理解为在宏任务结束后会先执行微任务队列中的nextTickQueue部分，然后才会执行微任务中的Promise部分。

针对浏览器的EventLoop

```
先执行一个 MacroTask，然后执行所有的 MicroTask

再执行一个 MacroTask，然后执行所有的 MicroTask

……

如此反复，无穷无尽……
```