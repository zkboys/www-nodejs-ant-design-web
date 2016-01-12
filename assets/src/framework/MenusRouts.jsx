import React from 'react';
import { Menu, Icon, Tooltip } from 'antd';
import FAIcon from './faicon/FAIcon';
import {Link} from 'react-router'
import {menusRouts} from '../page/MenusRouts'
const SubMenu = Menu.SubMenu;
/*
 * 菜单是否全部展开
 * */
const _openAll = false;
function getMenusAndRouts(_menusRouts, min, parent, routs, openKeys) {
    parent = parent || {
            key: '0',
            parentKeys: [],//地址栏改变时，用于同步左侧菜单状态
            parentText: [],//当page的header为auto时，用来设置头部的面包屑导航。
            subMenus: []
        };
    routs = routs || [];
    let current = '';
    openKeys = openKeys || [];
    for (let i = 0; i < _menusRouts.length; i++) {
        var menu = _menusRouts[i];
        menu.key = parent.key + '-' + i;
        menu.parentKeys = [...parent.parentKeys, parent.key];
        menu.parentText = parent.text ? [...parent.parentText, parent.text] : [...parent.parentText];
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
            getMenusAndRouts(menu.children, min, menu, routs, openKeys);
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
            routs.push(menu);
        }
    }
    return [parent, routs, current, openKeys];
}

let [minMenus] = getMenusAndRouts(menusRouts, true);
let [maxMenus, routs, current,openKeys] = getMenusAndRouts(menusRouts);
console.log(routs);
export var menuRouts = routs;
export var openAll = _openAll;
export function getMenus(min) {
    return {
        current,
        openKeys,
        menus: min ? minMenus.subMenus : maxMenus.subMenus
    };
}