import React from 'react';
import Page from '../../framework/page/Page';
const NewMail = React.createClass({
    getInitialState(){
        return {
            /*
             * 修改loading,并以props方式传给Page组件，页面即可切换loading非loading状态。
             * */
            loading: false
        }
    },
    componentDidMount: function () {
    },
    render() {
        return (
            <Page header='auto' loading={this.state.loading}>
                <h5>修改个人信息</h5>
            </Page>
        );
    }
});

export default NewMail;
