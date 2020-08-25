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


**解析ES6**

使用babel-loader 解析js的ES6语法   要.babelrc配置文件

```
{
	"presets":[
		"@babel/preset-env"\
	],
	"plugins":[
		"@babel/proposal-class-properties"
	]
}
```

**解析CSS**

css-loader 用于加载.css 文件 并将其转化成commonjs对象

style-loader 将样式通过\<style>标签插入到head中

loader的解析顺序是从下往上，从右往左，需要先用css-loader编译css代码再使用style-loader插入到网页中去，所以顺序必须是是style-loader 在前，css-loader在后面。保证css-loader先编译执行。

```
module:{
        rules:[           {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    }
```

**资源解析:解析图片、 字体**

使用file-loader

url-loader 也可以处理图片和字体 可以设置较小资源 自动base64

```
module:{
	rules:[{
		test:/\.png/,
		use:[
			{
				loader: 'url-loader',
				options:{
					limits:10240
				}
			}
		]
	}]
}
```

**webpack文件监听**

webpack --watch 

缺陷： 浏览器不会随着刷新

**webpack-dev-server 实现热更新**

WDS不刷新浏览器

WDS不输出文件 存在内存中

使用HotModuleReplacementPlugin插件

```
webpack-dev-server --open //--open代表打开浏览器
```

**webpack-dev-middleware传输给服务器**

```
const express = require('express');
cosnt webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,{
	publicPath:config.output.publicPath
}));

app.listen(3000,function(){
console.log('Example app listening on port 3000');
});
```

**webpack 热更新原理**

Webpack Compile: 将JS编译成bundle

HMR Server : 将热更新文件输出给HMR Runtime

Bundle Server : 提供文件在浏览器访问

HMR Runtime ： 会被注入到了浏览器 更新文件的变化

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghoyfxlxfkj31y10u0wz8.jpg)

开始通过Webpack Compiler将Js编译，并交给BundleServer 浏览器通过BundleServer获取js包(A & B)

文件系统 有变化之后，再通过Compiler编译 发送给HMR server ，HMR server知道哪些源代码和模块发生了变化，HMR server（服务端）通知HMR runtime（客户端）哪些文件发生变化（通过JSON进行传输。RUNTIME就会更新代码不需要刷新浏览器。

**文件指纹**

打包输出的文件名的后缀 方便版本管理

Hash： 和整个项目的构建有关 只要有文件有修改，整个构建的Hash都会发生修改

Chunkhash： 和webpack打包的chunk有关不同的entry会生成不同的chunkhash (JS文件 )

contenthash： 根据文件的内容来定义hash 文件内容不变 contenthash不变 （CSS文件)

Css文件如果使用chunkhash 虽然css文件没变但是js变化了 还是需要重新build  因为css文件被变成JS对象放入head头部

file-loader css-loader ……都是可以通过options: { name: }

只能在生产环境才能使用 热更新plugin要被禁用

MiniCssExtractPlugin 以文件方式提取css到dist 与style-loader 冲突 替换为MiniCSSExtractPlugin.loader

**代码压缩**




