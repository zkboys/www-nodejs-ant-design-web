"use strict";
exports.index = function (req, res, next) {
    console.log(req.app.locals.isAjax);
    console.log('index11111');
    res.render('home/index.html');
};