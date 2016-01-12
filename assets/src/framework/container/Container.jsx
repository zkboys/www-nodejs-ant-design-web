import './style.less';
import React from 'react';
const Container = React.createClass({
    componentWillUpdate(){
        console.log('Container', 'componentWillUpdate');
    },
    componentDidUpdate(){
        console.log('Container', 'componentDidUpdate');
    },
    render() {
        return (
            <div className="admin-container " style={{left:this.props.collapse?60:240}}>{this.props.children}</div>
        );
    }
});

export default Container;
