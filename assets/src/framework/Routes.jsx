import React from 'react';
import {Router, Link} from 'react-router'
import {Menu, Tooltip} from 'antd';
import FAIcon from './faicon/FAIcon';
import App from './app/App'
import Home from '../page/home/Home'
import Error404 from './error/Error404'
import SettingsPage from './system/SettingsPage'
import createBrowserHistory from 'history/lib/createBrowserHistory'
const browserHistory = createBrowserHistory();
import PubSubMsg from './common/pubsubmsg';
import {getSidebarMenus, getCurrentSidebarMenu} from './SidebarMenu';
import {getHeaderMenus} from './HeaderMenu';
import pageRouts from '../page/Routes';
/*
 * 根据菜单数据，初始化路由
 * */
const routes = {
    path: '/',
    component: App,
    indexRoute: {component: Home},
    childRoutes: pageRouts
};
/*
 * 所有未截获的请求,统一跳转到Error404组件
 * */
routes.childRoutes.push(
    {path: '/system/settings', component: SettingsPage},
    {path: '*', component: Error404}
);
/*
 * 监听地址栏改变，通过左侧菜单状态
 * */
browserHistory.listen(function (data) {
    let [headerMenu, headerMenuCurrent] = getHeaderMenus();
    PubSubMsg.publish('header-menu', {
        menu: headerMenu,
        current: headerMenuCurrent
    });
    let sidebarMenus =getSidebarMenus();
    let  currentSidebarMenu = getCurrentSidebarMenu();
    PubSubMsg.publish('sidebar-menu', {
        menu: sidebarMenus,
        current: currentSidebarMenu.key,
        openKeys: currentSidebarMenu.openKeys
    });
    PubSubMsg.publish('set-header-breadcrumb')
});

export default React.createClass({
    render() {
        return (
            <Router routes={routes} history={browserHistory}/>
        );
    }
});