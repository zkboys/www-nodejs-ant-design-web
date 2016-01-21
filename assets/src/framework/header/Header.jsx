import './style.less';
import React from 'react';
import {Badge, Tooltip ,Menu} from 'antd';
import {Link} from 'react-router'
import FAIcon from '../faicon/FAIcon';
import PubSubMsg from '../common/pubsubmsg';
import avatar from './86.jpg';
import {getSidebarMenus, getCurrentSidebarMenu} from '../SidebarMenu';
import Settings from '../Settings';
var logoMaxWidth = 240
    , logoMinWidth = 60
    , logoMax = "后台管理系统"
    , logoMin = "后台"
    ;
const Header = React.createClass({
    getInitialState(){
        return {
            menu: [],
            current: '',
            collapseSidebar: Settings.collapseSidebar()
        };
    },
    handleClick(e) {
        Settings.collapseSidebar(!Settings.collapseSidebar());
        let menu = getSidebarMenus();
        let currentSidebarMenu = getCurrentSidebarMenu();
        let current = currentSidebarMenu ? currentSidebarMenu.key : '';

        PubSubMsg.publish('switch-sidebar', Settings.collapseSidebar());
        PubSubMsg.publish('sidebar-menu', {
            menu,
            current
        });
        this.setState({
            collapseSidebar: Settings.collapseSidebar()
        });
    },
    componentDidMount(){
        let _this = this;
        PubSubMsg.subscribe('header-menu', function (data) {
            _this.setState({
                menu: data.menu,
                current: data.current
            });
        });
    },
    render() {
        return (
            <header className="admin-header">
                <div className="admin-logo" style={{width:this.state.collapseSidebar?logoMinWidth:logoMaxWidth}}><Link to="/">{this.state.collapseSidebar ? logoMin : logoMax}</Link></div>
                <Tooltip placement="bottom" title="切换菜单状态">
                    <a className="admin-sidebar-toggle" onClick={this.handleClick}><FAIcon type="fa-bars"/></a>
                </Tooltip>
                <Menu className="admin-header-sys"
                      selectedKeys={[this.state.current]}
                      mode="horizontal">
                    {this.state.menu}
                </Menu>

                <ul className="admin-header-menu">
                    <li className="admin-header-menu-item">
                        <Tooltip placement="bottom" title="我的邮件">
                            <Link to="/system/mail/unread">
                                <Badge dot>
                                    <FAIcon type="fa-envelope-o"/>
                                </Badge>
                            </Link>
                        </Tooltip>
                    </li>
                    <li className="admin-header-menu-item">
                        <Tooltip placement="bottom" title="我的提醒">
                            <Link to="/system/remind">
                                <Badge dot>
                                    <FAIcon type="fa-bell-o"/>
                                </Badge>
                            </Link>
                        </Tooltip>
                    </li>
                    <li className="admin-header-menu-item">
                        <Tooltip placement="bottomRight" title="系统设置">
                            <Link to="/system/settings"><FAIcon type="fa-cogs"/></Link>
                        </Tooltip>
                    </li>
                    <li className="admin-header-menu-item">
                        <Tooltip placement="bottom" title="个人设置">
                            <Link to="/system/profile/message">
                                <img src={avatar} className="admin-user-avatar" alt="王树彬"/>
                                王树彬
                            </Link>
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
