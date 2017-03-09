# 网页抓取分析服务系列之二（设备模拟）
# 任务目的
1. 学会分析并借鉴其他工具的运行机制
2. 学习更多phatomJS的配置

# 任务描述
1. 观察chrome开发者工具中device toolbar，切换到不同的device，查看浏览器BOM数据有何变化
2. 把device toolbar中不同的device名对应的ua和尺寸信息记录下来，保存为配置文件
3. 在任务1的基础上，增加一个参数，表示device信息，taskjs中，解析该参数并从配置文件找到对应的ua和尺寸，完成设置后再抓取
4. 在结果中也增加一个device字段保存传入的设备名

# 注意事项
1. 需要使用以下api：`system.args`、`page.settings['userAgent']`、`page.viewportSize、page.clipRect`

2. 查看device及其参数方法：使用device toolbar
先点击下图蓝色按钮，然后在切换设备，旁边会匹配其窗户大小（width*height）
![](http://i.imgur.com/jKgp5Vx.jpg)
查看对应的ua，只需要在console中输入`navigator.userAgent`即可
![](http://i.imgur.com/Zm3JS8b.jpg)
# 使用方法
下载后，在根目录下安装phantomjs(`npm install phantomjs`)
然后在命令行中输入`phantomjs keyword device`，其中`keyword`为所要搜索的关键字，`device`为``[iphone6,iphone5,ipad,galaxy s5]``中一个
