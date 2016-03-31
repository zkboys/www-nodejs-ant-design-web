export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR ';
export const SET_HEADER_CURRENT_MENU = 'SET-HEADER-CURRENT-MENU ';
export const SET_SIDEBAR_MENUS = 'SET_SIDEBAR_MENUS';
export const SET_SIDEBAR_MENU_STATUS = 'SET_SIDEBAR_MENU_STATUS';



export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR
    }
}
export function setHeaderCurrentMenu(current) {
    return {
        type: SET_HEADER_CURRENT_MENU,
        current
    }
}


export function setSidebarMenus(menus) {
    return {
        type: SET_SIDEBAR_MENUS,
        menus
    }
}
export function setSidebarMenuStatus(status) {
    return {
        type: SET_SIDEBAR_MENU_STATUS,
        status
    }
}
