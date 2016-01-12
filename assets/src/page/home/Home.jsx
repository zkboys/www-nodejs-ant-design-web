import './style.css';
import React from 'react';
import { Breadcrumb } from 'antd'
import Page from '../../framework/page/Page';

const Dashboard = React.createClass({
    render() {
        let pageHeader =
            <div>
                <h1 className="admin-page-header-title">Dashboard</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
                    <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
                    <Breadcrumb.Item>某应用</Breadcrumb.Item>
                </Breadcrumb>
            </div>;
        return (
            <Page header={pageHeader}>
                <h1>首页</h1>
            </Page>
        );
    }
});

export default Dashboard;
