import React from 'react';
import { Menu} from 'antd';
import {createSidebarMenus} from './SidebarMenuUtil'
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
                        {createSidebarMenus(items)}
                    </Menu>
                </div>
            </div>
        );
    }
}
export default Sidebar;
