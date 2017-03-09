/*发布订阅模式*/
function Event() {
    this.events = {};
}
Event.prototype = {
    // 订阅事件
    on: function(attr,callback){
        if(this.events[attr]){
          this.events[attr].push(callback);
        }else{
          this.events[attr] = [callback];
        }
       },
       // 触发事件(发布事件)
       emit: function(attr,...arg){
         this.events[attr] && this.events[attr].forEach(function(item){
           item(...arg);
       })
     }
};
/*
  监听一个对象的变化,观察器
*/
function Observer(data) {
  this.data = data;
  this.walk(data);
  this.eventsBus = new Event();
}

let p = Observer.prototype;

p.walk = function (obj) {
  let val;
  for (var key in obj) {
    //forin循环会循环出所有可枚举类型，所以需要hasOwnProperty过滤出这个对象本身的属性
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      //判断是否遍历到最底层，继续new Observer
      if(typeof val === 'object') {
        new Observer(val);
      }
      this.convert(key,val);
    }
  }
};

p.convert = function (key,val) {
  /*Object.defineProperty(obj, prop, descriptor)
  obj:需要定义属性的对象。prop:需定义或修改的属性的名字。
  descriptor:将被定义或修改的属性的描述符。*/
  var _this=this;//保存this指针
  Object.defineProperty(this.data,key,{
    enumerable: true,//能出现在对象的枚举属性中
    configurable: true,//能被删除
    get: function () {
      console.log('你访问了'+ key);
      return val;
    },
    set: function (newVal) {
      console.log('你设置了'+ key );
      console.log('新的'+ key + '=' + newVal);
//更改后发布事件
       _this.eventsBus.emit(key,val,newVal);
      if(newVal === val) return;
      val = newVal;
      if (typeof newVal === 'object') {
        new Observer(val);
      }
    }
  })
};

p.$watch = function(attr, callback){
  this.eventsBus.on(attr, callback);
}

let app = new Observer({
        name: 'yuweijie',
        age: 25
});

app.$watch('age', function(oldVal, newVal) {
        console.log(`年纪变了，原来是：${oldVal}, 现在已经是：${newVal}岁了`);
});
