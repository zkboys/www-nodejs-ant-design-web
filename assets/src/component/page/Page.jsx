import './style.less';
import React from 'react';

const Page = React.createClass({
    render() {
        return (
            <div className={"admin-page " + this.props.className}>
                <div className="admin-page-loading"></div>
                <div className="admin-page-content">
                    <div className="admin-page-content-inner">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

export default Page;
