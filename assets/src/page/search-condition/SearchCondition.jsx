import React from 'react';
import {Row, Col} from 'antd'
import assign from 'object-assign'
import InputItem from './InputItem'
import LabelItem from './LabelItem'
import DatePickerItem from './DatePickerItem'
import SelectItem from './SelectItem'
import RadioButtonItem from './RadioButtonItem'
class SearchCondition extends React.Component {
    createConditions(options){
        // TODO 关于日期类型的查询条件，要支持可选时间范围。
        // TODO 校验是否要加？
        //type: select radio radioButton input date time dateTime dataArea timeArea dateTimeArea
        let singleValueItems = 'input date time'.split(' ');
        let towValueItems = 'dateTime dateArea timeArea dateTimeArea'.split(' ');
        let multipleValueItems = 'select searchSelect radio radioButton'.split(' ');
        let data = {};//保存所有的查询条件数据
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
        options = assign({}, {
            labelWidth: '80px',//可选，默认：‘80px’,防止有些label text太长，这里给个全局设置，每个条件可以覆盖这个属性。
            onSearch: function (data) {// 点击查询按钮时的回调函数 data为所有的查询条件
                //如果查询条件未选，或未填写，将不会包含到data中？还是包含，值为undefined;
            }
        }, options);
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
        let conditions = options.conditionItems.map((item, index)=> {
            if (item instanceof Array) {//一行多个查询条件
                let cols = item.map((it, i)=>getConditions(it, index + '-' + i));
                return <Row key={index} {...rowProps}>{cols}</Row>

            } else {//一行一个查询条件
                console.log(getConditions(item, index));
                return <Row {...rowProps} key={index}>{getConditions(item, index)}</Row>;
            }

        });

        function getItemOptions(item) {
            let itemObj = assign({}, {labelWidth: options.labelWidth}, defaultItem, item);
            itemObj.placeHolder = (itemObj.placeHolder === undefined) && (itemObj.type === 'input' ? '请输入' : '请选择') + itemObj.label;
            return itemObj;
        }

        function getConditions(item, index) {
            switch (item.type) {
                case 'input':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <InputItem key={index} {...item} search={search} setData={setData}/>]

                case 'select':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <SelectItem key={index} {...item} search={search} setData={setData}/>]

                case 'radioButton':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <RadioButtonItem key={index} {...item} search={search} setData={setData}/>]

                case 'date':
                    return [<LabelItem key={'label-'+index} {...item}/>,
                        <DatePickerItem key={index} {...item} search={search} setData={setData}/>]

                case 'dateArea':
                {
                    let startItem = assign({}, {
                        name: item.name + 'Start',
                        defaultValue: item.options && (item.options.length > 0 ? item.options[0] : undefined)
                    }, item);
                    let endItem = assign({}, {
                        name: item.name + 'End',
                        defaultValue: item.options && (item.options.length > 1 ? item.options[1] : undefined)
                    }, item);
                    return [
                        <LabelItem key={'label-'+index} {...item}/>,
                        <DatePickerItem key={'start-'+index} {...startItem} search={search} setData={setData}/>,
                        <Col key={'-'+index}><p className="ant-form-split">-</p></Col>,
                        <DatePickerItem key={'end-'+index} {...endItem} search={search} setData={setData}/>
                    ]
                }
            }
        }

        function setData(name, value) {
            data[name] = value;
        }

        function search() {
            console.log('我特么是表单数据：', data);
        }
        return conditions;
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
