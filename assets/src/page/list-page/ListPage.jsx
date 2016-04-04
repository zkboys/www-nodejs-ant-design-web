import './style.less'
import React from 'react';
import { Breadcrumb,Row,Col, Form, Select,Radio, Input,Button ,DatePicker, Checkbox} from 'antd'
import assign from 'object-assign'
import Page from '../../framework/page/Page';
import SearchCondition from '../search-condition/SearchCondition'
import InputItem from '../search-condition/InputItem'

const CheckboxGroup = Checkbox.Group;

let ListPage = React.createClass({
    getInitialState() {
        return {
            loading: false
        };
    },
    render() {
        let options = {
            showSearchBtn: false,
            //labelWidth: '80px',//可选，默认：‘80px’,防止有些label text太长，这里给个全局设置，每个条件可以覆盖这个属性。
            onSearch: function (data) {// 点击查询按钮时的回调函数 data为所有的查询条件
                //如果查询条件未选，或未填写，将不会包含到data中？还是包含，值为undefined;
                console.log(data);
                console.log(JSON.stringify(data));
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
                [
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
                    label: '复选框按钮',
                    searchOnChange: true,
                    defaultValue: ['1', '5', '3'],
                    options: [
                        {value: 'all', text: '搞一个'},
                        {value: '1', text: '多选'},
                        {value: '2', text: '按钮'},
                        {value: '3', text: '怎么样'},
                        {value: '4', text: '呢？'}
                    ]
                },
                {
                    type:'customer',
                    name:'customer',
                    label:'用户自定义',
                    component:InputItem
                }
            ]
        };
        return (
            <Page header="auto" loading={this.state.loading}>
                <SearchCondition options={options}/>
                <label>
                    <Checkbox defaultChecked={false} onChange={onChange} value="1" name="aa"/>
                    Checkbox1
                </label>
                <label>
                    <Checkbox defaultChecked={false} onChange={onChange} value="2" name="aa"/>
                    Checkbox2
                </label>
            </Page>
        );
    }
});
function onChange(e) {
    console.log(e.target.name, e.target.value);
    console.log(`checked = ${e.target.checked}`);
}
export default ListPage;
