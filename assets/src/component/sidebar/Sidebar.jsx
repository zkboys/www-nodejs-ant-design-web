import './style.less';
import React from 'react';
import { Menu} from 'antd';
import {getMenus} from '../MenusRouts'
var _sidebar;
const Sidebar = React.createClass({
    statics: {
        setSidebarState: function (state) {
            _sidebar.setState(state);
        },
        getCurrentMenuKey: function () {
            return _sidebar.state.current;
        },
        getSidebarStatus: function () {
            return _sidebar ? _sidebar.state.status : false;
        }
    },
    getInitialState() {
        _sidebar = this;
        var menus = getMenus(this.props.collapse);
        return {
            current: menus.current,
            openKeys: menus.openKeys,
            maxWidth: 240,
            minWidth: 60,
            scrollBarWidth: 15
        };
    },
    handleClick(e) {
        console.log('click menu', e);
        /*
         * 点击Link会改变地址栏，地址栏改变会同步菜单状态，这里就不用再改变菜单状态了，重复了。
         * 这里改变状态会导致没有点击到Link，点击到菜单，菜单状态会改变，但是页面并没有跳转的bug。
         * */
        //this.setState({
        //    current: e.key,
        //    openKeys: e.keyPath.slice(1) // 点击是会关闭其他菜单,如果不需要改变其他菜单状态,注释掉这里即可.
        //});
    },
    onToggle(info){
        if (this.props.collapse) return;//折叠状态时,不改变打开菜单状态,否则切回展开状态,无法恢复打开状态.
        this.setState({
            openKeys: info.openKeys
        });
    },
    componentDidMount(){
        this.setState({
            status: 'ok',
            scrollBarWidth: this.scrollBarWidth()
        });
    },
    /*
     * 获取滚动条宽度函数
     * */
    scrollBarWidth () {
        var scrollDiv = document.createElement('div');
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        scrollDiv.style.width = '50px';
        scrollDiv.style.height = '50px';
        scrollDiv.style.overflow = 'scroll';
        document.body.appendChild(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        document.body.removeChild(scrollDiv)
        return scrollbarWidth
    },
    render() {
        let sidebarStyle = {
            width: this.props.collapse ? this.state.minWidth : this.state.maxWidth,
            overflow: this.props.collapse ? 'visible' : 'hidden'
        };
        let sidebarInnerStyle = {
            width: this.props.collapse ? this.state.minWidth : this.state.maxWidth + this.state.scrollBarWidth,
            overflowY: this.props.collapse ? 'visible' : 'scroll'
        };
        return (
            <div className="admin-sidebar" style={sidebarStyle}>
                <div className="admin-sidebar-inner" style={sidebarInnerStyle}>
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
            </div>
        );
    }
});
export default Sidebar;
