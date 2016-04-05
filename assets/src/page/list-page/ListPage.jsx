import './style.less'
import React from 'react';
import assign from 'object-assign'
import Page from '../../framework/page/Page';
import SearchCondition from '../search-condition/SearchCondition'
import InputItem from '../search-condition/InputItem'

class ListPage extends React.Component {
    state = {
        loading: false,
        conditionData: {},
        currentPage: 1,
        pageSize: 10
    };

    componentDidMount() {

    }

    handleSearch = ()=> {
        let conditions = assign({}, this.state.conditionData, {
            currentPage: this.state.currentPage,
            pageSize: this.state.pageSize
        });
        console.log(conditions);
    };

    render() {
        let _this = this;
        let options = {
            showSearchBtn: true,
            onSearch: (data)=> {
                _this.handleSearch();
            },
            conditionItems: [
                {
                    type: 'selectCascaded',
                    items: [
                        {
                            type: 'select',
                            name: 'select1',
                            label: '一级下拉',
                            searchOnChange: true,
                            defaultValue: '4',
                            options: [
                                {value: 'all', text: '全部'},
                                {value: '1', text: '和平门'},
                                {value: '2', text: '前门大街'},
                                {value: '3', text: '东直门'},
                                {value: '4', text: '宋家庄'}
                            ],
                            getNextOptions: function (value) {
                                return [
                                    {value: value + '-1', text: value + '-1 二级下拉'},
                                    {value: value + '-2', text: value + '-2 二级下拉'},
                                    {value: value + '-3', text: value + '-3 二级下拉'},
                                    {value: value + '-4', text: value + '-4 二级下拉'}
                                ]
                            }
                        },
                        {
                            type: 'selectSearch',
                            name: 'select2',
                            label: '二级下拉',
                            width: 200,
                            searchOnChange: true,
                            getNextOptions: function (value) {
                                return [
                                    {value: value + '-1', text: value + '-1 三级下拉'},
                                    {value: value + '-2', text: value + '-2 三级下拉'},
                                    {value: value + '-3', text: value + '-3 三级下拉'},
                                    {value: value + '-4', text: value + '-4 三级下拉'}
                                ]
                            }
                        },
                        {
                            type: 'select',// 支持多选意义不大
                            name: 'select3',
                            label: '三级下拉',
                            searchOnChange: true,
                            getNextOptions: function (value) {
                                return [
                                    {value: value + '-1', text: value + '-1 四级下拉'},
                                    {value: value + '-2', text: value + '-2 四级下拉'},
                                    {value: value + '-3', text: value + '-3 四级下拉'},
                                    {value: value + '-4', text: value + '-4 四级下拉'}
                                ]
                            }
                        },
                        {
                            type: 'select',
                            name: 'select4',
                            label: '四级下拉',
                            searchOnChange: true
                        }
                    ]
                },
                {
                    name: 'store',
                    label: '门店',
                    type: 'input',
                    searchOnChange: true
                },
                {
                    name: 'combobox',
                    label: '智能提示',
                    type: 'combobox',
                    searchOnChange: true,
                    defaultValue: '瞎写的',
                    separator: '@',
                    options: ['gmail.com', '163.com', 'qq.com']
                },

                [
                    {
                        type: 'select',
                        name: 'select',
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
                        type: 'selectSearch',
                        name: 'selectSearch',
                        label: '搜索下拉',
                        defaultValue: 'all',
                        options: [
                            {value: 'all', text: '全部'},
                            {value: '1', text: '和平门'},
                            {value: '2', text: '前门大街'},
                            {value: '3', text: '东直门'},
                            {value: '4', text: '宋家庄'}
                        ]
                    }
                ],
                {
                    type: 'selectMultiple',
                    name: 'selectMultiple',
                    label: '多选下拉',
                    width: 400,
                    defaultValue: ['all', '1', '2'],
                    options: [
                        {value: 'all', text: '全部'},
                        {value: '1', text: '和平门'},
                        {value: '2', text: '前门大街'},
                        {value: '3', text: '东直门'},
                        {value: '4', text: '宋家庄'}
                    ]
                },
                {
                    type: 'radio',
                    name: 'radio',
                    label: '单选',
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
                    type: 'checkboxButton',
                    name: 'checkboxButton',
                    label: '复选按钮',
                    searchOnChange: true,
                    defaultValue: ['22', '44'],
                    options: [
                        {value: '00', text: '搞一个'},
                        {value: '11', text: '多选'},
                        {value: '22', text: '按钮'},
                        {value: '33', text: '怎么样'},
                        {value: '44', text: '呢？'}
                    ]
                },
                [
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
                    }
                ],
                [
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
                    }
                ],
                [
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
                    }
                ],
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
                <SearchCondition options={options} setConditionData={(data)=>this.setState({ conditionData: data})}/>
            </Page>
        );
    }
}
export default ListPage;
