"use strict";
exports.authenticate = function (req, res, next) {
    if (true) {
        return res.redirect('/login');
    }
    next();
};
/*

// 认证访问控制
// 未认证
function authentication(req, res, next) {
    if (!req.session.user) {
        req.session.error = '请先登录';
        return res.redirect('/login');
    }
    next();
}

// 已认证
function noAuthentication(req, res, next) {
    if (req.session.user) {
        req.session.error = '已登录';
        return res.redirect('/home');
    }
    next();
}*/
