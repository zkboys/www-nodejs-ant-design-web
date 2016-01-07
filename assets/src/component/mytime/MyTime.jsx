import React from 'react';
import Page from '../page/Page';
import { TimePicker, Breadcrumb } from 'antd';
function onChange(time) {
    if (time) {
        console.log(time.toLocaleTimeString('zh-CN', {hour12: false}));
    }
}
const MyTime = React.createClass({
    render() {
        return (
            <Page>
                <div className="admin-page-header">
                    <h1 className="admin-page-header-title">MyTime</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
                        <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
                        <Breadcrumb.Item>某应用</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <TimePicker onChange={onChange}/>
            </Page>
        );
    }
});

export default MyTime;
