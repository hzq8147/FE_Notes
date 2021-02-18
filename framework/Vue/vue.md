### 组件更新

1. Vue框架对数组的push、pop、shift、unshift、sort、splice、reverse方法进行了改造，在调用数组的这些方法时，Vue会Notify Watcher并更新视图。
2. 如果的确想要利用索引直接设置数组的值可以使用Vue.set()方法，具体在
[这里](https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
可以了解。
3. 

```
data() {
return {
name,
info:{
	a
}//对象内的key要写出来才能支持响应式更新
}
```
4.
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gme2e26bcwj30wa0j6q4k.jpg)