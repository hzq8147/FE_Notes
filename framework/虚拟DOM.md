**虚拟dom**

创建真实DOM代价高昂 而创建虚拟Dom就像是创建一个普通的JS对象

手动操作DOM较为麻烦还需要考虑浏览器兼容性的问题。虚拟Dom的好处在于状态改变时不需要立即更新DOM，而是创建一个虚拟树来描述DOM，由虚拟DOM内部来弄清楚如何有效（diff)更新DOM

MVVM框架用于简化DOM的复杂操作，解决了视图和状态同步的问题。

参考github上的virtual-dom描述：
	
* 虚拟Dom可以维护程序的状态跟踪上一次状态
* 通过比较前后两次状态的差异更新真实DOM

```
{
	sel: "div",
	data: {},
	children: undefined,
	text: "Virtual DOM",
	elm: undefined,
	key: undefined,
}
```
虚拟DOM的作用：

* 维护视图和状态的关系

* **复杂视图**下提升渲染性能

通过虚拟DOM 实现 SSR（服务端渲染Nuxt.js/Next.js) 原生应用（Weex/React Native) 小程序(mpvue/uni-app)

Virtual DOM 库

* Snabbdom   --TypeScript  

* virtual-dom