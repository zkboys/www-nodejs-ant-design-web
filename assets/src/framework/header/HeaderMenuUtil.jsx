import headMenus from './HeaderMenus';
/*
 * 获取头部需要设为当前状态的菜单数据.
 * */
export let getCurrentHeaderMenuByUrl = function () {
    let pathNames = location.pathname.split('/');
    let headerMenuCurrent = null;
    if (pathNames && pathNames.length > 0) {
        headerMenuCurrent = pathNames[1];
    }
    for (let i = 0; i < headMenus.length; i++) {
        if (headerMenuCurrent == headMenus[i].key) {
            return headMenus[i]
        }
    }
    return null
};