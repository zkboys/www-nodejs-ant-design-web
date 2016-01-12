import './style.css';
import React from 'react';
import { Breadcrumb } from 'antd'
import Page from '../../framework/page/Page';
import ajax from '../../framework/common/ajax'

const Home = React.createClass({
    getInitialState(){
        return {
            loading: false
        }
    },
    componentWillUnmount() {
        /*
         * 组件被移除DMO,清除未完成的ajax
         * */
        this.ajax.abort();
    },
    componentDidMount() {
        let that = this;
        that.setState({
            loading: true
        });
        that.ajax = ajax.get({
            url: '/dashboard.json'
        });//TODO 这里有问题
        that.ajax.then(function (res) {
                that.setState({
                    loading: false
                });
                console.log(res);
            })
            .catch(function (err) {
                that.setState({
                    loading: false
                });
                console.error(err);
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
