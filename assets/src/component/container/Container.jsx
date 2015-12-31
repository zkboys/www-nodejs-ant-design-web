import './style.css';
import React from 'react';

const Container = React.createClass({
    render() {
        return (
            <div className="admin-container" style={{left:this.props.collapse?60:240}}>{this.props.children}</div>
        );
    }
});

export default Container;
