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
                        <p>npm run server 运行一个server 并且打开默认浏览器！</p>
                        <p>开发过程中，修改文件，浏览器会自动刷新，特别适合双屏/大屏开发！</p>
                        <p>随着项目复杂度的增加，不知道会不会慢。目前的相应速度还是可以接受的。</p>
                        <p>希望不卡吧。哈哈。写起来真的就挺爽了。一保存浏览器就自动刷新了。想你的时候，你在哪里？</p>
                        <p>如何优化构建速度？哈哈快一些</p>
                    </div>
                </div>
            </Page>
        );
    }
});

export default Dashboard;
