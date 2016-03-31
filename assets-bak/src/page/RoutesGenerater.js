var fs = require('fs');
var SimpleRoutes = require('./SimpleRoutesCfg.js').simpleRoutes;
var routs = [];
for (var key in SimpleRoutes) {
    var component = SimpleRoutes[key];
    var rout = "{"
        + "path: '" + key + "', getComponent: (location, cb) => {"
        + "require.ensure([], (require) => {"
        + "cb(null, require('" + component + "'));"
        + "})"
        + "}"
        + "}";
    routs.push(rout);
}
var options = '/*\n' +
    '* 这个文件是通过SimpleRoutesCfg.js生成出来的，不要直接编辑这个文件，路由相关配置写到SimpleRoutesCfg.js文件中\n' +
    '* 由于SimpleRoutesCfg.js不在webpack watch范围内，修改SimpleRoutesCfg.js文件要手动执行一下 npm run generate-routes 来生成路由\n' +
    '* npm run generate-routes 命令已经写入webpack.config.js，build之前会自动执行。\n' +
    '*/\n';
var routsStr = options + 'export default[' + routs.join(',') + ']';
fs.writeFileSync('./src/page/RoutesCfg.js', routsStr);
console.log('Routes Generate Successfully!');