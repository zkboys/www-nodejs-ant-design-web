var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , swig = require('swig')
    , rf = require("fs")
    , crypto = require('crypto')
    , session = require('express-session')
    , csrf = require('csurf')

    , routes = require('./routes')
    , configs = require('./configs')
    , staticFilesMD5Map = {};
var app = express();
var run_mod = app.get('env');
var config = configs[run_mod] || configs['development'];
var siteRootPath = __dirname.substring(0, __dirname.length - 8);

// view engine setup
app.set('views', path.join(siteRootPath, 'app', 'views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
if (run_mod !== 'production') {//非生产环境下，不使用缓存
    // Swig will cache templates for you, but you can disable that and use Express's caching instead, if you like:
    app.set('view cache', false);
    // To disable Swig's cache, do the following:
    swig.setDefaults({cache: false});
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//TODO cookie怎么跟域名绑定，比如，我如果通过ip直接访问项目，cookie是无效的，必须使用域名访问。
//TODO cookie的加密算法？底层实现了？
app.use(cookieParser(config.cookie_secret));
app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: config.cookie_secret
}));
// 对应的连接写成：/css/common.css
//app.use(express.static(path.join(siteRootPath, 'public')));
// 创建一个虚拟目录，对应的连接要写成/s/css/common.css
app.use(config.static_url_prefix, express.static(path.join(siteRootPath, 'public'), {maxAge: 60 * 60 * 24 * 365 * 10, etag: true, lastModified: true}));
// app.locals中的属性，html模板语言可以直接访问，controller中可以通过req.app.locals访问。
app.locals.siteName = config.sitename;
app.locals.static_url = function (filePath) {
    /* 实现方案：
     * 读取本地服务器文件，计算md5,拼接查询字符串:v=xxxxxxxxxxxxx,并缓存计算结果。
     * nginx配置静态文件缓存为永久有效。
     * TODO 模板本身有没有提供一个这样的方法？
     * */
    var fileMD5 = staticFilesMD5Map[filePath];
    if (!fileMD5) {
        var data = rf.readFileSync(path.join(siteRootPath, 'public', filePath), "utf-8");
        fileMD5 = crypto.createHash('md5').update(data).digest('hex');
        staticFilesMD5Map[filePath] = fileMD5;
    }
    return config.static_url_prefix + filePath + '?v=' + fileMD5;
};

app.use(csrf());// 会创建 req.session.csrfSecret属性 但是这个属相好像过时了,以前的api有用到.
//app.use('/book', csrf()); // 可以具体精确到哪些请求使用csrf
app.use(function (req, res, next) {
    //所有的请求都会先经过这里，可以在这里做一些操作
    // res.locals的方法，模板语言也可以直接访问
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    res.locals.isAjax = req.xhr;
    next();
});
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (run_mod === 'development') {
    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            status: err.status,
            stack: err.stack
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        status: err.status,
        stack: ''
    });
});
module.exports = app;
