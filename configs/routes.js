/*
 * 路由映射文件,配置越靠前，优先级越高
 * */

var express = require('express');
var router = express.Router();
router.get('/dashboard.json', function (req, res, next) {
    //res.json({name: 'aaa', age: 22});
    res.send({name: 'aaa', age: 22});
});
router.get('*', function (req, res, next) {
    res.render('index.html');
});
module.exports = router;