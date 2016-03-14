import React from 'react';
import Page from '../page/Page';
import { Form, Checkbox} from 'antd';
import Settings from './Settings'
import PubSubMsg from '../common/pubsubmsg';
import { ChromePicker, CompactPicker, MaterialPicker, PhotoshopPicker, SketchPicker, SliderPicker, SwatchesPicker } from 'react-color';
const FormItem = Form.Item;

const SettingsPage = React.createClass({
    getInitialState(){
        return {
            showPageAnimate: Settings.pageAnimate(),
            sidebarMenuAlwaysOpen: Settings.sidebarMenuAlwaysOpen(),
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
    handleChange(color) {
        //这个函数调用会比较频繁，这里操作localStorage会不会是个性能问题？
        var themeColor = Settings.themeColors();
        themeColor.header = color.rgb;
        Settings.themeColors(themeColor);
        PubSubMsg.publish('theme.colors', Settings.themeColors())
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
                        <label className="ant-checkbox-vertical" style={{cursor:'pointer'}}>
                            <Checkbox checked={this.state.sidebarMenuAlwaysOpen}
                                      onChange={this.handleSidebarMenuAlwaysOpen}/>
                            左侧菜单始终为展开状态
                        </label>
                    </FormItem>
                </Form>
                <div>设置头部颜色</div>
                <br/>
                <SketchPicker color="#fff" onChange={ this.handleChange }/>
                {/*
                <ChromePicker color="#fff" onChange={ this.handleChange }/>
                <br/>
                <CompactPicker color="#fff" onChange={ this.handleChange }/>
                <br/>
                <MaterialPicker color="#fff" onChange={ this.handleChange }/>
                <br/>
                <PhotoshopPicker color="#fff" onChange={ this.handleChange }/>
                <br/>
                <SketchPicker color="#fff" onChange={ this.handleChange }/>
                <br/>
                <SliderPicker color="#fff" onChange={ this.handleChange }/>
                <br/>
                <SwatchesPicker color="#fff" onChange={ this.handleChange }/>
                 */}
            </Page>
        );
    }
});

export default SettingsPage;
