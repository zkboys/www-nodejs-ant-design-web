import './style.css';
import React from 'react';
import { Breadcrumb } from 'antd'
import Page from '../../framework/page/Page';

const Home = React.createClass({
    getInitialState(){
        console.log('mixin 中的 getInitialState');
        return {
            loading: false
        }
    },
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
            <Page header={pageHeader} loading={this.state.loading}>
                <h1>首页</h1>
                <p>测试缓存啊</p>
                <p>这个坑啊 </p>
                <p>文件每次会不会有改动，这个哪个啥文什么呢？开发模式，和生产模式还不一样．开发模式生成的文件不会添加hash</p>
            </Page>
        );
    }
});

export default Home;
