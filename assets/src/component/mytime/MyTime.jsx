import React from 'react';
import Page from '../page/Page';
import { TimePicker } from 'antd';
function onChange(time) {
    if (time) {
        console.log(time.toLocaleTimeString('zh-CN', {hour12: false}));
    }
}
const MyTime = React.createClass({
    /*
     * 引用 mixin
     * */
    getInitialState(){
        return {
            /*
             * 修改loading,并以props方式传给Page组件，页面即可切换loading非loading状态。
             * */
            loading: false
        }
    },
    componentDidMount: function () {
        let _this = this;
        _this.setState({
            loading: true
        });
        fetch('/dashboard.json').then(function (response) {
            return response.json()
        }).then(function (json) {
            _this.setState({
                loading: false
            });
            console.log('use fetch parsed json', json)
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        });
    },
    render() {
        const pageHeader = {
            title: '我的时间啊啊啊',
            breadcrumbItems: [
                {text: '用户管理'},
                {text: '用户查询', path: '/myTime3'},
                {text: '修改用户'}
            ]
        };
        let animConfig = [
            {opacity: [1, 0], translateX: [0, 50]},
            {opacity: [1, 0], translateX: [0, -50]}
        ];
        return (
            <Page header={pageHeader} loading={this.state.loading} animConfig={animConfig}>
                <TimePicker onChange={onChange}/>
            </Page>
        );
    }
});

export default MyTime;
