/*
 * 路由映射文件,配置越靠前，优先级越高
 * */

var express = require('express');
var router = express.Router();
router.get('*', function (req, res, next) {
    res.render('index.html');
});
module.exports = router;