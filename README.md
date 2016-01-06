# www-nodejs-ant-design-web
*node.js 结合ant.design demo项目*
##安装&启动
###安装依赖
> npm install 

###指定端口 启动模式
> PORT=1234 NODE_ENV=test npm start

###自动重启
####全局安装supervisor
> sudo npm install -g supervisor

*如果安装成功了，但是命令还是不可用，可能由于nmp没有设置好，运行如下命令，创建一个软连接：*
> *sudo ln -s /usr/local/srv/node-v5.0.5-linux-x64/bin/supervisor /usr/bin/supervisor*

####启动
> npm run dev
或
> supervisor -w ./app,./configs run.js 
> PORT=1234 NODE_ENV=test supervisor -w ./app,./configs run.js

*-w 参数为逗号分割的文件或路径，当这里的文件改变，将自动重启app.js,这里监听的是app目录和configs目录*

##项目中使用的技术/框架
TODO 把对应的官网网址写到下面。

- nodejs
- express
- mongoDB
- ant.design
- React
- React Router
- webpack

##纠结的问题
- 所有的文件命名用不用都加后缀？user_dao.js  user_controller.js user_model.js

前端相关说明请参见:assets/README.md

