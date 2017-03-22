# 动态数据绑定（四）
## 任务目的
熟练使用原生 JS对操作 DOM 结构
## 任务描述
这是“动态数据绑定”的第四题。有了前面的充分准备，相信你能搞定这一题。请实现如下的这样一个 Vue，传入参数是一个 Selector 和一个数据对象，程序需要将 HTML 模板片段渲染成正确的模样。 这就是一次性的静态数据绑定。
```
let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    }
  }
});
```
```
<!-- 页面中原本的 html 模板片段 -->
<div id="app">
    <p>姓名：{{user.name}}</p>
    <p>年龄：{{user.age}}</p>
</div>
<!-- 最终在页面中渲染出来的结果 -->
<div id="app">
    <p>姓名：youngwind</p>
    <p>年龄：25</p>
</div>
```
此题尚未要求实现动态数据绑定
## 知识点
### document.createDocumentFragment()
`document.createDocumentFragment()`创造出的fragment，在文档中没有对应的标记，可以包含和控制节点。
### 思路
从所给选择器的元素开始，创造出相同的结构及元素，但是只在`{{user.name}}`中使用正则表达式更改，然后将这些赋给fragement，最后替代原有的dom结构即可。

要注意开始创造dom结构时，判断每个节点的类型，元素节点需要检查其属性及其子节点，子节点需要判断并递归调用。文本节点需判断其中是否有所要更改格式。
