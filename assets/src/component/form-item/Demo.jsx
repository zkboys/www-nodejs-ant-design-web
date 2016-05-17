import React from 'react';
import assign from 'object-assign'
import QueryTerms from '../../component/query-terms/QueryTerms';
import PaginationComponent from '../../component/pagination/PaginationComponent';
import Page from '../../framework/page/Page';
import BaseComponent from '../BaseComponent';

import {
    RadioItem,
    CheckBoxItem,
    SelectItem,
    ComboboxItem,
    DateTimeAreaItem,
} from './index'
import {
    Form,
    Table,
    Icon,
    Button,
    Radio,
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class Demo extends BaseComponent {
    state = {};

    componentDidMount() {
        this.props.form.setFieldsValue({
            radio: 'all',
            checkbox: ['all'],
            select: 'all',
            combobox: 'asdfasdf@123.com',
            startDateArea: '2016-05-11',
            endDateArea: '2016-05-22',
            startDateTimeArea: '2016-01-12 11:11',
            endDateTimeArea: '2016-01-12 22:22',
            startTimeArea: '11:11',
            endTimeArea: '22:22',
        });
    };

    handleReset = (e)=> {
        e.preventDefault();
        // FIXME 自定义组件reset无效
        this.props.form.resetFields();
    };

    handleSubmit = (e)=> {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    };

    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 21},
        };
        const radioProps = getFieldProps('radio', {
            rules: [
                {required: true, message: '选择一个！'},
            ],
        });
        const comboboxProps = getFieldProps('combobox', {
            rules: [
                {required: true, message: '请输入邮箱'},
            ],
        });
        const selectProps = getFieldProps('select', {
            rules: [
                //{required: true, message: '选择一个select！'},
            ],
        });
        const checkboxprops = getFieldProps('checkbox', {
            rules: [
                // checkbox 返回得是一个数组，required默认检测得是string，这里会出问题，如果想检测不为空，可以自己写validator实现。
                //{ required: true, message: '选择一个！' },
            ],
        });
        return (
            <Page header='auto' loading={this.state.loading}>
                <Form horizontal form={this.props.form}>
                    <FormItem
                        {...formItemLayout}
                        label="单选：">
                        <RadioItem
                            button
                            size={'large'}
                            url='/api/m/1/stores.json'
                            expandable
                            minCount={5}
                            options={[//如果存在url，这里的options会拼接到url返回数据之前。
                                {value:'all', label:'全部'},
                            ]}
                            optionsFilter={function(res){// 对ajax返回的数据进行处理
                                return res.body.results.map(function(v){
                                    return {value: v.id, label: v.name}
                                })
                            }}
                            {...radioProps}
                        />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="多选：">
                        <CheckBoxItem
                            button
                            size={'large'}
                            url='/api/m/1/stores.json'
                            expandable
                            minCount={5}
                            defaultValue={['all']}
                            options={[
                                {value:'all', label:'全部'},
                            ]}
                            optionsFilter={function(res){// 对ajax返回的数据进行处理
                                return res.body.results.map(function(v){
                                    return {value: v.id, label: v.name}
                                })
                            }}
                            {...checkboxprops}
                        />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="下拉：">
                        <SelectItem
                            //multiple
                            //showSearch
                            size={'large'}
                            url='/api/m/1/stores.json'
                            defaultValue='all'
                            options={[
                                {value:'all', label:'全部'},
                            ]}
                            style={{width:'200px'}}
                            optionsFilter={function(res){// 对ajax返回的数据进行处理
                                return res.body.results.map(function(v){
                                    return {value: v.id, label: v.name}
                                })
                            }}
                            {...selectProps}
                        />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="提示输入框：">
                        <ComboboxItem
                            size={'large'}
                            url='/api/m/1/stores.json'
                            defaultValue='all'
                            separator='@'
                            options={[
                                '163.com',
                                'qq.com',
                                '126.com',
                                'xx.com',
                            ]}
                            style={{width:'200px'}}
                            optionsFilter={function(res){// 对ajax返回的数据进行处理
                                return res.body.results.map(function(v){
                                    return v.name;
                                })
                            }}
                            {...comboboxProps}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="日期区间：">
                        <DateTimeAreaItem
                            dateArea
                            resultDateToString
                            disableBefore={'2016-05-12'}
                            disableAfter={'2016-05-15'}
                            startFieldProps={getFieldProps('startDateArea',{})}
                            endFieldProps={getFieldProps('endDateArea')}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="日期+时间区间：">
                        <DateTimeAreaItem
                            dateTimeArea
                            resultDateToString
                            disableBefore={'2016-01-12'}
                            disableAfter={'2016-01-15'}
                            startFieldProps={getFieldProps('startDateTimeArea',{})}
                            endFieldProps={getFieldProps('endDateTimeArea')}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="时间区间：">
                        <DateTimeAreaItem
                            timeArea
                            resultDateToString
                            startFieldProps={getFieldProps('startTimeArea',{})}
                            endFieldProps={getFieldProps('endTimeArea')}
                        />
                    </FormItem>
                    <FormItem
                        wrapperCol={{ span: 21, offset: 3 }}>
                        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                </Form>
            </Page>
        )
    };
}
Demo = createForm()(Demo);
export default Demo;
