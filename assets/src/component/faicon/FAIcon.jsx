import './font-awesome.css';
import './style.css';
import React from 'react';

const FAIcon = React.createClass({
    render() {
        let className = ['fa', this.props.type].join(' ');
        return <i className={className}></i>;
    }
});

export default FAIcon;
