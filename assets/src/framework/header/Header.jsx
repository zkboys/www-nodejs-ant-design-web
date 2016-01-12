import './style.css';
import React from 'react';
import {Icon, Badge, Tooltip} from 'antd';
import {Link} from 'react-router'
import FAIcon from '../faicon/FAIcon';
import avatar from './86.jpg';
var logoMaxWidth = 240
    , logoMinWidth = 60
    , logoMax = "后台管理系统"
    , logoMin = "后台"
    ;
const Header = React.createClass({
    render() {
        return (
            <header className="admin-header">
                <div className="admin-logo" style={{width:this.props.collapse?logoMinWidth:logoMaxWidth}}><Link to="/">{this.props.collapse?logoMin:logoMax}</Link></div>
                <Tooltip placement="right" title="切换菜单状态">
                    <a className="admin-sidebar-toggle" onClick={this.props.handelClick}><FAIcon type="fa-bars"/></a>
                </Tooltip>
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
