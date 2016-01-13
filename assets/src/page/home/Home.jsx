import './style.css';
import React from 'react';
import { Breadcrumb } from 'antd'
import Page from '../../framework/page/Page';
import ajax from '../../framework/common/ajax'

const Home = React.createClass({
    getInitialState(){
        return {
            loading: false,
            r: {}
        }
    },
    componentWillUnmount() {
        /*
         * 组件被移除DMO,清除未完成的ajax
         * */
        this.request.abort();
    },
    componentDidMount() {
        let _this = this;
        _this.request = ajax.get({
            url: '/dashboard.json',
            before(){
                _this.setState({
                    loading: true
                });
            },
            success (res) {
                console.log(res);
            },
            complete(error, res){
                _this.setState({
                    loading: false
                });
            }
        });
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
            </Page>
        );
    }
});

export default Home;
