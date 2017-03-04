var page = require('webpage').create(),
 system = require('system'),
keyword = system.args[1],
 datalist=[],
 result={},
 t=Date.now(),
 url='http://www.baidu.com/s?wd='+keyword;



phantom.outputEncoding = 'gb2312'
page.open(url,function (status) {
  if(status === 'success') {
    console.log("正在爬虫中");
    setTimeout(function() {
      page.includeJs("./jquery-3.1.1.min.js",function () {
        datalist = page.evaluate(function () {
          var data = [];
          $(".c-container").each(function (index) {
            data[index]= {
              title:$(this).find(".t").text() || "",//结果条目的标题
              info:$(this).find(".c-abstract").text() || "",//摘要
              link:$(this).find(".c-showurl").text() || "",//链接
              pic:$(this).find(".general_image_pic img").attr('src') || ""//缩略图地址
            };
          });
          return data;
        });
        result = {
          code:1,
          msg: "抓取成功",
          keyword:keyword,
          time:Date.now() - t,
          datalist:datalist
        };
        console.log(JSON.stringify(result));
        phantom.exit();
      });
    }, 5000);
  } else {
    console.log("链接失败");
    result = {
      code:0,
      msg: "抓取失败"
    }
    console.log(JSON.stringify(result));
    phantom.exit();
  }
});
