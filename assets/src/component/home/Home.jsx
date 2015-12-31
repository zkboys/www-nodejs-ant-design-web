import './style.css';
import React from 'react';
import { Breadcrumb } from 'antd'
import Page from '../page/Page';

const Dashboard = React.createClass({
    render() {
        return (
            <Page>
                <div id="admin-page-header" className="admin-page-header">
                    <h1 className="admin-page-header-title">Dashboard</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
                        <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
                        <Breadcrumb.Item>某应用</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="admin-page-content">
                    <div className="admin-page-content-inner">
                        <h1>首页</h1>
                    </div>
                </div>
            </Page>
        );
    }
});

export default Dashboard;
