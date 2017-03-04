/*
  监听一个对象的变化,观察器
*/
function Observer(data) {
  this.data = data;
  this.walk(data);
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
      if(newVal === val) return;
      val = newVal;
    }
  })
};
let data = {
    user: {
        name: "yuweijie",
        age: "25"
    },
    address: {
        city: {
          province: "liaoning",
          city: "dandong"
        }
    }
};

let app = new Observer(data);
