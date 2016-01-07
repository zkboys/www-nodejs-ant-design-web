import React from 'react';
import { Menu, Icon } from 'antd';
import FAIcon from './faicon/FAIcon';
import {Link} from 'react-router'
const SubMenu = Menu.SubMenu;
import MyForm from '../component/myform/MyForm'
import Dashboard from '../component/dashboard/Dashboard'
import MyTime from '../component/mytime/MyTime'
import ValidationDemo from '../component/validation-demo/ValidationDemo'
/*
 * 菜单是否全部展开
 * */
const _openAll = false;
/*
 * 左侧菜单与路由公用的数据 树形结构
 * current：true/false 是否是当前菜单
 * path：对应地址
 * component：对应渲染的组件
 * */
var menusRouts = [
    {text: '表单校验', icon: 'fa-arrow-right', path: '/validation0', component: ValidationDemo},
    {text: '仪表盘22222', icon: 'fa-arrow-right', path: '/dashboard0', component: Dashboard},
    {
        text: '用户列表', icon: 'fa-th-list',
        children: [
            {text: '仪表盘', icon: 'fa-arrow-right', path: '/dashboard3', component: Dashboard},
            {text: '我的表单', icon: 'fa-arrow-right', path: '/myForm3', component: MyForm},
            {text: '我的时间', icon: 'fa-arrow-right', path: '/myTime3', component: MyTime}
        ]
    },
    {
        text: '我的', icon: 'fa-user',
        children: [
            {text: '我的邮件', icon: 'fa-arrow-right', path: '/dashboard4', component: Dashboard},
            {text: '我的提醒', icon: 'fa-arrow-right', path: '/myForm4', component: MyForm},
            {text: '个人设置', icon: 'fa-arrow-right', path: '/myTime4', component: MyTime}
        ]
    },
    {
        text: '主面板', icon: 'fa-tachometer',
        children: [
            {text: '表单校验', icon: 'fa-arrow-right', path: '/validation', component: ValidationDemo},
            {text: '仪表盘', icon: 'fa-arrow-right', path: '/dashboard1', component: Dashboard},
            {
                text: '二级级导航', icon: 'fa-th-list',
                children: [
                    {text: '我的表单', icon: 'fa-arrow-right', path: '/myForm1', component: MyForm},
                    {text: '我的时间', icon: 'fa-arrow-right', path: '/myTime1', component: MyTime},
                    {
                        text: '三级导航', icon: 'fa-th-list',
                        children: [
                            {text: '我的表单444', icon: 'fa-arrow-right', path: '/myForm14', component: MyForm},
                            {text: '我的时间444', icon: 'fa-arrow-right', path: '/myTime14', component: MyTime}
                        ]
                    }
                ]
            }
        ]
    },
    {
        text: '商务查询', icon: 'fa-binoculars',
        children: [
            {text: '仪表盘222', icon: 'fa-arrow-right', path: '/dashboard2', component: Dashboard},
            {
                text: '二级导航222', icon: 'fa-th-list',
                children: [
                    {text: '我的表单', icon: 'fa-arrow-right', path: '/myForm2', component: MyForm},
                    {text: '我的时间', icon: 'fa-arrow-right', path: '/myTime2', component: MyTime}
                ]
            }
        ]
    }
];
let routs = [];
let current = '';
let openKeys = [];
let maxMenus = {
    key: '0',
    parentKeys: [],
    subMenus: []
};
let minMenus = {
    key: '0',
    parentKeys: [],
    subMenus: []
};

function convertMenus(_menusRouts, parent, min) {
    for (let i = 0; i < _menusRouts.length; i++) {
        var menu = _menusRouts[i];
        menu.key = parent.key + '-' + i;
        menu.parentKeys = [...parent.parentKeys, parent.key];
        if (menu.current) {
            current = menu.key;
            if (!_openAll) {
                openKeys = menu.parentKeys;
            }
        }
        if (menu.children) {
            if (_openAll) {
                openKeys.push(menu.key);
            }
            menu.subMenus = [];
            let text = min && parent.key === '0' ? '' : menu.text;
            parent.subMenus.push(
                <SubMenu key={menu.key} title={<span><FAIcon type={menu.icon} />{text}</span>}>
                    {menu.subMenus}
                </SubMenu>
            );
            convertMenus(menu.children, menu, min);
        } else {
            let text = min && parent.key === '0' ? menu.text[0] : menu.text;
            parent.subMenus.push(
                <Menu.Item key={menu.key}>
                    <Link to={menu.path} activeClassName="active"><FAIcon type={menu.icon}/>{text}</Link>
                </Menu.Item>
            );
            routs.push(menu);
        }
    }
}
convertMenus(menusRouts, maxMenus);
convertMenus(menusRouts, minMenus, true);
export var menuRouts = routs;
export var openAll = _openAll;
export function getMenus(min) {
    return {
        current,
        openKeys,
        menus: min ? minMenus.subMenus : maxMenus.subMenus
    };
}

