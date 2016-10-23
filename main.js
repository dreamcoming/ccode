var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

// 基本url
var baseUrl = "http://www.xxbiquge.com/10_10929/";

// 起始id
var startId = "8798828.html";

// 下载总数量
var count = 10000;

// 计数
var i = 0;

//开始时间
var startTime = new Date().getTime();

startDown (baseUrl+startId);

function startDown (url) {
	console.log(url);

	http.get(url, function (res) {
		var html = '';
	    res.on('data', function (chunk) {   
	       html += chunk;
	    });

	    res.on('end', function () {
	    	if (i >= count) {
	    		var time = new Date().getTime() - startTime;
	    		console.log('下载完毕,共%d个,耗时%d毫秒。',count,time);
	    		return;
	    	}

	    	i++;
	    	var $ = cheerio.load(html);
	    	var fileName = $('h1').text();
	    	var content = fileName + '\n' +$('#content').text();

	        fs.appendFile('./article/' + i + '-' + fileName + '.txt', content, 'utf-8', function (err) {
	            if (err) {
	            	console.log(fileName + '下载失败了，请重试！');
	                console.log(err);
	                
	            }
	            console.log(fileName + '下载完成！');

        		var nextUrl = $('div.bottem2 #A3').attr('href');
				if (!nextUrl) {
					console.log(fileName+'的下一章找不到了');
					return;
				}
	        	startDown (baseUrl+nextUrl);
	        });

	

	    });
	});
};

