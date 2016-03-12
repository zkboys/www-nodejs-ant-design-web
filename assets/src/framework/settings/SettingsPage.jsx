import React from 'react';
import Page from '../page/Page';
import { Form, Checkbox} from 'antd';
import Settings from './Settings'
import ColorPicker from 'react-color-picker'
const FormItem = Form.Item;

const SettingsPage = React.createClass({
    getInitialState(){
        return {
            showPageAnimate: Settings.pageAnimate(),
            sidebarMenuAlwaysOpen: Settings.sidebarMenuAlwaysOpen(),
            color:''
        }
    },
    handleShowPageAnimate(e) {
        this.setState({
            showPageAnimate: !this.state.showPageAnimate
        });
        Settings.pageAnimate(!this.state.showPageAnimate);
    },
    handleSidebarMenuAlwaysOpen(e){
        this.setState({
            sidebarMenuAlwaysOpen: !this.state.sidebarMenuAlwaysOpen
        });
        Settings.sidebarMenuAlwaysOpen(!this.state.sidebarMenuAlwaysOpen);
    },
    componentDidMount: function () {

    },
    onDrag: function(color, c){
        this.setState({'color',color})
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
                    <FormItem wrapperCol={{span: 6, offset: 1}}>
                        <label className="ant-checkbox-vertical" style={{cursor:'pointer'}}>
                            <Checkbox checked={this.state.showPageAnimate} onChange={this.handleShowPageAnimate}/>
                            启用页面切换动画
                        </label>
                    </FormItem>
                    <FormItem wrapperCol={{span: 6, offset: 1}}>
                        <label className="ant-checkbox-vertical"  style={{cursor:'pointer'}}>
                            <Checkbox checked={this.state.sidebarMenuAlwaysOpen} onChange={this.handleSidebarMenuAlwaysOpen}/>
                            左侧菜单始终为展开状态
                        </label>
                    </FormItem>
                </Form>
                <ColorPicker value={this.state.color} onDrag={this.onDrag} />
                <div style={{background: this.state.color, width: 100, height: 50, color: 'white'}}>
                    {this.state.color}
                </div>
            </Page>
        );
    }
});

export default SettingsPage;
