import './style.less'
import React from 'react';
import { Breadcrumb,Row,Col, Form, Select,Radio, Input,Button ,DatePicker} from 'antd'
import assign from 'object-assign'
import Page from '../../framework/page/Page';
import InputItem from '../search-condition/InputItem'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let ListPage = React.createClass({
    getInitialState() {
        return {
            loading: false,
            conditions: {
                store: 'all',
                orderId: undefined,
                date: 'today',
                tel: undefined
            }
        };
    },
    handleStoreChange(value){
        let preState = assign({}, this.state);
        preState.conditions.store = value;
        this.setState(assign({}, this.state, preState));
    },
    handleDateChange(e){
        let preState = assign({}, this.state);
        preState.conditions.date = e.target.value;
        this.setState(assign({}, this.state, preState));
    },
    handleOrderIdChange(e){
        let preState = assign({}, this.state);
        preState.conditions.orderId = e.target.value;
        this.setState(assign({}, this.state, preState));
    },
    handleTelChange(e){
        let preState = assign({}, this.state);
        preState.conditions.tel = e.target.value;
        this.setState(assign({}, this.state, preState));
    },

    handleSubmit(e){
        e.preventDefault();
        //console.log(this.state.conditions);
        console.log(InputItem.getData());

    },
    createConditions(options){
        //type: select searchSelect radio radioButton input date time dateTime dataArea timeArea dateTimeArea
        let singleValueItems = 'input date time'.split(' ');
        let towValueItems = 'dateTime dataArea timeArea dateTimeArea'.split(' ');
        let multipleValueItems = 'select searchSelect radio radioButton'.split(' ');
        let defaultItem = {
            //name: 'store',// 给后台传数据的时候，会用到这个name
            //label: '门店',
            type: 'input',//可选，默认为input，所有的可用类型为： searchSelect,radioButton,input,date,time,dateTime,dataArea,timeArea,dateTimeArea
            labelWidth: '70px',//可选, 默认为 conditionConfig.labelWidth
            defaultValue: undefined,//可选, 默认为value[0] 或者 undefined
            placeHolder: undefined,// 可选，默认为请输入[label],如果是select等选择类型，默认为：请选择[label]
            searchOnChange: false,// 可选，默认：false， 值改变是否出发onSearch函数
            value: undefined // 如果是select等类型，这个value是个数组，如果是input，value可以为可选，默认：undefined。
        };
        //处理默认值
        options = assign({}, {
            labelWidth: '70px',//可选，默认：‘70px’,防止有些label text太长，这里给个全局设置，每个条件可以覆盖这个属性。
            eleSpan: '4',// 可选，默认：‘4’， 查询元素，比如 input 宽度，1～24,会加在Col span属性上
            onSearch: function (data) {// 点击查询按钮时的回调函数 data为所有的查询条件
                //如果查询条件未选，或未填写，将不会包含到data中？还是包含，值为undefined;
            }
        }, options);
        options.conditionItems = options.conditionItems.map((item, index, arr)=> {
            if (item instanceof Array) {//一行多个查询条件
                return item.map((it)=> {
                    let itemObj = assign({}, defaultItem, it);
                    itemObj.placeHolder = (itemObj.placeHolder === undefined) && (itemObj.type === 'input' ? '请输入' : '请选择') + itemObj.label;
                    return itemObj;
                })
            } else {//一行一个查询条件
                let itemObj = assign({}, defaultItem, item);
                itemObj.placeHolder = (itemObj.placeHolder === undefined) && (itemObj.type === 'input' ? '请输入' : '请选择') + itemObj.label;
                return itemObj;
            }
        });
        console.log(options);
        const labelColProps = {
            style: {flexBasis: '70px', textAlign: 'right'}
        };
        const rowProps = {
            type: "flex",
            justify: "start",
            align: "middle",
            style: {marginBottom: '5px'}
        };
    },
    render() {
        const conditions = this.state.conditions;
        let options = {
            labelWidth: '70px',//可选，默认：‘70px’,防止有些label text太长，这里给个全局设置，每个条件可以覆盖这个属性。
            eleSpan: '4',// 可选，默认：‘4’， 查询元素，比如 input 宽度，1～24,会加在Col span属性上
            onSearch: function (data) {// 点击查询按钮时的回调函数 data为所有的查询条件
                //如果查询条件未选，或未填写，将不会包含到data中？还是包含，值为undefined;
            },
            conditionItems: [//每一个查询条件
                [],//一行多个条件，为数组
                {//一行一个条件，为对象
                    name: 'store',// 给后台传数据的时候，会用到这个name
                    label: '门店',
                    type: 'select',//可选，默认为input，所有的可用类型为： searchSelect,radioButton,input,date,time,dateTime,dataArea,timeArea,dateTimeArea
                    //labelWidth: '70px',//可选, 默认为 conditionConfig.labelWidth
                    //defaultValue: '0',//可选, 默认为value[0]
                    //placeHolder: '请输入门店',// 可选，默认为请输入[label],如果是select等选择类型，默认为：请选择[label]
                    searchOnChange: false,// 可选，默认：false， 值改变是否出发onSearch函数
                    value: [// 如果是select等类型，这个value是个数组，如果是input，value可以为可选，默认：undefined。
                        {value: 0, text: '全部'},
                        {value: 1, text: '和平门'},
                        {value: 2, text: '前门大街'}
                    ]
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
        this.createConditions(options);
        const labelColProps = {
            style: {flexBasis: '70px', textAlign: 'right'}
        };
        const rowProps = {
            type: "flex",
            justify: "start",
            align: "middle",
        };


        return (
            <Page header="auto" loading={this.state.loading}>
                <div className="search-area">
                    <InputItem.component label="测试" name="aaa" value="bbb" labelWidth="70px"/>
                    <Row {...rowProps}>
                        <Col {...labelColProps}>门店：</Col>
                        <Col span="4">
                            <Select
                                showSearch
                                style={{width:'100%'}}
                                placeholder="请选择门店"
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                searchPlaceholder="输入关键词"
                                defaultValue="all"
                                onChange={this.handleStoreChange}>
                                <Option value="all">全部</Option>
                                <Option value="001">三元桥</Option>
                                <Option value="002">和平们</Option>
                                <Option value="003">前门大街</Option>
                                <Option value="all1">全部1</Option>
                                <Option value="0011">三元桥1</Option>
                                <Option value="0021">和平们1</Option>
                                <Option value="0031">前门大街1</Option>
                                <Option value="all2">全部2</Option>
                                <Option value="0012">三元桥2</Option>
                                <Option value="0022">和平们2</Option>
                                <Option value="0032">前门大街2</Option>
                                <Option value="all3">全部3</Option>
                                <Option value="0013">三元桥3</Option>
                                <Option value="0023">和平们3</Option>
                                <Option value="0033">前门大街3</Option>
                                <Option value="all4">全部4</Option>
                                <Option value="0014">三元桥4</Option>
                                <Option value="0024">和平们4</Option>
                                <Option value="0034">前门大街4</Option>
                                <Option value="all5">全部5</Option>
                                <Option value="0015">三元桥5</Option>
                                <Option value="0025">和平们5</Option>
                                <Option value="0035">前门大街5</Option>
                                <Option value="all6">全部6</Option>
                                <Option value="0016">三元桥6</Option>
                                <Option value="0026">和平们6</Option>
                                <Option value="0036">前门大街6</Option>
                                <Option value="all7">全部7</Option>
                                <Option value="0017">三元桥7</Option>
                                <Option value="0027">和平们7</Option>
                                <Option value="0037">前门大街7</Option>
                                <Option value="all8">全部8</Option>
                                <Option value="0018">三元桥8</Option>
                                <Option value="0028">和平们8</Option>
                                <Option value="0038">前门大街8</Option>
                            </Select>
                        </Col>
                        <Col span="8">
                            <Row {...rowProps}>
                                <Col {...labelColProps}>
                                    订单号：
                                </Col>
                                <Col>
                                    <Input
                                        placeholder="请输入订单号"
                                        onChange={this.handleOrderIdChange}
                                        value={conditions.orderId}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col {...labelColProps}>
                            收货电话：
                        </Col>
                        <Col span="4">
                            <Input
                                placeholder="请输入收货电话"
                                onChange={this.handleTelChange}
                                value={conditions.tel}/>
                        </Col>
                    </Row>
                    <Row {...rowProps}>
                        <Col {...labelColProps}>
                            用餐日期：
                        </Col>
                        <Col>
                            <RadioGroup
                                defaultValue="today"
                                onChange={this.handleDateChange}>
                                <RadioButton value="today">今天</RadioButton>
                                <RadioButton value="tomorrow">明天</RadioButton>
                                <RadioButton value="2016-04-04">2016-04-04</RadioButton>
                                <RadioButton value="2016-04-05">2016-04-05</RadioButton>
                                <RadioButton value="2016-04-06">2016-04-06</RadioButton>
                                <RadioButton value="2016-04-07">2016-04-07</RadioButton>
                                <RadioButton value="2016-04-08">2016-04-08</RadioButton>
                            </RadioGroup>

                        </Col>
                    </Row>
                    <Row {...rowProps}>
                        <Col {...labelColProps}>
                            用餐时间：
                        </Col>
                        <Col span="4">
                            <RadioGroup defaultValue="all">
                                <RadioButton value="all">全部</RadioButton>
                                <RadioButton value="lunch">午餐</RadioButton>
                                <RadioButton value="dinner">晚餐</RadioButton>
                            </RadioGroup>
                        </Col>
                        <Col {...labelColProps}>
                            时间范围：
                        </Col>
                        <Col>
                            <DatePicker name="startDate" value=""/>
                        </Col>
                        <Col>
                            <p className="ant-form-split">-</p>
                        </Col>
                        <Col>
                            <DatePicker name="endDate" value=""/>
                        </Col>
                        <Col style={{marginLeft:'5px'}}>
                            <Button type="primary" onClick={this.handleSubmit}>查询</Button>
                        </Col>
                    </Row>
                </div>
                <div className="top-tool-bar">
                    顶部工具条
                </div>
                <div className="data-table">
                    表格
                </div>
                <div className="bottom-tool-bar">
                    底部工具条
                </div>
            </Page>
        );
    }
});
export default ListPage;
