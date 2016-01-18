import './style.css';
import React from 'react';
import {Icon, Badge, Tooltip ,Menu} from 'antd';
import {Link} from 'react-router'
import FAIcon from '../faicon/FAIcon';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import avatar from './86.jpg';
var logoMaxWidth = 240
    , logoMinWidth = 60
    , logoMax = "后台管理系统"
    , logoMin = "后台"
    ;
const Header = React.createClass({
    getInitialState(){
        return {
            current: 'mail'
        };
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    },
    render() {
        return (
            <header className="admin-header">
                <div className="admin-logo" style={{width:this.props.collapse?logoMinWidth:logoMaxWidth}}><Link to="/">{this.props.collapse ? logoMin : logoMax}</Link></div>
                <Tooltip placement="right" title="切换菜单状态">
                    <a className="admin-sidebar-toggle" onClick={this.props.handelClick}><FAIcon type="fa-bars"/></a>
                </Tooltip>
                <Menu className="admin-header-sys" onClick={this.handleClick}
                      selectedKeys={[this.state.current]}
                      theme={this.state.theme}
                      mode="horizontal">
                    <Menu.Item key="mail">
                        <Icon type="appstore"/>店铺
                    </Menu.Item>
                    <Menu.Item key="app">
                        <Icon type="appstore"/>服务
                    </Menu.Item>
                    <Menu.Item key="alipay">
                        <Icon type="appstore"/>快递
                    </Menu.Item>
                </Menu>
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
