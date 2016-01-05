#webpack示例项目
*基于ant.design*
##evn
```
node 4.x
```
##dev
```
sudo npm install webpack -g
sudo npm install webpack-dev-server -g

npm install
npm run dev-server
```

##build
```
npm run build-dev  //build-test  build-pro
```
##约定
- 每个页面为一个单独组件,每个页面所用到的资源都放到一个文件夹下面,比如home
    ```
    home
        -img
            -home.jpg
        -home.jsx    
        -style.less    
    ```
- 所有的get请求最终没有被截获的都打到index.html
    
##需要学习的内容
- React基础语法
- React Router插件
- React Flux应用架构

##待解决问题
- 执行构建有些慢
- 根据地址定位左侧菜单 目前使用全局持有菜单句柄的方法，有点恶心，有没有好一点的方法？
- 根据左侧菜单修改右上角对应的面包屑
- 由于这个是一个单页面应用,从新发送ajax请求的时候,一些ajax请求需要被打断,否则用户网络情况不好,点击了多个按钮,最终不能确定哪个ajax会被执行,会导致页面错乱问题.
- 组件之间的通信
    - 父级->子级 props
    - 子级->父级 props传递事件?
    - 没有级联关系组件之间 flux
- 同一个组件,使用不同的react-router path,会导致这个组件渲染页面特变慢
    ```
    比如:
    path: 'aaaaa', component: Dashboard
    path: 'bbbbb', component: Dashboard
    这样一个路由,会导致Dashboard渲染页面特别慢
    ```
##报错
```
webpack.config.js中使用argv报错：
Option '-d' not supported. Trigger 'webpack -h' for more details.
目前自己写了个循环处理传入的参数
```

##dev-server
结合webpack-dev-server 可以做到代码改动,浏览器自动刷新.
*使用webpack-dev-server 作为静态服务器,以--inline方式启动,js中会添加热刷新相关的代码.前后端各添加一个开发服务器的配置,对项目基本无侵入.*
nodejs为例:

- 后台正式服务器添加一个启动模式:
```
exports.devserver = {
    static_url_prefix: 'http://localhost:8086/s/' //这个指向webpack-dev-server服务器
};
```
- 前端webpack添加一个启动模式:
```
"devserver": {
    "path": '../public',
    "publicPath": 'http://localhost:8086/s/' //这个指向webpack-dev-server服务器
},
```
- webpack-dev-server 启动方式:(以devserver方式启动)
```
webpack-dev-server --port 8086  --cfg.clean=false --cfg.runmod=devserver --progress --inline
```
- 后端启动方式:(以devserver方式启动)
```
PORT=3001 NODE_ENV=devserver npm start
```
- 浏览器输入下面连接访问,就可以达到热刷新,尤其适合刷屏 调整页面细节情况.
```
http://localhost:3001/    
```    
