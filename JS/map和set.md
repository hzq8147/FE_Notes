## map()

#### 定义

Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

#### 方法

```javascript
clear 清楚所有元素
delete 删除某个元素
forEach((value,key,mapObj)=>{
})
get 返回指定元素
has判断是否包含 返回boolean
set添加一个元素到映射
```

## Set()

定义

Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，**没有重复的key。**

方法 

```javascript
add添加元素
delete 删除元素
```

与map基本类似
