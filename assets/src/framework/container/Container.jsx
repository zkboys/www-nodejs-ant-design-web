import 'antd/lib/index.css';
import './style.less';
import assign from 'object-assign';
import React from 'react';
import { connect } from 'react-redux'
import { Menu, Icon} from 'antd';
import HeaderBar from '../components/Header';
import Sidebar from '../components/Sidebar';
import PubSubMsg from '../common/pubsubmsg';
import sidebarMenus from '../SidebarMenus';
import {
    toggleSidebar,
    setHeaderCurrentMenu,
    setSidebarMenus,
    setSidebarMenuStatus
} from '../actions'

class Container extends React.Component {

    handleToggleSidebar = ()=> {
        this.props.dispatch(toggleSidebar());
    };

    handleToggleMenu = (info)=> {
        let selectedKeys = this.props.sidebar.selectedKeys;
        let data = {
            selectedKeys: selectedKeys,
            openKeys: info.openKeys
        };
        this.props.dispatch(setSidebarMenuStatus(data));
    };

    componentDidMount() {
        let dispatch = this.props.dispatch;
        PubSubMsg.subscribeAcceptOldMsg('current-header-menu', function (current) {
            dispatch(setHeaderCurrentMenu(current));
            dispatch(setSidebarMenus(sidebarMenus[current]))
        });
        PubSubMsg.subscribeAcceptOldMsg('current-sidebar-menu', function (data) {
            dispatch(setSidebarMenuStatus(data));
        });
    }

    render() {
        return (
            <div>
                <HeaderBar {...this.props} onToggleSidebar={this.handleToggleSidebar}/>
                <Sidebar {...this.props} onToggle={this.handleToggleMenu}/>
                <div className="admin-container" style={{left:this.props.style.centerLeft}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return assign({}, state);
}
export default connect(mapStateToProps)(Container)
