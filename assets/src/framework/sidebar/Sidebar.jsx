import React from 'react';
import {Menu, Icon} from 'antd';
import {getSidebarMenus} from './SidebarMenuUtil'
import assign from 'object-assign'
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
            hidden,
            openKeys,
            selectedKeys,
        } = this.props.sidebar;
        let style = assign({}, sidebarStyle, hidden ? {width: 0} : {});

        return (
            <div className="admin-sidebar" style={style}>
                <div className="admin-sidebar-inner" style={sidebarInnerStyle}>
                    {/*不同模式的菜单要区分开写，否则互相干扰*/}
                    <Menu
                        style={{display: sidebarMode==='inline'?'block':'none'}}
                        openKeys={openKeys}
                        selectedKeys={[selectedKeys]}
                        onOpen={this.handleToggle}
                        onClose={this.handleToggle}
                        mode={sidebarMode}
                    >
                        {getSidebarMenus()}
                    </Menu>
                    <Menu
                        style={{display:sidebarMode ==='vertical'?'block':'none'}}
                        selectedKeys={[selectedKeys]}
                        mode={sidebarMode}
                    >
                        {getSidebarMenus()}
                    </Menu>
                </div>
            </div>
        );
    }
}
export default Sidebar;
