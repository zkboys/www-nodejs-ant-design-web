import './style.css';
import React from 'react';
import { Breadcrumb } from 'antd'
import Page from '../../framework/page/Page';
import ajax from '../../framework/common/ajax'
import jQuery from '../../framework/common/jquery.ajax'
let initRequestMixin = {
    getInitialState(){
        return {
            loading: false
        }
    },
    componentWillUnmount: function () {
        /*
         * 组件被移除DMO,清除未完成的ajax
         * */
        this.initReq.abort();
    },
    componentDidMount() {
        let _this = this;
        _this.initReq = jQuery.ajax({
            url: _this.initRequestUrl,
            beforeSend(){
                _this.setState({
                    loading: true
                });
            },
            success(data){
                console.log(data);
            },
            complete(){
                _this.setState({
                    loading: false
                });
            }
        });
        /*
        _this.initReq = ajax.get({
            url: _this.initRequestUrl,
            before(){
                _this.setState({
                    loading: true
                });
            },
            success (res) {
                _this.initRequestSuccess(res);
            },
            complete(error, res){
                _this.setState({
                    loading: false
                });
            }
        });*/
    }

};

const Home = React.createClass({
    mixins: [initRequestMixin],
    initRequestUrl: '/dashboard.json',
    initRequestSuccess(res){
        console.log(res);
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
                <p>这个坑啊　</p>
            </Page>
        );
    }
});

export default Home;
