import React from 'react';
import { Menu} from 'antd';
import {createSidebarMenus} from './SidebarMenuUtil'
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
            items
            } = this.props.sidebar;
        let style = assign({}, sidebarStyle, hidden ? {width: 0} : {});
        return (
            <div className="admin-sidebar" style={style}>
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
