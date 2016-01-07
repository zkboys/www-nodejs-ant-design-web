import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu} from 'antd';
import {getMenus} from '../MenusRouts'
var _sidebar;
const Sidebar = React.createClass({
    statics: {
        setSidebarState: function (state) {
            _sidebar.setState(state);
        }
    },
    getInitialState() {
        _sidebar = this;
        var menus = getMenus(this.props.collapse);
        return {
            current: menus.current,
            openKeys: menus.openKeys
        };
    },
    handleClick(e) {
        console.log('click menu', e);
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1) // 点击是会关闭其他菜单,如果不需要改变其他菜单状态,注释掉这里即可.
        });
    },
    onToggle(info){
        if (this.props.collapse) return;//折叠状态时,不改变打开菜单状态,否则切回展开状态,无法恢复打开状态.
        this.setState({
            openKeys: info.openKeys
        });
    },
    render() {
        return (
            <div className="admin-sidebar" style={{width:this.props.collapse?60:240,overflow:this.props.collapse?'visible':'auto'}}>
                <Menu
                    openKeys={this.state.openKeys}
                    selectedKeys={[this.state.current]}
                    onClick={this.handleClick}
                    onOpen={this.onToggle}
                    onClose={this.onToggle}
                    style={{marginLeft:-8}}
                    mode={this.props.collapse?'vertical':'inline'}>
                    {getMenus(this.props.collapse).menus}
                </Menu>
            </div>
        );
    }
});
export default Sidebar;
