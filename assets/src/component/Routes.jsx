import React from 'react';
import {Router} from 'react-router'
import {menuRouts, oriMenus} from './MenusAndRouts'
import App from '../component/App'
import Home from '../component/home/Home'
import Sidebar from '../component/sidebar/Sidebar'
import Error404 from '../component/error/Error404'
import createBrowserHistory from 'history/lib/createBrowserHistory'
const browserHistory = createBrowserHistory();
/*
 * 根据菜单数据，初始化路由
 * */
const routes = {
    path: '/',
    component: App,
    indexRoute: {component: Home},
    childRoutes: menuRouts
};
/*
 * 其他路由在下面加入
 * */
routes.childRoutes.push(
    {path: 'home', component: Home},
    {path: '*', component: Error404}//所有未截获的请求,统一跳转到Error404组件
);
/*
 * 监听地址栏改变，通过左侧菜单状态
 * */
browserHistory.listen(function (data) {
    var openKeys = [];
    var current = '';
    /*
     * 根据地址栏确定左侧菜单状态
     * */
    for (let i = 0; i < oriMenus.length; i++) {
        if (oriMenus[i].path == data.pathname) {
            var menu = oriMenus[i];
            current = menu.key;
            while (true) {
                var isContinueFind = false;
                for (let j = 0; j < oriMenus.length; j++) {
                    if (oriMenus[j].key == menu.parentKey) {
                        openKeys.push(oriMenus[j].key);
                        menu = oriMenus[j];
                        isContinueFind = true;
                        break;
                    }
                }
                if (!isContinueFind) {
                    break;
                }
            }
            break;// if find de menu break the loop
        }
    }
    /*
     * 更改左侧菜单状态。
     * 页面首次进入或F5刷新时,由于sidebar还没渲染,无法更改状态,这里使用一个定时任务.
     * */
    var t = setInterval(function () {
        if (Sidebar) {
            Sidebar.setSidebarState({
                current: current,
                openKeys: openKeys
            });
            clearInterval(t);
        }
    }, 100);
});
export default React.createClass({
    render() {
        return (
            <Router routes={routes} history={browserHistory}/>
        );
    }
});