var join = require("path").join;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
/*
 * 基于不同模式，区分配置
 * */
var configs = {
    "devserver": {
        "path": '../public',
        "publicPath": 'http://localhost:8086/s/'
    },
    "development": {
        "path": '../public',
        "publicPath": '/s/'
    },
    "test": {
        "path": './dist',
        "publicPath": '/s/'
    },
    "production": {
        "path": './dist',
        "publicPath": '/s/'
    }
};
var cfg = configs.development;
/*
 * 构建之前是否清除之前构建的内容。
 * */
var clean = true;
/*
 * 获取自定义参数
 * 自定义参数约定：webpack --cfg.path=./public --cfg.runmod=dev
 *
 * 有更好的方法：
 * 但是报错：Option '-d' not supported. Trigger 'webpack -h' for more details.
 *
 var argv = require('argv');
 var args = argv.option({
 name: 'option',
 short: 'o',
 type: 'string',
 description: 'Defines an option for your script',
 example: "'script --opiton=value' or 'script -o value'"
 }).run();

 console.dir(args.options);
 然后
 $ node app.js -o aaa
 { option: 'aaa' }
 *
 *
 * 还可以这么做:
 * JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
 * JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
 * BUILD_DEV=1 BUILD_PRERELEASE=1 webpack
 * */
var arguments = process.argv.splice(2);
if (arguments) {
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var keyWordInex = arg.indexOf('--cfg.');
        if (keyWordInex == 0) {
            arg = arg.substr(6, arg.length);
        }
        var cfgs = arg.split('=');
        if (cfgs[0] == 'runmod' && configs[cfgs[1]]) {
            cfg = configs[cfgs[1]];
        }
        if (cfgs[0] == 'clean' && cfgs[1] == 'false') {
            clean = false;
        }
    }
}
/*
 * 定义entry
 * 如果项目结构命名有良好的约定，是否考虑使用代码自动生成entry？
 * */
var _entry = {
    //"index": ["./src/home/home.jsx", "./src/home/home-content.jsx"],//会合并成一个index.js
    "index": './src/entry/index.jsx'
};

/*
 * 构建之前，先清除之前构建的内容
 * 注：这样有个问题，执行 webpack-dev-server 的时候会删除对应的构建内容，并且没有再生成。
 * */
if (clean) {
    var child_process = require('child_process');
    var targetDir = join(__dirname, cfg.path);
    //var shell = 'rm -rf ' + targetDir + '&& mkdir ' + targetDir + "&& cp index.html "+ targetDir;
    var shell = 'rm -rf ' + targetDir;
    child_process.exec(shell, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

/*
 * babel参数
 * */
var babelQuery = {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports', 'typecheck']
};

/*
 * webpack配置
 * */
module.exports = {
    /*
     * 指定node_modules目录, 如果项目中存在多个node_modules时,这个很重要.
     * import js或者jsx文件时，可以忽略后缀名
     * */
    resolve: {
        modulesDirectories: ['node_modules', (0, join)(__dirname, './node_modules')],
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules', (0, join)(__dirname, './node_modules')]
    },
    /*
     * 入口文件配置
     * */
    entry: _entry,
    /*
     * 输出配置
     * path：构建之后的文件存放目录
     * publicPath：js或css等文件，浏览器访问时路径
     * filename：构建之后的文件名
     * */
    output: {
        path: join(__dirname, cfg.path),
        publicPath: cfg.publicPath,
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: babelQuery
            }, {
                test: /\.jsx$/,
                loader: 'babel',
                query: babelQuery
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css?sourceMap&-restructuring!' + 'autoprefixer-loader')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!' + 'autoprefixer-loader!' + 'less?{"sourceMap":true,"modifyVars":{}}')
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: 'url?limit=10000'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream'
            }, {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml'
            }
        ]
    },
    plugins: [
        /*
         * 公共文件配置
         * */
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        /*
         * css单独打包成一个css文件
         * 比如entry.js引入了多个less，最终会都打到一个xxx.css中。
         * */
        new ExtractTextPlugin("[name].css", {
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        /*
        * 这样写法 fetch就可以全局使用了，各个不用单独import
        * */
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};
