var button1 = document.getElementsByTagName('button')[0];
var button2 = document.getElementsByTagName('button')[1];
var button3 = document.getElementsByTagName('button')[2];
var container = document.getElementsByClassName('container')[0];
var list =[];

button1.addEventListener('click',function () {
  reset();
  preorder(container);
  changeColor();
},false);

button2.addEventListener('click',function () {
  reset();
  inorder(container);
  changeColor();
},false);

button3.addEventListener('click',function () {
  reset();
  postorder(container);
  changeColor();
},false);

//前序
function preorder (node) {
  if(node !=null) {
    list.push(node);
    preorder(node.firstElementChild);
    preorder(node.lastElementChild);
  }
}
//中序
function inorder() {
  if(node !=null) {
    preorder(node.firstElementChild);
    list.push(node);
    preorder(node.lastElementChild);
  }
}
//后序
function postorder() {
  if(node !=null) {
    preorder(node.firstElementChild);
    preorder(node.lastElementChild);
    list.push(node);
  }
}
//颜色变化
function changeColor() {
  var i=0;
  list[i].style.backgroundColor='blue';
  timer = setInterval(function () {
    i++;
    if(i<list.length) {
      list[i-1].style.backgroundColor='#fff';
      list[i].style.backgroundColor='blue';
    }else {
      clearInterval(timer);
      list[list.length-1].style.backgroundColor="#fff";
    }
  },500)
}

//重置
function reset() {
  list=[];
  var div = document.getElementsByTagName('div');
  for (var index = 0; index < div.length; index++) {
    div[index].style.backgroundColor='#fff';
    
  }
}