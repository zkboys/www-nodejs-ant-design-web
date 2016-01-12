#前端项目架构
*基于node.js 和 ant.design*
##需要node.js版本
```
node 4.x
```
##准备
```
sudo npm install webpack -g
sudo npm install webpack-dev-server -g
```
##前端环境安装启动
```
cd assets
npm install
npm run watch #启动webpack的watch模式
npm run dev-server #开启前端静态服务器，结合后端服务器可以做到浏览器自动刷新，方便开发。详见下面说明

npm run build-dev #构建development（开发）环境前端代码
npm run build-test #构建test（测试）环境前端代码
npm run build-pro #构建production（生产）环境前端代码
```


##dev-server
>- 结合webpack-dev-server 可以做到代码改动,浏览器自动刷新.
 - 使用webpack-dev-server 作为静态服务器,以--inline方式启动,js中会添加热刷新相关的代码.前后端各添加一个开发服务器的配置,对项目基本无侵入.
 - 注意前端静态服务器的端口，硬编码方式，多处有对应。

nodejs为例:

> 后台正式服务器添加一个启动模式:

```
exports.devserver = {
    static_url_prefix: 'http://localhost:8086/s/' //这个指向webpack-dev-server服务器
};
```
> 前端webpack.config.js添加一个启动模式:

```
"devserver": {
    "path": '../public',
    "publicPath": 'http://localhost:8086/s/' //这个指向webpack-dev-server服务器
},
```

> webpack-dev-server 启动方式:(以devserver方式启动)
*可以在assets目录中直接执行`npm run dev-server`*    

```
webpack-dev-server --port 8086  --cfg.clean=false --cfg.runmod=devserver --progress --inline
```

> 后端启动方式:(以devserver方式启动)
*可以在根目录中直接执行`npm run dev-server`*

```
PORT=3001 NODE_ENV=devserver npm start
```

> 浏览器输入下面连接访问,就可以达到浏览器自动刷新,尤其适合双屏开发，调整页面细节情况.

```
http://localhost:3001/    
```    


##约定
###目录结构
```
-assets
    -src
        -commpent           业务通用组件，工具类/业务无关的相关组件，统一写到framework/common中。
        -entry              项目入口文件
        -framework          框架，各位同学不要修改这个文件夹下面的代码，如果有bug，或者需求，向有关同学提出。
        -page               业务相关页面
            -MenusRouts.jsx 菜单及路由配置
    -package.json
    -READEME.md  
    -webpack.config.js              
```
> 每个页面为一个单独组件，统一放在page目录下,每个页面所用到的资源都放到一个文件夹下面,比如home

```
home
    -img
        -home.jpg
    -home.jsx    
    -style.less
```
###路由
> 后端所有的get请求最终没有被截获的，都打到index.html

```
node后端路由配置（routes.js）：
router.get('*', function (req, res, next) {
    res.render('index.html');
});
```
> 前端所有没有截获的path，都打到Error404组件。

```
详见Routes.jsx
```

> 页面跳转要使用Link，否则会跳出单页面应用。

```
import {Link} from 'react-router'
<Link to="/xxxxx">XXXXX</Link>
```

> 左侧导航菜单及路由配置在assets/src/page/MenusRouts.jsx中编辑

```
详见 左侧菜单写法
```
 
###左侧菜单写法：
> 左侧菜单和路由公用一个数据结构，直接在assets/src/page/MenusRouts.jsx编辑即可，通过相关方法直接可以转换生成菜单和相关路由。

```
/*
 * 左侧菜单与路由公用的数据
 * current：true/false 是否是当前菜单
 * path：对应地址
 * component：对应渲染的组件
 * */
var menusRouts = [
    {text: '表单校验', icon: 'fa-arrow-right', path: '/validation0', component: ValidationDemo},
    {text: '仪表盘', icon: 'fa-arrow-right', path: '/dashboard0', component: Dashboard},
    {
        text: '用户管理', icon: 'fa-th-list',
        children: [
            {text: '仪表盘', icon: 'fa-arrow-right', path: '/dashboard3', component: Dashboard},
            {text: '我的表单', icon: 'fa-arrow-right', path: '/myForm3', component: MyForm},
            {text: '用户查询', icon: 'fa-arrow-right', path: '/myTime3', component: MyTime}
        ]
    }
]
```

###地址栏与菜单自动关联
> 点击菜单时(或其他链接)，不需要绑定事件，直接通过Link走路由跳转，地址栏改变后，会出发相应函数，同步左侧菜单状态

```
browserHistory.listen(function (data) {
//细节参见 Routes.jsx
}}
```

###各个页面头部的写法：
####目前一共三种写法：

> 第一种，直接写jsx：

```
let pageHeader = <div>
    <h1 className="admin-page-header-title">Dashboard</h1>
    <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
        <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
        <Breadcrumb.Item>某应用</Breadcrumb.Item>
    </Breadcrumb>
</div>;
<Page header={pageHeader}>
    ...
</Page>
```

> 第二种，js对象：

```
let pageHeader = {
    title: '表单校验', // 缺省将不显示标题；'auto' 将会根据左侧导航，自动获取当前菜单名作为标题
    breadcrumbItems: [// 缺省将不显示面包屑导航； 'auto' 将会根据左侧导航，自动获取当前菜单展开状态作为面包屑导航。
        {text: '某应用'},
        {text: '我的时间', path: '/myTime3'},
        {text: '表单校验'}
    ]
};  
<Page header={pageHeader}>
    ...
</Page>
```

> 第三种，根据左侧菜单自动获取：

```
<Page header='auto'>
    ...
</Page>
```

###页面加载状态切换
> 传给Page loading（true/false）属性即可

```
<Page loading={this.state.loading}>
    ...
</Page>
```
###进场动画
> Page组件中有默认进场动画，各个页面可以自定义进场动画

```
let animConfig = [
            {opacity: [1, 0], translateX: [0, 50]},
            {opacity: [1, 0], translateX: [0, -50]}
        ];
<Page animConfig={animConfig}>
    ...
</Page>
```

##待解决问题
- react react-dom antd 做成全局，节省打包时间。
- ajax封装，使用promise模式。
- 框架级的东西，单独打包成一个组件，也通过npm方式安装，提高各个项目之间的通用性。方便统一维护。 done 架构相关代码暂时先区分到了同一个目录下。
- 表单校验 done 官网有提供
- 执行构建有些慢 done 构建慢一般可以接受，watch速度还是可以的。
- 根据地址定位左侧菜单 目前使用全局持有菜单句柄的方法，有点恶心，有没有好一点的方法？ done
- 根据左侧菜单修改右上角对应的面包屑 done 
- 由于这个是一个单页面应用,从新发送ajax请求的时候,一些ajax请求需要被打断,否则用户网络情况不好,点击了多个按钮,最终不能确定哪个ajax会被执行,会导致页面错乱问题. done
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
- 前端代码生成工具，主要针对CRUD页面。    
    
##报错
```
webpack.config.js中使用argv报错：
Option '-d' not supported. Trigger 'webpack -h' for more details.
目前自己写了个循环处理传入的参数
```
