import {combineReducers} from 'redux'
import assign from 'object-assign'
import headerMenus from './header/HeaderMenus'
import sidebarMenus from './sidebar/SidebarMenus';
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
    collapsedStyle = {//收起的
        headerLogoWidth: minWidth,
        headerLogo: minLogo,
        sidebarStyle: {width: minWidth, overflow: 'visible'},
        sidebarInnerStyle: {width: minWidth, overflow: 'visible'},
        sidebarMode: 'vertical',
        centerLeft: minWidth,
        isSidebarCollapsed: true
    },
    expandedStyle = {//展开的
        headerLogoWidth: maxWidth,
        headerLogo: maxLogo,
        sidebarStyle: {width: maxWidth, overflow: 'hidden'},
        sidebarInnerStyle: {width: (maxWidth + scrollBarWidth), overflowY: 'scroll'},
        sidebarMode: 'inline',
        centerLeft: maxWidth,
        isSidebarCollapsed: false
    }
    ;

let defaultState = {
    style: isSidebarCollapsed ? collapsedStyle : expandedStyle,
    headerNav: {
        current: '1',
        items: headerMenus
    },
    sidebar: {
        hidden: false,
        openKeys: [],
        selectedKeys: '',
        mode: '',
        items: []
    }
};

export default combineReducers({

    style(state = defaultState.style, action){
        switch (action.type) {
            case TOGGLE_SIDEBAR :// 展开收起左侧菜单栏
                Settings.collapseSidebar(!state.isSidebarCollapsed);
                return assign({}, state, !state.isSidebarCollapsed ? collapsedStyle : expandedStyle);
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
                if (!action.currentHeaderMenu) {
                    return assign({}, state, {
                        hidden: true
                    });
                }
                return assign({}, state, {
                    hidden: false,
                    items: sidebarMenus[action.currentHeaderMenu]
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
});


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