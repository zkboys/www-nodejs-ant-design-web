import './style.less';
import React from 'react';
import PubSubMsg from '../common/pubsubmsg';
import Settings from '../settings/Settings';
const Container = React.createClass({
    getInitialState() {
        return {
            hidden: false,
            collapseSidebar: Settings.collapseSidebar()
        }
    },
    componentWillUpdate(){
        //console.log('Container', 'componentWillUpdate');
    },
    componentDidUpdate(){
        //console.log('Container', 'componentDidUpdate');
    },
    componentDidMount(){
        let _this = this;
        PubSubMsg.subscribeAcceptOldMsg('switch-sidebar', function (data) {
            _this.setState({
                collapseSidebar: data
            });
        });
        PubSubMsg.subscribeAcceptOldMsg('sidebar-menu', function (data) {
            if (data.menu && data.menu.length > 0) {
                _this.setState({
                    hidden: false
                });
            } else {
                _this.setState({
                    hidden: true
                });
            }
        });
    },
    render() {
        let style = {
            left: this.state.hidden ? 0 : this.state.collapseSidebar ? 60 : 240
        };
        return (
            <div className="admin-container " style={style}>{this.props.children}</div>
        );
    }
});

export default Container;
