var container = document.getElementsByClassName('container')[0];
var nodes = [{
  name: "父节点1",
  children: [{
    name: "子节点1",
    children:[{
      name: "叶子节点111"
    },{
      name: "叶子节点112"
    }]
  }, {
    name: "子节点2",
    children:[{
      name: "叶子节点121"
    },{
      name: "叶子节点122"
    },{
      name: "叶子节点123"
    }]
  }]
}, {
  name: "父节点2",
  children: [{
    name: "子节点3"
  }]  
},{
  name: "父节点3"
}];

function init( node,index) {
  var father = document.createElement('ul');
  if (node[index].children == undefined) {
      var flen = 0;
    father.innerText=node[index].name+"-没有子节点";
    container.appendChild(father);
    return;    
    } else {
      var flen = node[index].children.length || 0;      
      father.innerText=node[index].name+"-展开";
    }
  for (var i = 0; i < flen; i++) {
    var ul = document.createElement('ul');
    if (node[index].children[i].children == undefined) {
      var slen = 0;
      ul.innerText = node[index].children[i].name+"-没有子节点";  
      father.appendChild(ul);
      ul.style.display = "none";
      continue;      
    } else {
      var slen = node[index].children[i].children.length ;
    ul.innerText = node[index].children[i].name+"-展开";
    ul.style.display = "none";
    }
    
    for (var j = 0; j < slen; j++) {
      var li = document.createElement('li');
      ul.appendChild(li);
      li.innerText = node[index].children[i].children[j].name;
      li.style.display = "none";
    }    
  father.appendChild(ul);
  }
  container.appendChild(father);
}

window.onload= function () {
  for (var index = 0; index < nodes.length; index++) {
    init(nodes,index);    
  }
}

container.addEventListener("click",function (e) {
  var ul = e.target.children;
  for (var index = 0; index < ul.length; index++) {
    ul[index].style.display="block";
    
  }
  // ul.style.display="block"
  // console.log(ul);
})