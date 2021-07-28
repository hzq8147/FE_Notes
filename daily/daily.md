## 记点零零散散乱七八糟的

### 2020-05-24

**addEventListener()的第三个参数**

DOM方法 addEventListener() 和 removeEventListener()是用来分配和删除事件的函数。 这两个方法都需要三个参数，分别为：

事件名称（String）、要触发的事件处理函数(Function)、**指定事件处理函数的时期或阶段(boolean)**。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gf2vh6sfomj30a7070aao.jpg)

由图可知捕获过程要先于冒泡过程

当第三个参数设置为true就在捕获过程中执行，反之就在冒泡过程中执行处理函数。

### 2020-07-03

* [**ES6模块与CommonJS 模块的差异** ](https://es6.ruanyifeng.com/#docs/module) (阮一峰)

* 源码中未使用`export default`导出默认输出时 ，不能直接使用`import obj from '**'` 要使用{}解构进行导入

### 2020-08-03

import 引用进来的资源是个number  ---> assetsId

### 2020-03-25

### defer 和 async 傻傻分不清楚？

Q:有两个 script 元素，一个从 CDN 加载 lodash，另一个从本地加载 script.js，假设总是本地脚本下载更快，那么以下 plain.html、async.html 和 defer.html 分别输出什么？

```javascript
// script.js
try {
    console.log(_.VERSION);
} catch (error) {
    console.log('Lodash Not Available');
}
console.log(document.body ? 'YES' : 'NO');
```

```html

// A. plain.html
<head>
	<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
    <script src="script.js"></script>
</head>
 
// B. async.html
<head>
	<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js" async></script>
    <script src="script.js" async></script>
</head>
 
// C. defer.html
<head>
	<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js" defer></script>
    <script src="script.js" defer></script>
</head>

```

也就是说 script.js 在执行时，lodash 已下载并执行完毕，但 document.body 尚未加载。

在 defer 和 async 属性诞生之前，最初浏览器加载脚本是采用同步模型的。浏览器解析器在自上而下解析 HTML 标签，遇到 script 标签时会暂停对文档其它标签的解析而读取 script 标签。此时：

如果 script 标签无 src 属性，为内联脚本，解析器会直接读取标签的 textContent，由 JS 解释器执行 JS 代码
如果 script 有 src 属性，则从 src 指定的 URI 发起网络请求下载脚本，然后由 JS 解释器执行
无论哪种情况，都会阻塞浏览器的解析器，刚刚说到浏览器是自上而下解析 HTML Markup 的，所以这个阻塞的特性就决定了，script 标签中的脚本执行时，位于该 script 标签以上的 DOM 元素是可用的，位于其以下的 DOM 元素不可用。

如果我们的脚本的执行需要操作前面的 DOM 元素，并且后面的 DOM 元素的加载和渲染依赖该脚本的执行结果，这样的阻塞是有意义的。但如果情况相反，那么脚本的执行只会拖慢页面的渲染。

正因如此，2006 年的《Yahoo 网站优化建议》中有一个著名的规则

```
把脚本放在 body 底部
```

但现代浏览器早已支持给 `<script>` 标签加上 defer 或 async 属性，二者的共同点是都不会阻塞 HTML 解析器。

当文档只有一个 script 标签时，defer 与 async 并没有显著差异。但当有多个 script 标签时，二者表现不同：

async 脚本每个都会在下载完成后立即执行，无关 script 标签出现的顺序
defer 脚本会根据 script 标签顺序先后执行
所以以上问题中，后两种情况分别输出：

```
// B. async.html
Lodash Not Available
YES
 
// C. defer.html
4.17.10
YES

```

因为 async.html 中 script.js 体积更小下载更快，所以执行时间也比从 CDN 加载的 lodash 更早，所以 _.VERSION 上不可用，输出 Lodash Not Available；而 defer.html 中的 script.js 下载完毕后并不立即执行，而是在 lodash 下载和执行之后才执行

###2021-04-10

z-index 只会在absolute relative 和fixed中生效。

如果父元素没有position（即使有zindex也不生效），那么子组件(position:fixed)会按照自己的z-index和外面的元素（与父组件同级的有zindex和fixed的元素）比较zindex。

如果父元素有position:fixed，会优先采用父组件的zindex和外面比较，如果小了，即便子元素zindex大也会被覆盖。

```
<div class="parent1">
	<div class="child1"></div>
</div>
<div class="parent2">
</div>
```

###2021-05-21

####AST

抽象语法树

一个FunctionDeclaration(函数定义)对象。

用力拆开，它成了三块：

1. 一个id，就是它的名字，即add

2. 两个params，就是它的参数，即[a, b]

3. 一块body，也就是大括号内的一堆东西

####postCss

工作中用到的框架 css 处理有以下问题，需要用 postcss 做些自动处理。

同名 class 后者会覆盖前者：`.a{color: #fff} .a{background: #fff}`，后者生效

最多嵌套两层：`.a .b .c {}`不生效

从其名字 postcss 可以看出早期是被当做后处理器的。也就是处理less/sass 编译后的 css。最常用的插件就是 autoprefixer，根据浏览器版本添加兼容前缀。

![](https://tva1.sinaimg.cn/large/008i3skNly1gqq0gvz4xpj30fs06djra.jpg)

工作流程

![](https://tva1.sinaimg.cn/large/008i3skNly1gqq3gxzjqgj30ej0aqmxa.jpg)

大致步骤：

1. 将 CSS 字符串生成 Tokens

2. 将 Tokens 通过规则生成 AST 树

3. 将 AST 树传给插件进行处理

4. 将处理后的 AST 树生成新的css资源（包括css字符串、sourceMap等）

###2021-07-26

####Vue2.0和3.0的数据劫持

在2.0的时候使用的是Object.defineproperty()做的数据劫持, 不过Object.defineproperty是对所有的属性做的数据劫持不是目标对象，而且对数组是无法进行劫持的，也就是数组的变化监听实际上是，在原有的数组方法上进行的改造实现的；

但是3.0不一样，是使用proxy代理模式进行的数据劫持监听，proxy有个好的地方就是可以监听整个Object对象，不用单独去监听单个对象属性就可以检测到数据的变化，比之前的单个属性监听减少了性能上的开销，还有就是可以监听数组，只不过穿的参数是一个数组但是返回的却是对象形式;

###2021-07-28

v-for 和v-if 哪个先执行？ v-for优先级更高，v-if会在每个item上都执行一次，会有warning，结果是正常的。可以使用computed + filter来实现过滤效果。

