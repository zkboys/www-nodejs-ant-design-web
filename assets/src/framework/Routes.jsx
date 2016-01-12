import React from 'react';
import {Router} from 'react-router'
import {menuRouts, openAll} from './MenusRouts'
import App from './app/App'
import Home from './home/Home'
import Sidebar from './sidebar/Sidebar'
import Error404 from './error/Error404'
import Settings from './system/Settings'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {otherRoutes} from '../page/MenusRouts'
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
routes.childRoutes.concat(otherRoutes);
/*
* 所有未截获的请求,统一跳转到Error404组件
* */
routes.childRoutes.push(
    {path: '/system/settings', component: Settings},
    {path: '*', component: Error404}
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
    for (let i = 0; i < menuRouts.length; i++) {
        let menu = menuRouts[i];
        if (openAll && menu.parentKeys) {
            openKeys.push(...menu.parentKeys);
        }
        if (menu.path == data.pathname) {
            let m = menuRouts[i];
            current = m.key;
            if (!openAll) {
                openKeys = m.parentKeys;
            }
        }
    }
    if (Sidebar.getSidebarStatus() === 'ok') {
        setSidebarState()
    } else {
        /*
         * 更改左侧菜单状态。
         * 页面首次进入或F5刷新时,由于sidebar还没渲染,无法更改状态,这里使用一个定时任务.
         * */
        setTimeout(function () {
            setSidebarState()
        }, 0);
    }
    function setSidebarState() {
        /*
         * 匹配到左侧菜单，则改变菜单状态，没有匹配到，则保留菜单状态。首页除外
         * TODO: 匹配算法要优化一下，比如/system/userlist/update，这个要匹配到userlist菜单，并设置状态。
         * TODO: 连父级菜单都没有匹配到的，直接将所有菜单收起
         * */
        if (current || data.pathname === '/') {
            Sidebar.setSidebarState({
                current: current,
                openKeys: Array.from(new Set(openKeys))// 去重
            });
        }
    }
});
export default React.createClass({
    render() {
        return (
            <Router routes={routes} history={browserHistory}/>
        );
    }
});