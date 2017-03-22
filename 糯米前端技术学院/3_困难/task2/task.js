var fragment ,
currentNodeList = [],data;

function compile(selector,obj) {
  var node = document.getElementById(selector);
   fragment = document.createDocumentFragment();
  var parentNode = node.parentNode;
  data = obj;
  currentNodeList.push(fragment);
  compileNode(parentNode);

  node.parentNode.replaceChild(fragment,node);

}
//元素节点
function compileElement(node) {
  var newNode = document.createElement(node.tagName);

  // 处理节点属性
  if (node.hasAttributes()) {
      let attrs = node.attributes;
      Array.from(attrs).forEach((attr) => {
          newNode.setAttribute(attr.name, attr.value);
      });
  }


    var currentNode = currentNodeList[currentNodeList.length - 1].appendChild(newNode);

    //判断节点是否还有子节点，如果有，则递归
  if (node.hasChildNodes()) {
      currentNodeList.push(currentNode);
      Array.from(node.childNodes).forEach(function (childNode) {
        compileNode(childNode);
      });
  }
//弹出fragment
  currentNodeList.pop();
}
//文本结点
function compileText(node) {
  var nodeValue = node.nodeValue;

  if (nodeValue === '') return;

  var patt = /\{{[\w.]+\}}/g;
  //获取{{user.name}}和{{user.age}}
  var ret = nodeValue.match(patt);

  if (!ret) return;
  ret.forEach(function (value) {
    //去掉{}
    var property = value.replace(/[{}]/g, '');
    var pro = property.split('.');
    nodeValue = nodeValue.replace(value, data[pro[0]][pro[1]]);
  })


  currentNodeList[currentNodeList.length - 1].appendChild(document.createTextNode(nodeValue));
}
//判断node属性
function compileNode(node) {
  switch (node.nodeType) {
      // text
      case 1:
          compileElement(node);
          break;
      // node
      case 3 :
          compileText(node);
          break;
      default:
          return;
  }
}
