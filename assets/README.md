# antd-demo

## Environment

```
node >= ^4.X
```

## Code Style

https://github.com/airbnb/javascript

## Develop

```
npm run dev
```

*端口可以在package.json中修改*
访问 http://127.0.0.1:8000 

## Build

```
npm run build
```
修改build生成文件目录,编辑webpack.config.js文件:

```
var path = require("path");
webpackConfig.output.path = path.join(__dirname, '../public');
```

*细节请参考[atool-build官网](https://github.com/ant-tool/atool-build)*


前端相关目录
app/views html模版目录
assets 前端开发目录,除去html文件其他前端资源.
assets/node_modules npm安装的第三方插件
assets/src 本项目开发目录
assets/src/common 各个页面通用组件
assets/src/(contact||index||service) 各个模块组件

结合后端模版语言开发:
html文件写在app/views中
assets目录编写js css等
在assets目录中执行:npm run build-watch检测文件,自动构建.
后端项目整体启动,就可以进行开发了.



assets目录中可以写静态html文件,方便前端单独开发调试
比如:assets/src/contact 中contact.html,
执行npm run dev后,可以通过http://127.0.0.1:8000/src/contact/contact.html访问
contact.html中的js,css等资源,直接从assets目录写起.(我并没有找到对应资源在哪儿.这个资源跟public中的无关,可以理解为一一对应.) 


##前端开发约定:

一个功能模块下的前端资源(html,less,jsx,img)都放入相应目录下(assets/src/user/,app/views/user)

好处:

每个功能模块对应的资源都在对应的文件夹下,方便查找维护,以后需要删除,删除整个文件夹即可.

- html命名规则为:目录名-功能.html
> user-add.html

- less命名规则为:目录名.less
> user.less //less就建一个就可以,模块下各个功能页面公用一个

- jsx命名规则为:目录名-功能.jsx
> user-add.jsx

比如:user

> 
> app/views/user

> app/views/user/user-add.html

> app/views/user/user-list.html

> app/views/user/user-detail.html

>
 
> assets/src/user

> assets/src/user/img

> assets/src/user/user-add.jsx

> assets/src/user/user-list.jsx

> assets/src/user/user-detail.jsx
> 


## 关于less的处理

如果统一放入 common/lib.jsx中,最终会统一打包到common.css中

如果对应模块单独引用,比如写到home.jsx中,会生成一个home.css,对应页面要单独引用.

目前采用单独引用方式

