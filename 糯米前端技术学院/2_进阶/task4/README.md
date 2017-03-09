# 使用CSS实现折叠面板
## 任务目的
1. 深入理解html中radio的特性
2. 深入理解CSS选择器以及伪元素的使用

## 任务描述
1. 使用input的radio单选框特性结合CSS中的伪元素实现[bootstrap中折叠面板(点击查看样例)](http://v3.bootcss.com/javascript/#collapse-example-accordion)，要求样式一致。

## 知识点
1. 需要将`input`元素放在`label`元素之前，同时`input`元素类型设为`radio`
2. 折叠的内容区设置为`display:none;`
3. 使用`input[type="radio"]:checked + .content`实现点击``<label>``时，展开内容

## 效果
![](http://i.imgur.com/aAJuKpe.gif)
