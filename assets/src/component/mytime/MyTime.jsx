import React from 'react';
import Page from '../page/Page';
import { TimePicker } from 'antd';
function onChange(time) {
    if (time) {
        console.log(time.toLocaleTimeString('zh-CN', {hour12: false}));
    }
}
const MyTime = React.createClass({
    render() {
        const pageHeader={
            title:'我的时间啊啊啊',
            breadcrumbItems:[
                {text:'用户管理'},
                {text:'用户查询',path:'/myTime3'},
                {text:'修改用户'}
            ]
        };
        return (
            <Page header={pageHeader}>
                <TimePicker onChange={onChange}/>
            </Page>
        );
    }
});

export default MyTime;
