import './style.less'
import React from 'react';
import {Row, Col, Button} from 'antd'
import assign from 'object-assign'
import InputItem from './InputItem'
import ComboboxItem from './ComboboxItem'
import LabelItem from './LabelItem'
import DatePickerItem from './DatePickerItem'
import DatePickerAreaItem from './DatePickerAreaItem'
import TimePickerItem from './TimePickerItem'
import TimePickerAreaItem from './TimePickerAreaItem'
import SelectItem from './SelectItem'
import SelectSearchItem from './SelectSearchItem'
import SelectMultipleItem from './SelectMultipleItem'
import SelectCascadedItem from './SelectCascadedItem'
import RadioButtonItem from './RadioButtonItem'
import RadioItem from './RadioItem'
import CheckboxItem from './CheckboxItem'
import CheckboxButtonItem from './CheckboxButtonItem'
class SearchCondition extends React.Component {
    createConditions(options) {
        // TODO 关于日期类型的查询条件，要支持可选时间范围。
        // TODO 校验是否要加？
        // TODO 级联下拉
        //type: checkbox select radioButton input date time dateTime dataArea timeArea dateTimeArea
        let data = {};//保存所有的查询条件数据
        let defaultOptions = {
            showSearchBtn: true,
            labelWidth: '80px',//可选，默认：‘80px’,防止有些label text太长，这里给个全局设置，每个条件可以覆盖这个属性。
            onSearch: function (data) {// 点击查询按钮时的回调函数 data为所有的查询条件
                //如果查询条件未选，或未填写，将不会包含到data中？还是包含，值为undefined;
            }
        };
        let defaultItem = {
            //name: '',// 必选，给后台传数据的时候，会用到这个name
            //label: '',// 必选
            type: 'input',//可选，默认为input，所有的可用类型为： searchSelect,radioButton,input,date,time,dateTime,dataArea,timeArea,dateTimeArea
            //labelWidth: '80px',//可选, 默认为 conditionConfig.labelWidth，如果是Number类型，默认单位为px
            width: '150px',// 可选，默认为150px，控制输入框等大小，如果是Number类型，默认单位为px
            //placeHolder: undefined,// 可选，默认为请输入[label],如果是select等选择类型，默认为：请选择[label]
            searchOnChange: false,// 可选，默认：false， 值改变是否出发onSearch函数
            //defaultValue: undefined,//可选,
            //options: undefined // 如果是select等类型，这个value是个数组，如果是input，value可以为可选，默认：undefined。
        };
        //处理默认值
        options = assign({}, defaultOptions, options);
        options.conditionItems = options.conditionItems.map((item, index, arr)=> {
            if (item instanceof Array) {//一行多个查询条件
                return item.map((it)=> {
                    return getItemOptions(it);
                })
            } else {//一行一个查询条件
                return getItemOptions(item);
            }
        });

        const rowProps = {
            type: "flex",
            justify: "start",
            align: "middle",
            style: {marginBottom: '5px'}
        };

        function getItemOptions(item) {
            if(item.items){
                item.items = item.items.map(i=>getItemOptions(i));
            }
            let itemObj = assign({}, {labelWidth: options.labelWidth}, defaultItem, item);
            itemObj.placeHolder = (itemObj.placeHolder === undefined) && (itemObj.type === 'input' ? '请输入' : '请选择') + itemObj.label;
            return itemObj;
        }

        function getConditions(item, index) {
            switch (item.type) {
                case 'input':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <InputItem key={index} {...item} search={search} setData={setData}/>]
                case 'combobox':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <ComboboxItem key={index} {...item} search={search} setData={setData}/>]

                case 'select':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <SelectItem key={index} {...item} search={search} setData={setData}/>]

                case 'selectSearch':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <SelectSearchItem key={index} {...item} search={search} setData={setData}/>]

                case 'selectMultiple':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <SelectMultipleItem key={index} {...item} search={search} setData={setData}/>]

                case 'selectCascaded':
                    return [
                        <SelectCascadedItem key={index} {...item} search={search} setData={setData}/>]

                case 'radioButton':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <RadioButtonItem key={index} {...item} search={search} setData={setData}/>]
                case 'radio':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <RadioItem key={index} {...item} search={search} setData={setData}/>]

                case 'date':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <DatePickerItem key={index} {...item} search={search} setData={setData}/>]

                case 'time':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <TimePickerItem key={index} {...item} search={search} setData={setData}/>]

                case 'dateTime':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <DatePickerItem key={index} showTime={true} {...item} search={search} setData={setData}/>]

                case 'dateArea':
                {
                    return [
                        <LabelItem key={'label-'+index} {...item}/>,
                        <DatePickerAreaItem key={'start-'+index} {...item} search={search} setData={setData}/>
                    ]
                }
                case 'timeArea':
                {
                    return [
                        <LabelItem key={'label-'+index} {...item}/>,
                        <TimePickerAreaItem key={'start-'+index} {...item} search={search} setData={setData}/>
                    ]
                }
                case 'dateTimeArea':
                {
                    return [
                        <LabelItem key={'label-'+index} {...item}/>,
                        <DatePickerAreaItem showTime={true} key={'start-'+index} {...item} search={search}
                                            setData={setData}/>
                    ]
                }
                case 'checkbox':
                {
                    return [
                        <LabelItem key={'label-'+index} {...item}/>,
                        <CheckboxItem key={'start-'+index} {...item} search={search} setData={setData}/>
                    ]
                }
                case 'checkboxButton':
                {
                    return [
                        <LabelItem key={'label-'+index} {...item}/>,
                        <CheckboxButtonItem key={'start-'+index} {...item} search={search} setData={setData}/>
                    ]
                }
                case 'customer':
                {
                    return [
                        <LabelItem key={'label-'+index} {...item}/>,
                        <item.component key={index} {...item} search={search} setData={setData}/>
                    ]
                }
                default:
                {
                    return []
                }
            }
        }

        function setData(name, value) {
            data[name] = value;
        }

        function search() {
            options.onSearch && options.onSearch(data);
        }

        return options.conditionItems.map((item, index, arr)=> {
            let cols = [];
            if (item instanceof Array) {//一行多个查询条件
                cols = item.map((it, i)=>getConditions(it, index + '-' + i));
            } else {//一行一个查询条件
                cols = getConditions(item, index);
            }
            if (options.showSearchBtn && cols && (index === arr.length - 1)) {
                let submitButton = <Col key="submit-buttom" style={{marginLeft:'5px'}}><Button type="primary" onClick={search}>查询</Button></Col>;
                cols.push(submitButton);
            }
            return <Row key={index} {...rowProps}>{cols}</Row>
        });
    }

    render() {
        return (
            <div className="search-area">
                {this.createConditions(this.props.options)}
            </div>
        );
    }
}
export default SearchCondition;
