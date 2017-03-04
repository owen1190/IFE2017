# 网页抓取分析服务系列之三（服务封装）
## 任务目的
1. 学习NodeJS HTTP模块
2. 学习NodeJS和本地进程的互动
3. 学习NodeJS和mongodb的交互

## 任务描述
1. 安装nodejs和mongodb
2. 利用nodejs的HTTP模块封装一个node服务，监听8000端口，接受一个参数（关键字）
3. 收到请求后，启动phantomjs进程执行taskjs，并将接受到的参数传递给phantomjs
4. phantomjs执行完后告诉node服务，并传回抓取的json结果是node服务将结果存到mongodb中（使用mogoose）

## 知识点
### http模块响应get
`http.createServer`创建服务器，利用回调函数中`response`响应`get`请求。
```javascript
var http = require("http");  
http.createServer(function(request, response) {  
        console.log('request received');  
        response.writeHead(200, {"Content-Type": "text/plain"});  
        response.write("Hello World");  
        response.end();  
}).listen(8000);  
console.log('server started');
```

### 解析url字符串
使用`URL`模块的`url.parse()`方法来解析`url`字符串，会得到一个`urlObject`，取出其中的`query`属性，默认得到的`query`是个字符串，需要将`url.parse()`的第二个参数设置为`true`，`query`将被解析为一个对象。

### 创建字进程调用命令行
使用`child_process`模块的`child_process.exec()`方法来调用命令行。传给回调的 `stdout` 和 `stderr` 参数会包含子进程的 `stdout` 和 `stderr` 的输出。

### 运行mongodb服务器
在mongodb目录的bin中打开命令行，输入以下命令`mongodb.exe --dbpath f:/db`

### 使用mongoose调用mongodb
1. 引用mongoose模块
2. 创建连接`mongoose.connect("mongodb://localhost/test");`
3. 需要判断数据库是否连接成功
```
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("mongoose started");
});
```
4. 定义一个Schema`var ResultSchema = new mongoose.Schema()`
5. 发布为Model，`var Result = mongoose.model('Result',ResultSchema);`
6. 用Model创建Entity，`var result = new Result(JSON.parse(stdout));`
7. 存储到mongodb中，
```
result.save(function (err,result) {
  if(err) console.log(err);
  else console.log(result);
})
```

## 效果
![](http://i.imgur.com/wwWh7ta.jpg)

![](http://i.imgur.com/oMUfkKm.jpg)
