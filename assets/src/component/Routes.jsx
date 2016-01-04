import React from 'react';
import { Router} from 'react-router'
import {MenuRouts} from './MenusAndRouts'
import App from '../component/App'
import Home from '../component/home/Home'
import Error404 from '../component/error/Error404'
import createBrowserHistory from 'history/lib/createBrowserHistory'
const browserHistory = createBrowserHistory();
var menuRouts = MenuRouts.routs;
var oriMenus = MenuRouts.oriMenus;
/*
 * 监听地址栏改变
 * 可以用来处理左侧菜单状态 怎么作?
 * */
browserHistory.listen(function (data) {
    for (var i = 0; i < oriMenus.length; i++) {
        if ('/' + oriMenus[i].path == data.pathname) {
            var menu = oriMenus[i];
            var paths = [];
            var current = menu.key;
            while (true) {
                var isFind = false;
                for (var i = 0; i < oriMenus.length; i++) {
                    if (oriMenus[i].key == menu.parentKey) {
                        paths.push(oriMenus[i].key);
                        menu = oriMenus[i];
                        isFind = true;
                        break;
                    }
                }
                if (!isFind) {
                    break;
                }
            }
            /*
             * 页面首次进入(F5刷新时,由于sidebar还没渲染,无法更改状态,这里使用一个定时任务.)
             * */
            var t = setInterval(function () {
                if (_sidebar) {
                    _sidebar.setState({
                        current: current,
                        openKeys: paths
                    });
                    clearInterval(t);
                }
            }, 100);
            break;// if find de menu break the loop
        }
    }
});
const routes = {
    path: '/',
    component: App,
    indexRoute: {component: Home},
    childRoutes: menuRouts
};
/*其他路由在下面加入*/
routes.childRoutes.push(
    {path: 'home', component: Home},
    {path: '*', component: Error404}//所有未截获的请求,统一跳转到Error404组件
);

export default React.createClass({
    render() {
        return (
            <Router routes={routes} history={browserHistory}/>
            //<Router routes={routes}/>
        );
    }
});