/**
 * Created by zengyuanli on 2015/8/3.
 */

var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update');

request('http://blog.sina.com.cn/u/1776757314', function (err, response, body) {
    //console.log(body);
    debug('读取文章分类列表：%s', body);
    if(err) return console.error(err);

    var $ = cheerio.load(body.toString());

    var classList = [];
    $('#module_3 .SG_dot a').each(function () {
        var me = $(this);

        var item = {
            title: me.text().trim(),
            url: me.attr('href')
        };

        var s = item.url.match(/articlelist_\d+_(\d+)_\d\.html/);
        //console.log(s);

        if(Array.isArray(s)){
            item.id = s[1];
            classList.push(item);
        }
    });
    console.log(classList);



});
