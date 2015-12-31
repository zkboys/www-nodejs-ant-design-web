import './style.less';
import React from 'react';

const Page = React.createClass({
    render() {
        return (
            <div className="admin-page">{this.props.children}</div>
        );
    }
});

export default Page;
