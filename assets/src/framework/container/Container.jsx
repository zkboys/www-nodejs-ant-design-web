import './style.less';
import React from 'react';
import PubSubMsg from '../common/pubsubmsg';
import Settings from '../Settings';
const Container = React.createClass({
    getInitialState() {
        return {
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
        PubSubMsg.subscribe('switch-sidebar', function (data) {
            _this.setState({
                collapseSidebar: data
            });
        });
    },
    render() {
        return (
            <div className="admin-container " style={{left:this.state.collapseSidebar?60:240}}>{this.props.children}</div>
        );
    }
});

export default Container;
