import './style.less';
import React from 'react';
import { Breadcrumb } from 'antd';
import {Link} from 'react-router'
const Page = React.createClass({
    render() {
        let pageHeader = '';
        if (this.props.header) {
            let breadcrumbItems = [
                <Breadcrumb.Item key="page-breadcrumb-item-home"><Link to="dashboard">首页</Link></Breadcrumb.Item>
            ];
            let items = this.props.header.breadcrumbItems;
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let key = 'page-breadcrumb-item' + i;
                breadcrumbItems.push(
                    item.path ? <Breadcrumb.Item key={key}><Link to={item.path}>{item.text}</Link></Breadcrumb.Item>
                        : <Breadcrumb.Item  key={key}>{item.text}</Breadcrumb.Item>
                );
            }
            pageHeader =
                <div className="admin-page-header">
                    <h1 className="admin-page-header-title">{this.props.header.title}</h1>
                    <Breadcrumb>
                        {breadcrumbItems}
                    </Breadcrumb>
                </div>;
        }
        return (
            <div className={"admin-page " + this.props.className}>
                <div className="admin-page-loading"></div>
                {pageHeader}
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
