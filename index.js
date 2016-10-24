var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('hello');
});

//signature 	微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
//timestamp 	时间戳
//nonce 	随机数
//echostr 	随机字符串
app.get('/weixin', function (req, res) {
  console.log('req.query', req.query);
  res.send(req.echostr);
});

app.listen(80);

console.log('---start---');