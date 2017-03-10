// var name = document.getElementById('name');
// var password = document.getElementById('password');
var test1 = false;//name
var test2 = false;//password
var test3 = false;//reconfirm
var test4 = false;//email
var test5 = false;//phone
var input = document.getElementsByTagName("input");
var hint = document.getElementsByTagName("p");
//名称
input[0].addEventListener("focus",function () {
  hint[0].innerText = "必填，长度为4-16个字符";
  hint[0].style.color = '#ccc';
},false);

input[0].addEventListener("blur",function () {
  hint[0].innerText = "";
  var value = input[0].value;
  var len = 0;
  if (value == "") {
      hint[0].innerText = "姓名不能为空";
      hint[0].style.color = "rgb(209,0,21)";
      input[0].style.border = "2px solid rgb(209,0,21)";
      test1=false;
  }

  for (var i = 0; i < value.length; i++) {
      var coding = value.charCodeAt(i);
      if (coding > 0x00) {
          if (coding < 0xFF) {
              len++;
          } else {
              len += 2;
          }
      } else {
          len += 2;
      }
  }
  if (len >= 4 & len <= 16) {
      hint[0].innerText = "名称格式正确";
      hint[0].style.color = "rgb(110,182,74)";
      input[0].style.border = "2px solid rgb(110,182,74)";
      test1 = true;
  } else {
      hint[0].innerText = "名称格式不正确";
      hint[0].style.color = "rgb(209,0,21)";
      input[0].style.border = "2px solid rgb(209,0,21)";
      test1 = false;
  }
},false);
//密码
input[1].addEventListener("focus",function () {
  hint[1].innerText = "必填，请输入密码";
  hint[1].style.color = '#ccc';
},false);

input[1].addEventListener("blur",function () {
  var value = input[1].value;
  if(value == "") {
    hint[1].innerText = "密码不能为空";
    hint[1].style.color = "rgb(209,0,21)";
    input[1].style.border = "2px solid rgb(209,0,21)";
    test2 = false;
  }else {
    hint[1].innerText = "密码格式正确";
    hint[1].style.color = "rgb(110,182,74)";
    input[1].style.border = "2px solid rgb(110,182,74)";
    test2 = true;
  }
},false);
//密码确认
input[2].addEventListener("focus",function () {
  hint[2].innerText = "必填，请再次输入密码";
  hint[2].style.color = '#ccc';
},false);

input[2].addEventListener("blur",function () {
  var value = input[2].value;
  if(value == "") {
    hint[2].innerText = "密码不能为空";
    hint[2].style.color = "rgb(209,0,21)";
    input[2].style.border = "2px solid rgb(209,0,21)";
    test3 = false;
  }else {
    if(value !== input[1].value) {
      hint[2].innerText = "密码不一致";
      hint[2].style.color = "rgb(209,0,21)";
      input[2].style.border = "2px solid rgb(209,0,21)";
      test3 = false;
    }else {
      hint[2].innerText = "密码一致";
      hint[2].style.color = "rgb(110,182,74)";
      input[2].style.border = "2px solid rgb(110,182,74)";
      test3 = true;
    }
  }
},false);
//邮箱
input[3].addEventListener("focus",function () {
  hint[3].innerText = "必填，请输入邮箱";
  hint[3].style.color = '#ccc';
},false);

input[3].addEventListener("blur",function () {
  var value = input[3].value;
  if(value == "") {
    hint[3].innerText = "邮箱不能为空";
    hint[3].style.color = "rgb(209,0,21)";
    input[3].style.border = "2px solid rgb(209,0,21)";
    test4 = false;
  }else {
    if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
      hint[3].innerText = "输入邮箱格式正确";
      hint[3].style.color = "rgb(110,182,74)";
      input[3].style.border = "2px solid rgb(110,182,74)";
      test4 = true;
    }else {
      hint[3].innerText = "输入邮箱格式不正确";
      hint[3].style.color = "rgb(209,0,21)";
      input[3].style.border = "2px solid rgb(209,0,21)";
      test4 = false;
    }
  }
},false);
//手机号
input[4].addEventListener("focus",function () {
  hint[4].innerText = "请输入手机号";
  hint[4].style.color = '#ccc';
},false);

input[4].addEventListener("blur",function () {
  var value = input[4].value;
  if(value == "") {
    hint[4].innerText = "手机号不能为空";
    hint[4].style.color = "rgb(209,0,21)";
    input[4].style.border = "2px solid rgb(209,0,21)";
    test5 = false;
  }else {
    if(/^1[3|4|5|8][0-9]\d{7,8}$/.test(value)) {
      hint[4].innerText = "输入手机号格式正确";
      hint[4].style.color = "rgb(110,182,74)";
      input[4].style.border = "2px solid rgb(110,182,74)";
      test5 = true;
    }else {
      hint[4].innerText = "输入手机号格式不正确";
      hint[4].style.color = "rgb(209,0,21)";
      input[4].style.border = "2px solid rgb(209,0,21)";
      test5 = false;
    }
  }
},false);

var button = document.getElementById("submit");
button.addEventListener("click",function () {
  var test = test1 && test2 && test3 && test4 && test5;
  if (test) {
    alert('提交成功');
  } else {
    if(!test1) alert('名称格式错误');
    if(!test2) alert('密码格式错误');
    if(!test3) alert('密码不一致');
    if(!test4) alert('邮箱格式错误');
    if(!test5) alert('手机号格式错误');
    alert('提交失败');
  }
},false);
