# 动态数据绑定（一）
## 任务目的
1. 了解 `getter` 和 `setter`
2. 了解 `new`

## 任务描述
请实现这样的一个 `Observer`，要求如下：

1. 传入参数只考虑对象，不考虑数组。
2. `new Observer`返回一个对象，其 `data` 属性要能够访问到传递进去的对象。
3. 通过 `data` 访问属性和设置属性的时候，均能打印出右侧对应的信息。

## 知识点
### Object.defineProperty
 当对象属性变化时，可以通过`Object.defineProperty`方法来监听属性变化，调用回调函数。

- `Object.defineProperty(obj, prop, descriptor)`
- `obj`:需要定义属性的对象。
- `prop`:需定义或修改的属性的名字。
- `descriptor`:将被定义或修改的属性的描述符。
### 访问器属性
对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 `getter-setter` 函数功能来描述的属性。描述符必须是两种形式之一；不能同时是两者。

数据描述符和存取描述符均具有以下可选键值：

- configurable

当且仅当该属性的 `configurable` 为 `true` 时，该属性描述符才能够被改变，也能够被删除。默认为 `false`。

- enumerable

当且仅当该属性的 `enumerable` 为 `true` 时，该属性才能够出现在对象的枚举属性中。默认为 `false`。

数据描述符同时具有以下可选键值：

- value
该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 `undefined`。
- writable
当且仅当该属性的 `writable` 为 `true` 时，该属性才能被赋值运算符改变。默认为 `false`。

存取描述符同时具有以下可选键值：

- get

一个给属性提供 `getter` 的方法，如果没有 `getter` 则为 `undefined`。该方法返回值被用作属性值。默认为 `undefined`。
- set

一个给属性提供 `setter` 的方法，如果没有 `setter` 则为 `undefined`。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 `undefined`。
## 效果

![](http://i.imgur.com/FEwdOoI.gif)
