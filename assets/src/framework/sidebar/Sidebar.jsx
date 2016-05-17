import React from 'react';
import { Menu, Icon } from 'antd';
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
            sidebarMenus
        } = this.props.sidebar;
        let style = assign({}, sidebarStyle, hidden ? {width: 0} : {});
        console.log(sidebarMenus);
        return (
            <div className="admin-sidebar" style={style}>
                <div className="admin-sidebar-inner" style={sidebarInnerStyle}>
                    <Menu
                        openKeys={openKeys}
                        selectedKeys={[selectedKeys]}
                        onOpen={this.handleToggle}
                        onClose={this.handleToggle}
                        mode={sidebarMode}>
                        {getSidebarMenus(sidebarMenus)}
                    </Menu>
                </div>
            </div>
        );
    }
}
export default Sidebar;
