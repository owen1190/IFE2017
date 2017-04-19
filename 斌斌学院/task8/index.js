var button1 = document.getElementsByTagName('button')[0];
var button2 = document.getElementsByTagName('button')[1];
var button3 = document.getElementsByTagName('button')[2];
var button4 = document.getElementsByTagName('button')[3];
var container = document.getElementsByClassName('container')[0];
var input = document.getElementsByTagName('input')[0];
var text ;//待查找文本
var mode=1;//处于遍历模式还是搜索模式,1->遍历，0->搜索
// result作用是存储搜索到节点，最后用于显示
var list = [],result=[];
var bfindex; //树的深度
// 深度遍历
button1.addEventListener('click', function () {
  reset();
  df(container);  
  changeColor();
}, false);
// 广度遍历
button2.addEventListener('click', function () {
  reset();
  bf(container);  
  changeColor();
}, false);
//深度搜索
button3.addEventListener('click', function () {
  reset();
  mode=0;
  text=input.value;
  df(container);  
  changeColor();
}, false);
//广度搜索
button4.addEventListener('click', function () {  
  reset();
  mode=0;
  text=input.value;
  bf(container);  
  changeColor();
}, false);


//颜色变化
function changeColor() {
  var i = 0;
  list[i].style.backgroundColor = 'blue';
  timer = setInterval(function () {
    i++;
    if (i < list.length) {
      list[i - 1].style.backgroundColor = '#fff';
      //因为此时nodeValu值含有空格，所以需要更改nodeValue，
      if (mode == 0 && list[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == text ) {
        list[i].style.backgroundColor = 'red';
        result.push(i);       
      } else {

        list[i].style.backgroundColor = 'blue';
      }
    } else {
      clearInterval(timer);
      list[list.length - 1].style.backgroundColor = "#fff";
      result.forEach(function (e) {
        list[e].style.backgroundColor = 'red';
      })
    }
  }, 500)
}

//重置
function reset() {
  list = [];
  result=[];
  mode=1;
  bfindex=0;
  var div = document.getElementsByTagName('div');
  for (var index = 0; index < div.length; index++) {
    div[index].style.backgroundColor = '#fff';

  }
}
//深度优先遍历
function df(node) {
  if (!node || node.length == 1) return;
  list.push(node);
  for (var index = 0; index < node.children.length; index++) {
    df(node.children[index]);
  }
}
//广度
function bf(node) {

  if (node) {
    list.push(node);
    bf(node.nextElementSibling);
    node = list[bfindex++];
    bf(node.firstElementChild);
  }
}