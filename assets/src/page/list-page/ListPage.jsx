import './style.less'
import React from 'react';
import Page from '../../framework/page/Page';
import SearchCondition from '../search-condition/SearchCondition'
import InputItem from '../search-condition/InputItem'

let ListPage = React.createClass({
    getInitialState() {
        return {
            loading: false
        };
    },
    render() {
        let options = {
            showSearchBtn: true,
            onSearch: function (data) {
                console.log(data);
            },
            conditionItems: [
                [
                    {
                        name: 'store',
                        label: '门店',
                        type: 'input',
                        searchOnChange: true
                    },
                    {
                        name: 'name',
                        label: '客户姓名',
                        type: 'input',
                        width: 300
                    }
                ],
                {
                    type: 'select',
                    name: 'testSelect',
                    label: '搜索下拉',
                    showSearch: true,
                    defaultValue: 'all',
                    options: [
                        {value: 'all', text: '全部'},
                        {value: '1', text: '和平门'},
                        {value: '2', text: '前门大街'},
                        {value: '3', text: '东直门'},
                        {value: '4', text: '宋家庄'}
                    ]
                },
                {
                    type: 'select',
                    name: 'testSelect',
                    label: '普通下拉',
                    defaultValue: 'all',
                    options: [
                        {value: 'all', text: '全部'},
                        {value: '1', text: '和平门'},
                        {value: '2', text: '前门大街'},
                        {value: '3', text: '东直门'},
                        {value: '4', text: '宋家庄'}
                    ]
                },
                {
                    type: 'radioButton',
                    name: 'radioButton',
                    label: '单选按钮',
                    defaultValue: 'all',
                    options: [
                        {value: 'all', text: '全部'},
                        {value: '1', text: '和平门'},
                        {value: '2', text: '前门大街'},
                        {value: '3', text: '东直门'},
                        {value: '4', text: '宋家庄'}
                    ]
                },
                {
                    type: 'checkboxButton',
                    name: 'checkboxButton',
                    label: '复选框按钮',
                    searchOnChange: true,
                    defaultValue: ['all', '22', '44'],
                    options: [
                        {value: 'all', text: '全部'},
                        {value: '00', text: '搞一个'},
                        {value: '11', text: '多选'},
                        {value: '22', text: '按钮'},
                        {value: '33', text: '怎么样'},
                        {value: '44', text: '呢？'}
                    ]
                },
                {
                    type: 'checkbox',
                    name: 'checkbox',
                    label: '复选框',
                    searchOnChange: true,
                    defaultValue: ['1', '5', '3'],
                    options: [
                        {value: '1', text: '哈哈1'},
                        {value: '2', text: '哈哈2'},
                        {value: '3', text: '哈哈3'},
                        {value: '4', text: '哈哈4'},
                        {value: '5', text: '哈哈5'}
                    ]
                },
                {
                    name: 'age',
                    label: '年龄啊',
                    type: 'input'
                },
                {
                    type: 'date',
                    name: 'date',
                    label: '日期',
                    defaultValue: '2015-01-01'
                },
                {
                    type: 'dateArea',
                    name: 'dateArea',
                    label: '日期区间',
                    options: ['2016-06-06', '2016-07-07']
                },
                {
                    type: 'time',
                    name: 'time',
                    label: '时间',
                    defaultValue: '11:51'
                },
                {
                    type: 'timeArea',
                    name: 'timeArea',
                    label: '时间区间',
                    width: 73,
                    options: ['11:11', '12:12']
                },
                {
                    type: 'dateTime',
                    name: 'dateTime',
                    label: '日期时间',
                    defaultValue: '2016-01-01 11:51'
                },
                {
                    type: 'dateTimeArea',
                    name: 'dateTimeArea',
                    label: '日期时间区',
                    options: ['2016-01-01 11:11', '2016-02-02 22:22']
                },
                {
                    type: 'customer',
                    name: 'customer',
                    label: '用户自定义',
                    component: InputItem
                }
            ]
        };
        return (
            <Page header="auto" loading={this.state.loading}>
                <SearchCondition options={options}/>
            </Page>
        );
    }
});
export default ListPage;
