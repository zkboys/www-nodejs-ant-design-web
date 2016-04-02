import './style.less'
import React from 'react';
import { Breadcrumb,Row,Col, Form, Select,Radio, Input,Button ,DatePicker} from 'antd'
import assign from 'object-assign'
import Page from '../../framework/page/Page';
import SearchCondition from '../search-condition/SearchCondition'

let ListPage = React.createClass({
    getInitialState() {
        return {
            loading: false
        };
    },
    render() {
        let options = {
            //labelWidth: '80px',//可选，默认：‘80px’,防止有些label text太长，这里给个全局设置，每个条件可以覆盖这个属性。
            onSearch: function (data) {// 点击查询按钮时的回调函数 data为所有的查询条件
                //如果查询条件未选，或未填写，将不会包含到data中？还是包含，值为undefined;
            },
            conditionItems: [//每一个查询条件
                [],//一行多个条件，为数组
                [
                    {//一行一个条件，为对象
                        name: 'store',// 给后台传数据的时候，会用到这个name
                        label: '门店',
                        type: 'input',//可选，默认为input，所有的可用类型为： searchSelect,radioButton,input,date,time,dateTime,dataArea,timeArea,dateTimeArea
                        labelWidth: '80px',//可选, 默认为 conditionConfig.labelWidth
                        //defaultValue: '0',//可选, 默认为value[0]
                        //placeHolder: '请输入门店',// 可选，默认为请输入[label],如果是select等选择类型，默认为：请选择[label]
                        searchOnChange: true,// 可选，默认：false， 值改变是否出发onSearch函数
                        //options: [// 如果是select等类型，这个value是个数组，如果是input，value可以为可选，默认：undefined。
                        //    {value: 0, text: '全部'},
                        //    {value: 1, text: '和平门'},
                        //    {value: 2, text: '前门大街'}
                        //]
                    },
                    {
                        name: 'name',
                        label: '客户姓名',
                        type: 'input',
                        width: 300
                    }
                ],
                [
                    {
                        type: 'select',
                        name: 'testSelect',
                        label: '我是下拉',
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
                        type: 'radioButton',
                        name: 'radioButton',
                        label: '悬着按钮',
                        defaultValue: 'all',
                        options: [
                            {value: 'all', text: '全部'},
                            {value: '1', text: '和平门'},
                            {value: '2', text: '前门大街'},
                            {value: '3', text: '东直门'},
                            {value: '4', text: '宋家庄'}
                        ]
                    }],
                [
                    {
                        type: 'dateArea',
                        name: 'joinTime',
                        label: '加入时间',
                        options: ['2016-06-06', '2016-07-07']

                    },
                    {
                        name: 'age',
                        label: '年龄啊',
                        type: 'input'
                    }
                ],
                {

                    type: 'date',
                    name: 'date',
                    label: '日期',
                    value: '2015-01-01'
                },
                {
                    type: 'customer',//自定义查询条件
                    component: '',
                    getDate: function () {
                        return {
                            name: 'customer',
                            value: '这个是我自定义的'
                        }
                    }
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
