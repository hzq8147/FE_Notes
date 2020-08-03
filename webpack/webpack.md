# webpack

**为什么需要构建工具**

```
·转换ES6语法  部分浏览器ES6的特性不支持
·转换JSX vue的指令   
·CSS前缀补全 预处理器 scss less （包含语法糖）·
·压缩混淆	隐藏代码逻辑 使代码逻辑不再明显 
·图片压缩
```
 
parcel rollup

**webpack优势**

JavaScript 更新迭代快 配置灵活 插件化扩展

**配置文件名称**

```
webpack.config.js
webpack --config 选择配置文件
```

**webpack 配置组成**

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gh4adom7jwj31bq0u04qp.jpg)

**常用的plugin 及功能**

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghcdzqllxjj310t0u0159.jpg)

**mode**

Mode用来指定当前的构建环境 production development none

设置mode可以使用webpack内置的参数 默认为production

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghceb1qud3j31vs0u0dwh.jpg)



