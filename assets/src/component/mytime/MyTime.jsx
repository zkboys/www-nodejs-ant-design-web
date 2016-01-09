import React from 'react';
import Page from '../page/Page';
import { TimePicker } from 'antd';
console.log('fetch', fetch);
function onChange(time) {
    if (time) {
        console.log(time.toLocaleTimeString('zh-CN', {hour12: false}));
    }
}

/*
 * 组件是 React 里复用代码最佳方式，但是有时一些复杂的组件间也需要共用一些功能。
 * 有时会被称为 跨切面关注点。React 使用 mixins 来解决这类问题。
 * */
let FetchMixin = {
    getInitialState(){
        return {
            loadingClass: ''
        }
    },
    componentWillMount: function () {
    },
    /*
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     *
     * 如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
     * */
    componentDidMount: function () {
        let _this = this;
        _this.setState({
            loadingClass: 'loading'
        });
        var aa = fetch('/dashboard.json').then(function (response) {
            return response.json()
        }).then(function (json) {
            _this.setState({
                loadingClass: ''
            });
            console.log('parsed json', json)
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        });
        console.log(aa);
    },
    componentWillUnmount: function () {
        /*
         * 组件被移除DMO,清除未完成的ajax
         * */

    }
};
const MyTime = React.createClass({
    /*
     * 引用 mixin
     * */
    mixins: [FetchMixin],
    render() {
        const pageHeader = {
            title: '我的时间啊啊啊',
            breadcrumbItems: [
                {text: '用户管理'},
                {text: '用户查询', path: '/myTime3'},
                {text: '修改用户'}
            ]
        };
        return (
            <Page header={pageHeader} loadingClass={this.state.loadingClass}>
                <TimePicker onChange={onChange}/>
            </Page>
        );
    }
});

export default MyTime;
