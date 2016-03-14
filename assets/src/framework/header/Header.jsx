import './style.less';
import React from 'react';
import {Badge, Tooltip ,Menu, Popconfirm} from 'antd';
import {Link} from 'react-router'
import FAIcon from '../faicon/FAIcon';
import PubSubMsg from '../common/pubsubmsg';
import avatar from './86.jpg';
import {getSidebarMenus, getCurrentSidebarMenu} from '../SidebarMenu';
import Settings from '../settings/Settings';
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
            collapseSidebar: Settings.collapseSidebar(),
            headerColor:''
        };
    },
    handleSwitchMenu(e) {
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
    handleExit(e){
        alert('确定退出系统,跳转到登陆页面或者关闭浏览器');
    },
    componentDidMount(){
        let _this = this;
        PubSubMsg.subscribeAcceptOldMsg('header-menu', function (data) {
            _this.setState({
                menu: data.menu,
                current: data.current
            });
        });
        PubSubMsg.subscribe('theme.colors','header',function(colors){
            let color = 'rgba('+colors.header.r+','+colors.header.g+','+colors.header.b+','+colors.header.a+')';
            _this.setState({
                headerColor:color
            });
        });
    },
    render() {
        return (
            <header className="admin-header" style={{'backgroundColor':this.state.headerColor}}>
                <div className="admin-logo" style={{width:this.state.collapseSidebar?logoMinWidth:logoMaxWidth}}><Link to="/">{this.state.collapseSidebar ? logoMin : logoMax}</Link></div>
                <Tooltip placement="bottom" title="切换菜单状态">
                    <a className="admin-sidebar-toggle" onClick={this.handleSwitchMenu}><FAIcon type="fa-bars"/></a>
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
                            <Popconfirm title="您确定要退出系统吗？" onConfirm={this.handleExit}>
                                <a href="javascript:;">
                                    <FAIcon type="fa-sign-out"/>
                                </a>
                            </Popconfirm>

                        </Tooltip>
                    </li>
                </ul>
            </header>
        );
    }
});

export default Header;
