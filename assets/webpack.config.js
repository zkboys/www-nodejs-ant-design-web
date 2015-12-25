var path = require("path")
    , fs = require('fs');
module.exports = function (webpackConfig) {
    webpackConfig.module.loaders.forEach(function (loader) {
        if (loader.loader === 'babel') {
            // https://github.com/ant-design/babel-plugin-antd
            loader.query.plugins.push('antd');

            loader.loaders = ['es3ify', 'babel?' + JSON.stringify(loader.query)];
            delete loader.query;
            delete loader.loader;
        }
        return loader;
    });
    webpackConfig.entry = scanEntry();//entry 从package.json中移入这里可以通过约定＋代码，自动完成．
    webpackConfig.output.path = path.join(__dirname, '../public');
    webpackConfig.output.publicPath = '/s/';//静态文件发布时的目录前缀,会自动拼接到jsx 或者less中.TODO 怎么根据开发模式进行区分?
    return webpackConfig;
};

/*
 * 根据项目约定,构建的时候,就可以自动搜索需要配置的entry,
 * 否则需要在webpackConfig.entry = scanEntry();配置之后,手动自己指定:
 * webpackConfig.entry['test'] = './src/test/aaa.jsx';
 * TODO 这个方法需要优化,可能会出现 user-add.jsx  user-list.jsx user-detail.jsx这样的情况.
 * */
function scanEntry() {
    var src = './src';//开发根目录
    var ignoreDirs = ['common'];//不需要扫描的目录
    var dirs = fs.readdirSync(src);
    var entries = {};
    dirs.forEach(function (item) {
        var tmpPath = path.join(src, item);
        var stats = fs.statSync(tmpPath);
        if (stats.isDirectory() && ignoreDirs.indexOf(item) == -1) {
            var files = fs.readdirSync(tmpPath);
            files.forEach(function (fileName) {
                if (item + '.jsx' == fileName) {
                    //entries[item] = path.join(tmpPath, fileName);
                    entries[item] = './' + tmpPath + '/' + fileName;

                }
            });
        }
    });
    console.log('***auto scan entry result***');
    console.log(entries);
    return entries;
}