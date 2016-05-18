import React from 'react';
import {Link} from 'react-router'
import assign from 'object-assign';
import {Menu, Tooltip, Icon} from 'antd';
import FAIcon from '../../component/faicon/FAIcon';
import Settings from './../settings/Settings';
import menus from '../menus';
import {getCurrentHeaderMenuByUrl} from '../header/HeaderMenuUtil'

const SubMenu = Menu.SubMenu;

function getCurrentSidebarMenu() {
    let currentPath = location.pathname;
    let headMenu = getCurrentHeaderMenuByUrl();
    let menusTree = convert(menus, headMenu);
    while (menusTree && menusTree.length) {
        // 处理一个，头部弹出一个。
        let node = menusTree.shift();
        if (node.path == currentPath) {
            return node;
        }
        if (node.children) {
            node.children.forEach((v)=> {
                menusTree.push(v);
            })
        }
    }
}
function getSidebarMenus() {
    let headMenu = getCurrentHeaderMenuByUrl();
    if (!headMenu) {
        return []
    }
    let menusTree = convert(menus, headMenu);
    return menusTree && menusTree.map(getMenuJsx);
}

/*
 *前台构造树方法。
 *rows:树所需的基本数据。
 *parentKey: 可选，根据给定的parentKey获取对应的子菜单。
 */
function convert(rows, parentNode) {
    // 这个函数会被多次调用，对rows做深拷贝，否则会产生副作用。
    rows = rows.map((row)=> {
        return assign({}, row);
    });
    parentNode = assign({}, parentNode);

    let nodes = [];
    if (parentNode) {
        nodes.push(parentNode);
    } else {
        // 获取所有的顶级节点
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (!hasParent(rows, row.parentKey)) {
                nodes.push(row);
            }
        }
    }

    // 存放要处理的节点
    let toDo = nodes.map((v)=>v);

    while (toDo.length) {

        // 处理一个，头部弹出一个。
        let node = toDo.shift();
        // 获取子节点。
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (row.parentKey == node.key) {
                let child = row;
                let parentKeys = [node.key];
                if (node.parentKeys) {
                    parentKeys = node.parentKeys.concat(node.key)
                }
                child.parentKeys = parentKeys;
                let parentText = [node.text];
                if (node.parentText) {
                    parentText = node.parentText.concat(node.text)
                }
                child.parentText = parentText;

                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }

                // child加入toDo，继续处理
                toDo.push(child);
            }
        }
    }
    function hasParent(rows, parentKey) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].key == parentKey) return true;
        }
        return false;
    }

    if (parentNode) {
        return nodes[0].children;
    }
    return nodes;
}

function getMenuJsx(node) {
    const min = !!Settings.collapseSidebar();
    const key = node.key;
    const path = node.path;
    const icon = node.icon;
    const text = node.text;
    if (node.children) {
        return (
            <SubMenu key={key} title={<span><FAIcon type={icon} /><span>{text}</span></span>}>
                {node.children.map(getMenuJsx)}
            </SubMenu>
        );
    } else {
        let item = <Link to={path} activeClassName="active"><FAIcon type={icon}/><span>{text}</span></Link>;
        if (min && node.parentKeys.length === 1) { // FIXME 这个判断有些不好。
            item =
                <Tooltip placement="right" title={<Link to={path} activeClassName="active" style={{color:'#fff'}}><span>{text}</span></Link>}>
                    <Link to={path} activeClassName="active">
                        <FAIcon type={icon}/><span>{text}</span>
                    </Link>
                </Tooltip>;
        }
        return (
            <Menu.Item key={key}>
                {item}
            </Menu.Item>
        );
    }
}

export {getSidebarMenus, getCurrentSidebarMenu}