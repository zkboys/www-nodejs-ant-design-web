var join = require('path').join;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var child_process = require('child_process');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var rummod = process.env.runmod || 'development';
/*
 * 基于不同模式，区分配置
 * */
var configs = {
    development: {
        path: '../public',
        publicPath: 'http://localhost:8088/s/',
        library: [
            {from: 'node_modules/antd/dist/antd.css', to: 'antd.min.css'},
            {from: 'node_modules/antd/dist/antd.js', to: 'antd.min.js'},
            {from: 'node_modules/react/dist/react.js', to: 'react.min.js'},
            {from: 'node_modules/react-dom/dist/react-dom.js', to: 'react-dom.min.js'}
        ]
    },
    test: {
        path: '../public',
        publicPath: '/s/'
    },
    production: {
        path: '../public',
        publicPath: '/s/',
        library: [
            {from: 'node_modules/antd/dist/antd.min.css'},
            {from: 'node_modules/antd/dist/antd.min.js'},
            {from: 'node_modules/react/dist/react.min.js'},
            {from: 'node_modules/react-dom/dist/react-dom.min.js'}
        ]
    }
};


/*
 * 获取不同的环境配置
 * */
var cfg = configs[rummod] || configs.development;
/*
 * 第三方js库，分离出来能提高打包速度
 * */
var library = cfg.library;
/*
 * 定义entry
 * 如果项目结构命名有良好的约定，是否考虑使用代码自动生成entry？
 * */
var _entry = {
    //"index": ["./src/home/home.jsx", "./src/home/home-content.jsx"],//会合并成一个index.js
    "index": './src/entry/index.jsx'
};

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
        pathinfo: false,//去掉生成文件的相关注释
        path: join(__dirname, cfg.path),
        publicPath: cfg.publicPath,
        filename: "[name].min.js",// entry　配置的文件
        chunkFilename: "[name].[chunkhash:8].min.js",//非entry，但是需要单独打包出来的文件名配置，添加[chunkhash:8]　防止浏览器缓存不更新．
        //libraryTarget: 'umd',
        'libraryTarget': 'var'
        //umdNamedDefine: true
    },
    externals: {// 这些在页面上通过script标签引入，不参与webpack的构建，提高构建速度。
        'react': 'React',
        'react-dom': 'ReactDOM',
        'antd': 'antd'
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
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name]-[hash:7].[ext]'
                }
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
        //new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks: 2
        }),
        /*
         * css单独打包成一个css文件
         * 比如entry.js引入了多个less，最终会都打到一个xxx.css中。
         * */
        new ExtractTextPlugin("[name].min.css", {
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        /*
         * 这样写法 fetch就可以全局使用了，各个不用单独import
         * */
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),

        /*
         * 拷贝externals文件到指定静态目录，webpack-dev-server也可以获取到这些文件。
         * */
        new CopyWebpackPlugin(library)
    ]
};
