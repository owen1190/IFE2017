var http = require('http');
var url = require('url');
var exec = require('child_process').exec;

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("mongoose started");
});

var ResultSchema = new mongoose.Schema({
  code: Number,
  msg: String,
  device: String,
  keyword: String,
  time: Number,
  datalist: [{
    title: String,
    info: String,
    link: String,
    info: String
  }]
});

var Result = mongoose.model('Result',ResultSchema);

http.createServer(function (req,res) {
  if(req.url !== '/favicon.ico'){
  console.log("request received");

  var queryObj = url.parse(req.url,true).query;

  exec("phantomjs task.js "+queryObj.word+' '+queryObj.device,function (err,stdout,stderr) {
    if(err) {
      console.log("出错了");
    }else {
      try {
                   JSON.parse(stdout);
          } catch (err) {
                   res.writeHead(200, {'Content-Type': 'application/json'});
                   return res.end(JSON.stringify({code: 0, msg: '请确认查询参数是否正确'}));
               }
      var result = new Result(JSON.parse(stdout));

      res.writeHead(200,{"Content-type":"application/json"});
      res.end(stdout);

      result.save(function (err,result) {
        if(err) console.log(err);
        else console.log(result);
    })
  }
})
}
}).listen(8000);
console.log("server started");
