import React from 'react';
import Page from '../page/Page';
import { Form, Checkbox} from 'antd';
import storage from '../common/storage'
const FormItem = Form.Item;

const Settings = React.createClass({
    getInitialState(){
        let localShowPageAnimate = storage.local.get('showPageAnimate');
        return {
            showPageAnimate: localShowPageAnimate == null ? true : localShowPageAnimate
        }
    },
    handleShowPageAnimate(e) {
        this.setState({
            showPageAnimate: !this.state.showPageAnimate
        });
        storage.local.set('showPageAnimate',!this.state.showPageAnimate);
    },
    componentDidMount: function () {

    },
    render() {
        const pageHeader = {
            title: '系统设置',
            breadcrumbItems: [
                {text: '系统设置'}
            ]
        };
        return (
            <Page header={pageHeader}>
                <Form horizontal>
                    <FormItem wrapperCol={{span: 23, offset: 1}}>
                        <label className="ant-checkbox-vertical">
                            <Checkbox checked={this.state.showPageAnimate} onChange={this.handleShowPageAnimate}/>启用页面切换动画
                        </label>
                    </FormItem>
                </Form>
            </Page>
        );
    }
});

export default Settings;
