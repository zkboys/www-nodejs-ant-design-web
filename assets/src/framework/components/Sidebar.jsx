import React from 'react';
import { Menu} from 'antd';
import {Link} from 'react-router'
import FAIcon from '../faicon/FAIcon';
const SubMenu = Menu.SubMenu;
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    handleToggle = (info)=> {
        this.props.onToggle(info);
    };
    render() {
        const {
            sidebarStyle,
            sidebarInnerStyle,
            sidebarMode
            } = this.props.style;
        const {
            openKeys,
            selectedKeys,
            items
            } = this.props.sidebar;
        return (
            <div className="admin-sidebar" style={sidebarStyle}>
                <div className="admin-sidebar-inner" style={sidebarInnerStyle}>
                    <Menu
                        openKeys={openKeys}
                        selectedKeys={[selectedKeys]}
                        onOpen={this.handleToggle}
                        onClose={this.handleToggle}
                        mode={sidebarMode}>
                        {buildSidebarMenu(items)}
                    </Menu>
                </div>
            </div>
        );
    }
}

/*
 * 基于树状结构的菜单数据,构造出对应jsx数据
 * */
function buildSidebarMenu(menuData) {
    if (!menuData) {
        return [];
    }
    function covertMenuFromData(menuData, parent) {
        parent = parent || {
                key: '0',
                parentKeys: [],//地址栏改变时，用于同步左侧菜单状态
                parentText: [],//当page的header为auto时，用来设置头部的面包屑导航。
                subMenus: []
            };
        for (let i = 0; i < menuData.length; i++) {
            var menu = menuData[i];
            menu.key = parent.key + '-' + i;
            menu.parentKeys = [...parent.parentKeys, parent.key];
            menu.parentText = parent.text ? [...parent.parentText, parent.text] : [...parent.parentText];
            if (menu.children) {
                menu.subMenus = [];
                let text = menu.text;
                parent.subMenus.push(
                    <SubMenu key={menu.key} title={<span><FAIcon type={menu.icon} />{text}</span>}>
                        {menu.subMenus}
                    </SubMenu>
                );
                covertMenuFromData(menu.children, menu);
            } else {
                parent.subMenus.push(
                    <Menu.Item key={menu.key}>
                        <Link to={menu.path} activeClassName="active"><FAIcon type={menu.icon}/>{menu.text}</Link>
                    </Menu.Item>
                );
            }
        }
        return parent.subMenus;
    }

    return covertMenuFromData(menuData);
}

export default Sidebar;
