import { combineReducers } from 'redux'
import assign from 'object-assign'
import headerMenus from './HeaderMenus'
import Settings from './settings/Settings'
import {
    TOGGLE_SIDEBAR,
    SET_HEADER_CURRENT_MENU,
    SET_SIDEBAR_MENUS,
    SET_SIDEBAR_MENU_STATUS
} from './actions';

let minLogo = 'super',
    maxLogo = '超级管理系统',
    maxWidth = 240,
    minWidth = 60,
    scrollBarWidth = getScrollBarWidth(),
    isSidebarCollapsed = Settings.collapseSidebar(),
    style = {}
    ;

if (isSidebarCollapsed) {
    style = {
        headerLogoWidth: minWidth,
        headerLogo: minLogo,
        sidebarStyle: {width: minWidth, overflow: 'visible'},
        sidebarInnerStyle: {width: minWidth, overflowY: 'hidden'},
        sidebarMode: 'vertical',
        centerLeft: minWidth,
        isSidebarCollapsed
    }
} else {
    style = {
        headerLogoWidth: maxWidth,
        headerLogo: maxLogo,
        sidebarStyle: {width: maxWidth, overflow: 'hidden'},
        sidebarInnerStyle: {width: (maxWidth + scrollBarWidth), overflowY: 'scroll'},
        sidebarMode: 'inline',
        centerLeft: maxWidth,
        isSidebarCollapsed
    }
}
let defaultState = {
    style,
    headerNav: {
        current: '1',
        items: headerMenus
    },
    sidebar: {
        openKeys: [],
        selectedKeys: '',
        mode: '',
        items: []
    }
};

function getScrollBarWidth() {
    var scrollDiv = document.createElement('div');
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth
}

export default combineReducers({

    style(state = defaultState.style, action){
        switch (action.type) {
            case TOGGLE_SIDEBAR :// 展开收起左侧菜单栏
                let isSidebarCollapsed = !state.isSidebarCollapsed;
                Settings.collapseSidebar(isSidebarCollapsed);
                return assign({}, state, {
                    isSidebarCollapsed,
                    'headerLogo': isSidebarCollapsed ? minLogo : maxLogo,
                    'headerLogoWidth': isSidebarCollapsed ? minWidth : maxWidth,
                    'centerLeft': isSidebarCollapsed ? minWidth : maxWidth,
                    'sidebarStyle': isSidebarCollapsed ? {width: minWidth, overflow: 'visible'} : {width: maxWidth, overflow: 'hidden'},
                    'sidebarInnerStyle': isSidebarCollapsed ? {width: minWidth, overflowY: 'visible'} : {width: maxWidth + scrollBarWidth, overflowY: 'scroll'},
                    'sidebarMode': isSidebarCollapsed ? 'vertical' : 'inline'
                });
            default:
                return state
        }
    },

    headerNav(state = defaultState.headerNav, action){
        switch (action.type) {
            case SET_HEADER_CURRENT_MENU ://设置头部菜单选中状态
                return assign({}, state, {
                    current: action.current
                });
            default:
                return state
        }
    },

    sidebar(state = defaultState.sidebar, action){
        switch (action.type) {
            case SET_SIDEBAR_MENUS :// 设置左侧菜单内容
                return assign({}, state, {
                    items: action.menus
                });
            case SET_SIDEBAR_MENU_STATUS://设置左侧菜单状态，展开状态以及选中状态
                return assign({}, state, {
                    openKeys: action.status.openKeys,
                    selectedKeys: action.status.selectedKeys
                });
            default:
                return state
        }
    }
})