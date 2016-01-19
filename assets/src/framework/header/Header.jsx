import './style.css';
import React from 'react';
import {Badge, Tooltip ,Menu} from 'antd';
import {Link} from 'react-router'
import FAIcon from '../faicon/FAIcon';
import Sidebar from '../sidebar/Sidebar';
import avatar from './86.jpg';
var logoMaxWidth = 240
    , logoMinWidth = 60
    , logoMax = "后台管理系统"
    , logoMin = "后台"
    ;
const Header = React.createClass({
    getInitialState(){
        return {
            menuData: [
                {
                    key: 'shop',
                    icon: 'fa-th-list',
                    text: '店铺',
                    path: ''
                },
                {
                    key: 'service',
                    icon: 'fa-th-list',
                    text: '服务',
                    path: ''
                },
                {
                    key: 'expressage',
                    icon: 'fa-th-list',
                    text: '快递',
                    path: ''
                }
            ],
            current: 'shop'
        };
    },
    covertMenu(menuData, min){
        /*
         * 菜单是否全部展开
         * */
        const _openAll = false;
        return covertMenuFromData(menuData, min);
        function covertMenuFromData(menuData, min, parent, openKeys) {
            parent = parent || {
                    key: '0',
                    parentKeys: [],//地址栏改变时，用于同步左侧菜单状态
                    parentText: [],//当page的header为auto时，用来设置头部的面包屑导航。
                    subMenus: []
                };
            let current = '';
            openKeys = openKeys || [];
            for (let i = 0; i < menuData.length; i++) {
                var menu = menuData[i];
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
                    covertMenuFromData(menu.children, min, menu, openKeys);
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
            //如果以后用到了初始化的current openKeys，在返回。
            //return [parent.subMenus, current, openKeys];
            return parent.subMenus;
        }
    },
    getMenusData(url){

        /*
         * 菜单原始数据，这个有啃能来自后端。
         * TODO 获取到了数据最好作一下缓存，否则有些地方（切换菜单状态按钮会调用到）
         *
         * */
        let menuData = {
            'shop': [
                {text: '表单校验11111', icon: 'fa-arrow-right', path: '/validation0'},
                {text: '仪表盘1111', icon: 'fa-arrow-right', path: '/dashboard0'}
            ],
            'service': [
                {text: '表单校验2222', icon: 'fa-arrow-right', path: '/validation0'},
                {text: '仪表盘22222', icon: 'fa-arrow-right', path: '/dashboard0'}
            ],
            'expressage': [
                {text: '表单校验3333', icon: 'fa-arrow-right', path: '/validation0'},
                {text: '仪表盘3333', icon: 'fa-arrow-right', path: '/dashboard0'}
            ]
        };

        return menuData[url];
    },
    handleClick(e) {
        console.log('click ', e);
        let key = e.key;
        let menus = this.covertMenu(this.getMenusData(key), this.props.collapse);//这里应该是请求菜单的url，暂时使用key模拟数据。
        Sidebar.setSidebarState({
            menus
        });
        this.setState({
            current: key
        });
    },
    buildMenu(){
        let menuData = this.state.menuData;
        let menuItems = [];
        for (let i = 0; i < menuData.length; i++) {
            let md = menuData[i];
            menuItems.push(
                <Menu.Item key={md.key}>
                    <FAIcon type={md.icon}/>
                    <span className="admin-header-sys-menu-text">{md.text}</span>
                </Menu.Item>
            );
        }
        return <Menu className="admin-header-sys" onClick={this.handleClick}
                     selectedKeys={[this.state.current]}
                     theme={this.state.theme}
                     mode="horizontal">
            {menuItems}
        </Menu>
    },
    render() {
        return (
            <header className="admin-header">
                <div className="admin-logo" style={{width:this.props.collapse?logoMinWidth:logoMaxWidth}}><Link to="/">{this.props.collapse ? logoMin : logoMax}</Link></div>
                <Tooltip placement="right" title="切换菜单状态">
                    <a className="admin-sidebar-toggle" onClick={this.props.handelClick}><FAIcon type="fa-bars"/></a>
                </Tooltip>
                {this.buildMenu()}
                <ul className="admin-header-menu">
                    <li className="admin-header-menu-item">
                        <Tooltip placement="bottom" title="我的邮件">
                            <a href="javascript:;">
                                <Badge dot>
                                    <FAIcon type="fa-envelope-o"/>
                                </Badge>
                            </a>
                        </Tooltip>
                    </li>
                    <li className="admin-header-menu-item">
                        <Tooltip placement="bottom" title="我的提醒">
                            <a href="javascript:;">
                                <Badge dot>
                                    <FAIcon type="fa-bell-o"/>
                                </Badge>
                            </a>
                        </Tooltip>
                    </li>
                    <li className="admin-header-menu-item">
                        <Tooltip placement="bottomRight" title="系统设置">
                            <Link to="/system/settings"><FAIcon type="fa-cogs"/></Link>
                        </Tooltip>
                    </li>
                    <li className="admin-header-menu-item">
                        <Tooltip placement="bottom" title="个人设置">
                            <a href="javascript:;">
                                <img src={avatar} className="admin-user-avatar" alt="王树彬"/>
                                王树彬
                            </a>
                        </Tooltip>
                    </li>
                    <li className="admin-header-menu-item">
                        <Tooltip placement="bottomRight" title="退出系统">
                            <a href="javascript:;">
                                <FAIcon type="fa-sign-out"/>
                            </a>
                        </Tooltip>
                    </li>
                </ul>
            </header>
        );
    }
});

export default Header;
