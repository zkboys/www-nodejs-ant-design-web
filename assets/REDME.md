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
npm run start
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