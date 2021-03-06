/**
 * Created by zengyuanli on 2015/8/4.
 */

var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update');

// 读取分类页面
request('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', function(err, res, body){
    if(err) return console.err(err);

    var $ = cheerio.load(body.toString());

    // 读取博文列表
    var articleList = [];
    $('.articleList .articleCell').each(function(){
        var $me = $(this);
        var $title = $me.find('.atc_title a');
        var $time = $me.find('.atc_tm');
        var item = {
            title: $title.text().trim(),
            url:   $title.attr('href'),
            time:  $time.text().trim()
        };
        // 从URL中取出文章的ID
        var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);
        if (Array.isArray(s)) {
            item.id = s[1];
            articleList.push(item);
        }
    });
    console.log(articleList);

});




