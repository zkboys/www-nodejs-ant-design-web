import React from 'react';
import FAIcon from './faicon/FAIcon';
import {Link} from 'react-router'
import {Menu, Tooltip} from 'antd';
import Settings from './Settings'
const SubMenu = Menu.SubMenu;
/*
 * 获取左侧菜单jsx数据,可以用于直接显示.
 * */
export let getSidebarMenus = function () {
    let [minSidebarMenu, maxSidebarMenu] = getMenusData();
    let min = Settings.collapseSidebar() ? true : false;
    minSidebarMenu = minSidebarMenu || [];
    maxSidebarMenu = maxSidebarMenu || [];
    return min ? minSidebarMenu : maxSidebarMenu;
};
/*
 * 获取要设为当前状态的做的菜单数据.
 * */
export let getCurrentSidebarMenu = function () {
    let defaultMenuData = {
        key: '',
        text: '',
        path: '',
        openKeys: []
    };
    let [, , simpleMenuData] = getMenusData();


    if (!simpleMenuData) {
        return defaultMenuData;
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
        currentMenu.openKeys = Array.from(new Set(openKeys))
    }
    if (!currentMenu) {
        return defaultMenuData;
    }
    return currentMenu;
};
/*
 * 获取菜单数据,数据来源可以是服务器,可以在这里硬编码
 * return:
 *   minSidebarMenu: 收缩时菜单数据 jsx
 *   maxSidebarMenu: 展开时菜单数据 jsx
 *   simpleMenuData: 菜单数据扁平化结构,非树状结构. js
 *
 * */
function getMenusData() {

    /*
     * 根据 headerMenuCurrent，获取对应的左侧菜单。
     *
     * */
    let sidebarMenuData = {
        'shop': [
            {text: '表单校验11111', icon: 'fa-arrow-right', path: '/shop/MyForm'},
            {
                text: '店铺管理', icon: 'fa-th-list',
                children: [
                    {text: '仪表盘1111', icon: 'fa-arrow-right', path: '/shop/Dashboard'},
                    {text: '我的时间111', icon: 'fa-arrow-right', path: '/shop/MyTime'},
                    {text: '校验demo111', icon: 'fa-arrow-right', path: '/shop/ValidationDemo'}
                ]
            }

        ],
        'service': [
            {text: '表单校验11111', icon: 'fa-arrow-right', path: '/service/MyForm'},
            {text: '仪表盘1111', icon: 'fa-arrow-right', path: '/service/Dashboard'},
            {text: '我的时间111', icon: 'fa-arrow-right', path: '/service/MyTime'},
            {text: '校验demo111', icon: 'fa-arrow-right', path: '/service/ValidationDemo'}
        ],
        'expressage': [
            {text: '表单校验11111', icon: 'fa-arrow-right', path: '/expressage/MyForm'},
            {text: '仪表盘1111', icon: 'fa-arrow-right', path: '/expressage/Dashboard'},
            {text: '我的时间111', icon: 'fa-arrow-right', path: '/expressage/MyTime'},
            {text: '校验demo111', icon: 'fa-arrow-right', path: '/expressage/ValidationDemo'}
        ],
        'system': [
            {text: '系统设置', icon: 'fa-cogs', path: '/system/settings'},
            {
                text: '我的邮件', icon: 'fa-envelope-o',
                children: [
                    {text: '未读邮件', icon: 'fa-arrow-right', path: '/system/mail/unread'},
                    {text: '已读邮件', icon: 'fa-arrow-right', path: '/system/mail/read'}
                ]
            },
            {text: '我的提醒', icon: 'fa-bell-o', path: '/system/remind'},
            {
                text: '个人设置', icon: 'fa-envelope-o',
                children: [
                    {text: '修改个人信息', icon: 'fa-arrow-right', path: '/system/profile/message'},
                    {text: '修改密码', icon: 'fa-arrow-right', path: '/system/profile/password'}
                ]
            }
        ]
    };
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
                            <Tooltip placement="right" title={<Link to={menu.path} activeClassName="active" style={{color:'#fff'}}>{menu.text}</Link>}>
                                <Link to={menu.path} activeClassName="active"><FAIcon type={menu.icon}/>{menu.text[0]}</Link>
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