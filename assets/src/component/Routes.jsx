import React from 'react';
import { Router} from 'react-router'
import MenusAndRouts from './sildebarMenus'
import App from '../component/App'
import Home from '../component/home/Home'
import createBrowserHistory from 'history/lib/createBrowserHistory'
const browserHistory = createBrowserHistory();
var menuRouts = MenusAndRouts.getRouts().routs;
var oriMenus = MenusAndRouts.getRouts().oriMenus;
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
            if (_sidebar) {
                _sidebar.setState({
                    current: current,
                    openKeys: paths
                });
            }
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
/*

 routes.childRoutes.push(
 {path: 'about', component: About},
 {path: 'inbox', component: Inbox}
 );
 */


export default React.createClass({
    render() {
        return (
            <Router routes={routes} history={browserHistory}/>
            //<Router routes={routes}/>
        );
    }
});