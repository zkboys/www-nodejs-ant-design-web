/*
 * 项目配置文件
 * 区分集中模式：development test preprod production
 * */
exports.devserver = {
    sitename: 'ZKBOYS后台管理系统',
    wetsite: 'inc.zkboys.com',
    cookie_secret: 'ywcSahu4QQOhT7mzXmCl3dg1R7iIHUkFhrJJU69VaKo=',
    xsrf_cookies: true,
    static_url_prefix: 'http://localhost:8088/s/'
};
exports.development = {
    sitename: 'ZKBOYS后台管理系统',
    wetsite: 'inc.zkboys.com',
    cookie_secret: 'ywcSahu4QQOhT7mzXmCl3dg1R7iIHUkFhrJJU69VaKo=',
    xsrf_cookies: true,
    static_url_prefix: '/s/'
};
exports.test = {};
exports.preprod = {};
exports.production = {
    sitename: 'ZKBOYS后台管理系统',
    wetsite: 'inc.zkboys.com',
    cookie_secret: 'ywcSahu4QQOhT7mzXmCl3dg1R7iIHUkFhrJJU69VaKo=',
    xsrf_cookies: true,
    static_url_prefix: '/s/'
};