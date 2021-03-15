### 使用场景

1.你调用一个别人写的函数，但是很不幸，这个家伙没有留下任何注释...，为了搞清参数和输出的函数类型，只能去看逻辑。

2.为了保证代码的健壮性，对一个函数的输入参数进行各种假设。TS在编译阶段就可以对变量进行静态类型检查。

### TypeScript 包含内容

**类型检查** 在编码阶段发现类型问题

**语言扩展** 包含ES6的特性 异步操作和装饰器 接口和抽象类

**工具属性** 可以编译为js 与普通js兼容性相同

### 其他好处

1. ide根据接口定义具有一系列强大的自动补全、导航功能，使接口定义可以代替文档，并提升开发效率。

2. 考虑类型思维通过设计接口类型，从代码编写者向代码设计者转变

### 动态类型与静态类型

静态类型语言在编译时确定变量类型。

动态类型语言在执行阶段确定变量类型。

![](https://tva1.sinaimg.cn/large/008eGmZEly1gnro2ptlqcj31660j47ew.jpg)

![](https://tva1.sinaimg.cn/large/008eGmZEly1gnro22z2xjj30qa07q79f.jpg)

### 数据类型

![](https://tva1.sinaimg.cn/large/008eGmZEgy1godpb7wdx6j311g0nmacd.jpg)

### 类型注解 

### 元组

```javascript
// 元组
let tuple: [number, string] = [0, '1']
// tuple.push(2)
// console.log(tuple)
// tuple[2] 	无法访问
```

为函数的参数类型加注解，函数的返回类型通常可以忽略。因为ts有返回类型推断。

不建议使用any，都用any就不必用ts了

undefined在js中没有保留字，可以被使用。

### 特殊类型

```javascript
// void 
let noReturn = () => {}

// any
let x
x = 1
x = []
x = () => {}

// never
let error = () => {
    throw new Error('error')
}
let endless = () => {
    while(true) {}
}
```

### 枚举类型

![](https://tva1.sinaimg.cn/large/008eGmZEly1gog2k4j4cfj30ly0beq7u.jpg)

枚举：一组有名字的常量集合

实现原理： 反向映射

```typescript
// 数字枚举
enum Role {
    Reporter = 1,
    Developer,
    Maintainer,
    Owner,
    Guest
}

var Role;
(function (Role) {
    Role[Role["Reporter"] = 1] = "Reporter";
    Role[Role["Developer"] = 2] = "Developer";
    Role[Role["Maintainer"] = 3] = "Maintainer";
    Role[Role["Owner"] = 4] = "Owner";
    Role[Role["Guest"] = 5] = "Guest";
})(Role || (Role = {}));

```

枚举成员的值是只读类型，不能被修改

```
// 枚举成员
// Role.Reporter = 0
enum Char {
    // const member
    a,
    b = Char.a,
    c = 1 + 3,//常量枚举 编译时计算
    // computed member 计算枚举在程序执行阶段才计算
    d = Math.random(),
    e = '123'.length,
    f = 4
}

```

### 常量枚举

```
// 常量枚举 编译后回消失
const enum Month {
    Jan,
    Feb,
    Mar,
    Apr = Month.Mar + 1,
    // May = () => 5
}
let month = [Month.Jan, Month.Feb, Month.Mar]
```

### 枚举类型

类型不同，不可比较。

```
// 枚举类型
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }

let e: E = 3
let f: F = 3
// console.log(e === f) 

let e1: E.a = 3
let e2: E.b = 3
let e3: E.a = 3
// console.log(e1 === e2) 
// console.log(e1 === e3)

let g1: G = G.a
let g2: G.a = G.a
```
