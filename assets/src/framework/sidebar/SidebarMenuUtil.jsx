import React from 'react';
import FAIcon from '../../component/faicon/FAIcon';
import {Link} from 'react-router'
import {Menu, Tooltip} from 'antd';
import Settings from './../settings/Settings'
const SubMenu = Menu.SubMenu;
import sidebarMenuData from './SidebarMenus'
/*
 * 获取左侧菜单jsx数据,可以用于直接显示.
 * */
function getSidebarMenus() {
    let [minSidebarMenu, maxSidebarMenu] = getMenusData();
    let min = Settings.collapseSidebar() ? true : false;
    minSidebarMenu = minSidebarMenu || [];
    maxSidebarMenu = maxSidebarMenu || [];
    return min ? minSidebarMenu : maxSidebarMenu;
}
/*
 * 获取要设为当前状态的菜单数据.
 * */
function getCurrentSidebarMenu() {
    let [, , simpleMenuData] = getMenusData();
    if (!simpleMenuData) {
        return null;
    }
    let openAll = Settings.sidebarMenuAlwaysOpen();
    let openKeys = [];
    let currentMenu = null;
    for (let i = 0; i < simpleMenuData.length; i++) {
        let menu = simpleMenuData[i];
        if (openAll && menu.parentKeys) {
            openKeys.push(...menu.parentKeys);
        }
        if (menu.path == location.pathname) {
            let m = simpleMenuData[i];
            if (!openAll) {
                openKeys = m.parentKeys;
            }
            currentMenu = m;
            currentMenu.openKeys = openKeys;
        }
    }
    if (currentMenu) {//openKeys去重
        currentMenu.openKeys = arrayUnique(openKeys);
    }
    return currentMenu;
}
function createSidebarMenus(menuData) {
    return buildSidebarMenu(menuData)[0];
}

/*
 * 对象键值法(该方法性能最优)
 * @method 定义一个空对象和空新数组，遍历当前的数组，判断该对象是否存在数组的某一项，如果不存在
 * 就当当前的某一项存入新数组去，且当前的项置为-1 目的过滤掉重复的项
 */
function arrayUnique(arrs) {
    var newArrays = [];
    var hash = {};
    if (arrs.length > 0) {
        for (var i = 0, ilen = arrs.length; i < ilen; i += 1) {
            if (!hash[arrs[i]]) {
                hash[arrs[i]] = 1;
                newArrays.push(arrs[i]);
            }
        }
    }
    return newArrays;
}
/*
 * return:
 *   minSidebarMenu: 收缩时菜单数据 jsx
 *   maxSidebarMenu: 展开时菜单数据 jsx
 *   simpleMenuData: 菜单数据扁平化结构,非树状结构. js
 *
 * */
function getMenusData() {
    let pathNames = location.pathname.split('/');
    let headerMenuCurrent = null;
    if (pathNames && pathNames.length > 0) {
        headerMenuCurrent = pathNames[1];
    }
    let menuData = sidebarMenuData[headerMenuCurrent];
    let [minSidebarMenu] = buildSidebarMenu(menuData, true, location.pathname);
    let [maxSidebarMenu, simpleMenuData] = buildSidebarMenu(menuData, false, location.pathname);
    return [minSidebarMenu, maxSidebarMenu, simpleMenuData]
}
/*
 * 基于树状结构的菜单数据,构造出对应jsx数据一级扁平化数据
 * return:
 *   sidebarMenu: 收缩/展开时菜单数据 jsx
 *   simpleMenuData: 菜单数据扁平化结构,非树状结构. js
 *
 * */
function buildSidebarMenu(menuData, min) {
    /*
     * 菜单是否全部展开
     * */
    let simpleMenuData = [];
    if (!menuData) {
        return [];
    }
    function covertMenuFromData(menuData, min, parent) {
        parent = parent || {
                key: '0',
                parentKeys: [],//地址栏改变时，用于同步左侧菜单状态
                parentText: [],//当page的header为auto时，用来设置头部的面包屑导航。
                subMenus: []
            };
        for (let i = 0; i < menuData.length; i++) {
            var menu = menuData[i];
            simpleMenuData.push(menu);
            menu.key = parent.key + '-' + i;
            menu.parentKeys = [...parent.parentKeys, parent.key];
            menu.parentText = parent.text ? [...parent.parentText, parent.text] : [...parent.parentText];
            if (menu.children) {
                menu.subMenus = [];
                let text = min && parent.key === '0' ? '' : menu.text;
                parent.subMenus.push(
                    <SubMenu key={menu.key} title={<span><FAIcon type={menu.icon} />{text}</span>}>
                        {menu.subMenus}
                    </SubMenu>
                );
                covertMenuFromData(menu.children, min, menu);
            } else {
                if (min && parent.key === '0') {
                    parent.subMenus.push(
                        <Menu.Item key={menu.key}>
                            <Tooltip placement="right"
                                     title={<Link to={menu.path} activeClassName="active" style={{color:'#fff'}}>{menu.text}</Link>}>
                                <Link to={menu.path} activeClassName="active"><FAIcon type={menu.icon}/>{menu.text[0]}
                                </Link>
                            </Tooltip>
                        </Menu.Item>
                    );
                } else {
                    parent.subMenus.push(
                        <Menu.Item key={menu.key}>
                            <Link to={menu.path} activeClassName="active"><FAIcon type={menu.icon}/>{menu.text}</Link>
                        </Menu.Item>
                    );
                }
            }
        }
        return [parent.subMenus, simpleMenuData];
    }

    return covertMenuFromData(menuData, min);
}
export {getSidebarMenus,getCurrentSidebarMenu,createSidebarMenus}