import React from 'react';
import {Badge ,Menu, Popconfirm} from 'antd';
import {Link} from 'react-router'
import FAIcon from '../../common/faicon/FAIcon';
import avatar from './86.jpg';

class Header extends React.Component {
    render() {
        const {
            headerLogoWidth,
            headerLogo,
            } = this.props.style;
        const {
            current,
            items //TODO item.subMenus如果有子菜单，再处理
            } = this.props.headerNav;
        return (
            <header className="admin-header">
                <div className="admin-logo" style={{width:headerLogoWidth}}><Link to="/">{headerLogo}</Link></div>
                <a className="admin-sidebar-toggle" onClick={this.props.onToggleSidebar}><FAIcon type="fa-bars"/></a>
                <Menu className="admin-header-sys"
                      selectedKeys={[current]}
                      mode="horizontal">
                    {items.map((item, index) =>
                        <Menu.Item key={item.key}>
                            <Link to={item.path}>
                                <FAIcon type={item.icon}/>{item.text}
                            </Link>
                        </Menu.Item>
                    )}
                </Menu>

                <ul className="admin-header-menu">
                    <li className="admin-header-menu-item">
                        <Link to="/system/mail/unread">
                            <Badge dot>
                                <FAIcon type="fa-envelope-o"/>
                            </Badge>
                            我的邮件
                        </Link>
                    </li>
                    <li className="admin-header-menu-item">
                        <Link to="/system/remind">
                            <Badge dot>
                                <FAIcon type="fa-bell-o"/>
                            </Badge>
                            系统提醒
                        </Link>
                    </li>
                    <li className="admin-header-menu-item">
                        <Link to="/system/settings">
                            <FAIcon type="fa-cogs"/>
                            系统设置
                        </Link>
                    </li>
                    <li className="admin-header-menu-item">
                        <Link to="/system/profile/message">
                            <img src={avatar} className="admin-user-avatar" alt="王树彬"/>
                            王树彬
                        </Link>
                    </li>
                    <li className="admin-header-menu-item">
                        <Popconfirm title="您确定要退出系统吗？" onConfirm={this.handleExit}>
                            <a href="javascript:;">
                                <FAIcon type="fa-sign-out"/>
                                退出系统
                            </a>
                        </Popconfirm>
                    </li>
                </ul>
            </header>
        );
    }
}
export default Header;
