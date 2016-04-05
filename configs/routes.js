/*
 * 路由映射文件,配置越靠前，优先级越高
 * */

var express = require('express');
var router = express.Router();
router.get('/dashboard.json', function (req, res, next) {
    //res.json({name: 'aaa', age: 22});
    var start = new Date();
    while ((new Date().getTime() - start.getTime()) < +req.query.delay) {//阻塞X秒钟

    }
    console.log(req.query);
    res.send({name: 'aaa', age: 22});
});
router.get('/list-table.json', function (req, res, next) {
    var start = new Date();
    var delay = 0;
    while ((new Date().getTime() - start.getTime()) < +delay) {//阻塞X秒钟

    }
    var totalCount = 192;//Math.ceil(Math.random()*(500-100)+100);
    var pageSize = req.query.pageSize;
    var currentPage = req.query.currentPage;
    var totalPage = Math.ceil(totalCount / pageSize);
    var count = currentPage == totalPage ? totalCount - (currentPage - 1) * pageSize : pageSize;
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            key: i,
            name: '李大嘴' + i + '第' + req.query.currentPage + '页数据',
            age: 32,
            address: '西湖区湖底公园' + i + '号'
        });
    }
    res.send({
        tableData: data,
        totalCount: totalCount
    });
});
router.get('*', function (req, res, next) {
    res.render('index.html');
});
module.exports = router;