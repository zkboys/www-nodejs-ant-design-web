import './font-awesome.css';
import './style.css';
import React from 'react';
class FAIcon extends React.Component {
    render() {
        let className = ['fa', this.props.type].join(' ');
        return <i className={className}></i>;
    }
}
export default FAIcon;
