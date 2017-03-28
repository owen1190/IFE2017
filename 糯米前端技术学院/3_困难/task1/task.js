function Observer(data) {
  this.data = data;
  this.walk(data)
}

Observer.prototype.walk = function(obj) {
  // body...
  let val ;
  for (var key in obj) {
    if (object.hasOwnProperty(key)) {
      val = obj[key];
      if (typeof val === "object") {
        new Observer(val);
      }
      this.convert(key,val);
    }
  }
}

Observer.prototype.convert = function(key,val) {
  Object.defineProperty(this.data,key,{
    enumerable:true,
    configurable:true,
    get: function () {
      console.log("你访问了"+key);
      return val;
    }
    set: function () {
      console.log("你设置了"+key);
      console.log("新的"+key+' = '+newVal);
      if (newVal === val) {
        return;
      }
      val = newVal;
    }
  })
}
