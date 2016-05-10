import './style.less';
import React from 'react';
import assign from 'object-assign';
import moment from 'moment';
import Request from 'superagent';
import FAIcon from '../../common/faicon/FAIcon'
import {
    Select,
    Radio,
    Checkbox,
    Button,
    DatePicker,
    TimePicker,
    InputNumber,
    Input,
    Form,
    Cascader,
    Row,
    Col,
    Tabs,
    Spin,
} from 'antd';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class QueryTerms extends React.Component {
    componentDidMount() {
        //默认值要写在这里
        this.props.options.items.forEach((v)=> {
            if (v instanceof Array) {
                v.forEach((value)=> {
                    this.setDefaultValue(value);
                })
            } else {
                this.setDefaultValue(v);
            }
        });
    };

    static defaultProps = {};
    checkboxValueSeparator = '<@>';
    setDefaultValue = (itemOptions)=> {
        const {getFieldProps, setFieldsValue, getFieldValue} = this.props.form;
        const type = itemOptions.type;
        let defaultValue = itemOptions.defaultValue;
        const name = itemOptions.name;
        const startName = itemOptions.startName;
        const endName = itemOptions.endName;
        let startDefaultValue = itemOptions.startDefaultValue;
        let endDefaultValue = itemOptions.endDefaultValue;
        let options = itemOptions.options;
        if (['select', 'selectSearch', 'selectMultiple'].includes(type)) {
            this.setState({
                [name + 'selectOptions']: options,
            });
            const url = itemOptions.url;
            if (url) {
                options.push({
                    value: undefined,
                    label: <div style={{width:'100%', textAlign:'center'}}>
                        <Spin />
                    </div>
                })
                const optionsFilter = itemOptions.optionsFilter || ((res)=> {
                        return res.body.results;
                    });
                Request
                    .get(url)
                    .end((err, res)=> {
                        if (err) {
                            options = options.filter((v)=> {
                                return v.value !== undefined;
                            });
                            options.push({
                                value: undefined,
                                label: <div style={{width:'100%', textAlign:'center', color:'red'}}>
                                    获取数据失败
                                </div>
                            });
                            this.setState({
                                [name + 'selectOptions']: options
                            })
                        } else {
                            const newOptions = optionsFilter(res);
                            options = options.filter((v)=> {
                                return v.value !== undefined;
                            });
                            this.setState({
                                [name + 'selectOptions']: options.concat(newOptions)
                            })
                        }
                    });
            }

        }
        // 表单元素初始化默认值
        if (['checkbox', 'checkboxButton'].includes(type)) {
            if (typeof defaultValue === 'string') {
                defaultValue = [defaultValue];
            }
            setFieldsValue({
                [itemOptions.name]: undefined,
            });
            options.forEach((v)=> {
                const realValue = v.value;
                // 如果不同组的checkbox有相同的value，就会互相影响
                v.value = name + this.checkboxValueSeparator + v.value;

                let value = v.value;
                if (defaultValue.includes(realValue)) {
                    this.setState({
                        [value]: true
                    });
                    this.props.form.setFieldsValue({
                        [value]: true
                    });
                    let values = getFieldValue(itemOptions.name)
                    if (!values) {
                        values = [];
                    }
                    values.push(realValue);
                    setFieldsValue({
                        [itemOptions.name]: values
                    });
                }
            });
        } else {

            // 日期相关的默认值，如果时string，转为date，方便处理
            if (['date', 'dateArea', 'time', 'timeArea', 'dateTime', 'dateTimeArea'].includes(type)) {
                if (typeof defaultValue === 'string') {
                    defaultValue = moment(defaultValue, 'HH:mm:ss').toDate();
                }
                if (typeof startDefaultValue === 'string') {
                    startDefaultValue = moment(startDefaultValue, 'HH:mm:ss').toDate();
                }
                if (typeof endDefaultValue === 'string') {
                    endDefaultValue = moment(endDefaultValue, 'HH:mm:ss').toDate();
                }
            }
            if ((type === 'tabs' || type === 'tabsCard') && !defaultValue) {
                defaultValue = options[0].value;
            }
            this.setState({
                [name]: defaultValue,
                [startName]: startDefaultValue,
                [endName]: endDefaultValue,
            });
            this.props.form.setFieldsValue({
                [name]: defaultValue,
                [startName]: startDefaultValue,
                [endName]: endDefaultValue,
            });
        }

        // 时间相关的默认格式
        let format = {
            date: 'yyyy-MM-dd',
            dateArea: 'yyyy-MM-dd',
            time: 'HH:mm',
            timeArea: 'HH:mm',
            dateTime: 'yyyy-MM-dd HH:mm',
            dateTimeArea: 'yyyy-MM-dd HH:mm',
        };
        for (let t in format) {
            if (t === type) {
                itemOptions.format = itemOptions.format || format[t];
            }
        }
    };

    state = {};
    handleSubmit = (e)=> {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!', errors);
                return;
            }
            const options = this.props.options;
            const dateToString = options.resultDateToString === undefined ? true : options.resultDateToString;

            if (dateToString) {
                options.items.forEach((value, index, array)=> {
                    if (value instanceof Array) {
                        value.forEach((v)=> {
                            const format = v.format;
                            const name = v.name;
                            const startName = v.startName;
                            const endName = v.endName;

                            if (values[name] instanceof Date) {
                                values[name] = this.dateToString(values[name], format);
                            }
                            if (values[startName] instanceof Date) {
                                values[startName] = this.dateToString(values[startName], format);
                            }
                            if (values[endName] instanceof Date) {
                                values[endName] = this.dateToString(values[endName], format);
                            }
                        })
                    } else {
                        const format = value.format;
                        const name = value.name;
                        const startName = value.startName;
                        const endName = value.endName;

                        if (values[name] instanceof Date) {
                            values[name] = this.dateToString(values[name], format);
                        }
                        if (values[startName] instanceof Date) {
                            values[startName] = this.dateToString(values[startName], format);
                        }
                        if (values[endName] instanceof Date) {
                            values[endName] = this.dateToString(values[endName], format);
                        }
                    }
                });
            }
            options.onSubmit(values);
        });
    };

    dateToString = (date, format)=> {
        format = format.replace('yyyy', 'YYYY');
        format = format.replace('dd', 'DD');
        return moment(date).format(format);
    };

    getItem = (options, itemOptions)=> {
        itemOptions = assign({}, {
            eleWidth: '150px',
            labelWidth: options.labelWidth || '80px'
        }, itemOptions);
        const searchOnChange = itemOptions.searchOnChange;
        const itemType = itemOptions.type;
        const label = itemOptions.label;
        const name = itemOptions.name;
        const startName = itemOptions.startName;
        const endName = itemOptions.endName;
        const props = itemOptions.props;
        const eleWidth = itemOptions.eleWidth;
        const labelWidth = itemOptions.labelWidth;
        let placeholder = itemOptions.placeholder;
        if (placeholder === undefined) {
            if (['input', 'inputNumber', 'combobox'].includes(itemType)) {
                placeholder = `请输入${label}`;
            } else {
                placeholder = `请选择${label}`;
            }
        }
        const labelProps = {
            className: 'query-terms-label',
            style: {
                width: labelWidth,
            }
        };
        let itemProps = {
            className: 'query-terms-item',
            style: {
                width: eleWidth,
            }
        };
        const eleProps = assign(
            {},
            {
                placeholder,
                style: {
                    width: '100%',
                }
            },
            props
        );

        const {getFieldProps, setFieldsValue, getFieldValue} = this.props.form;
        let fieldPropsOptions;
        let startFieldPropsOptions;
        let endFieldPropsOptions;
        if (name) {
            fieldPropsOptions = getFieldProps(name, itemOptions.fieldPropsOptions);
        }
        if (startName) {
            startFieldPropsOptions = getFieldProps(startName, itemOptions.fieldPropsOptions);
        }
        if (endName) {
            endFieldPropsOptions = getFieldProps(endName, itemOptions.fieldPropsOptions);
        }
        const labelJsx = (
            <div {...labelProps}>
                {label}：
            </div>
        );
        const searchDelay = 300;
        eleProps.onChange = (e)=> {
            const value = e && e.target ? e.target.value : e;
            if (['checkbox', 'checkboxButton'].includes(itemType)) {
                const checkValue = e.target.checked;
                const name = e.target.id;
                const realValue = name.split(this.checkboxValueSeparator)[1];

                this.setState({
                    [name]: checkValue
                });
                let values = getFieldValue(itemOptions.name);
                if (!values) {
                    values = [];
                }
                if (checkValue) {
                    values.push(realValue);
                } else {
                    let index = values.indexOf(realValue);
                    if (index !== -1) {
                        values.splice(index, 1)
                    }
                }

                setFieldsValue({
                    [name]: checkValue,
                    [itemOptions.name]: values,
                });
            } else {
                this.setState({
                    [name]: value
                });
                setFieldsValue({
                    [name]: value,
                });
            }

            if (['input', 'inputNumber', 'combobox'].includes(itemType)) {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(()=> {
                    searchOnChange && this.handleSubmit();
                }, searchDelay);
            } else {
                searchOnChange && this.handleSubmit();
            }

        };
        let handleExpandBtnClick = (e)=> {
            let button = e.currentTarget;
            let btnClassNames = button.className.split(' ');
            if (btnClassNames.includes('expanded')) {
                btnClassNames.splice(btnClassNames.indexOf('expanded'), 1);
                button.title = "显示更多";
                this.setState({
                    [name + 'expanded']: false,
                })
            } else {
                btnClassNames.push('expanded');
                button.title = "收起更多";
                this.setState({
                    [name + 'expanded']: true,
                })
            }
            button.className = btnClassNames.join(' ');
        };
        switch (itemType) {
            case 'input':
            {
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <Input {...fieldPropsOptions} {...eleProps}/>
                        </FormItem>
                    </Col>
                );
            }
            case 'inputNumber':
            {
                const min = itemOptions.min;
                const max = itemOptions.max;
                const inputProps = {};
                min !== undefined && (inputProps.min = min);
                max !== undefined && (inputProps.max = max);

                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <InputNumber {...fieldPropsOptions} {...inputProps} {...eleProps}/>
                        </FormItem>
                    </Col>
                );
            }
            case 'combobox':
            {
                let separator = itemOptions.separator;
                let commonHandleChange = eleProps.onChange;

                let handleChange = (value)=> {
                    let comboboxOptions;
                    if (!value || value.indexOf(separator) >= 0) {
                        comboboxOptions = [];
                    } else {
                        comboboxOptions = itemOptions.options.map((opt) => {
                            const label = `${value}${separator}${opt}`;
                            return <Option key={label}>{label}</Option>;
                        });
                    }
                    this.setState({
                        [name + 'comboboxOptions']: comboboxOptions
                    });
                    commonHandleChange && commonHandleChange(value)
                };
                eleProps.onChange = handleChange;
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <Select combobox
                                {...fieldPropsOptions}
                                    filterOption={false}
                                {...eleProps}
                            >
                                {this.state[name + 'comboboxOptions']}
                            </Select>
                        </FormItem>
                    </Col>
                );
            }
            case 'select':
            case 'selectSearch':
            case 'selectMultiple':
            {
                if (itemType === 'selectSearch') {
                    eleProps.showSearch = true;
                    eleProps.optionFilterProp = "children";
                    eleProps.notFoundContent = "无法找到";
                    eleProps.searchPlaceholder = "输入关键词";

                }
                if (itemType === 'selectMultiple') {
                    eleProps.multiple = true;
                }
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <Select {...fieldPropsOptions} {...eleProps}>
                                {this.state[name + 'selectOptions'] && this.state[name + 'selectOptions'].map((v, i)=> {
                                    return <Option key={i} value={v.value}>{v.label}</Option>
                                })}
                            </Select>
                        </FormItem>
                    </Col>
                );
            }
            case 'cascader':
            {
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <Cascader
                                {...fieldPropsOptions}
                                options={itemOptions.options}
                                {...eleProps}
                            />
                        </FormItem>
                    </Col>
                );
            }
            case 'radioButton':
            {
                itemProps.style.marginBottom = '0';
                let showCount = itemOptions.minCount || 10;
                let showExpandedBtn = itemOptions.expandable && itemOptions.options.length > showCount;
                let radioButtons = itemOptions.expandable ? itemOptions.options.filter((v, i, a)=> {
                    if (this.state[name + 'expanded']) {
                        return true;
                    }
                    return i < showCount;
                }) : itemOptions.options;
                return (

                    <Col>
                        <FormItem  {...itemProps} >
                            <div className="radio-btn-label">
                                {labelJsx}
                            </div>
                            <div style={{marginLeft:labelWidth}}>
                                <RadioGroup
                                    {...fieldPropsOptions}
                                    {...eleProps}
                                >
                                    {radioButtons.map((v, i)=> {
                                        return <RadioButton key={i} value={v.value}>{v.label}</RadioButton>
                                    })}
                                    {
                                        showExpandedBtn ?
                                            <Button
                                                type="ghost"
                                                size="large"
                                                title="显示更多"
                                                style={{padding:'0 25px',paddingTop:'1px', fontSize:'19px'}}
                                                onClick={handleExpandBtnClick}
                                            >
                                                <FAIcon type="fa-angle-double-down"/>
                                            </Button>
                                            : ''
                                    }
                                </RadioGroup>
                            </div>
                        </FormItem>
                    </Col>
                );
            }
            case 'radio':
            {
                return (
                    <Col>
                        <FormItem  {...itemProps}>
                            <RadioGroup
                                {...fieldPropsOptions}
                                {...eleProps}
                            >
                                {/*这个label位置比较特殊，为了使单选和label始终同行*/}
                                {labelJsx}
                                {itemOptions.options.map((v, i)=> {
                                    return <Radio key={i} value={v.value}>{v.label}</Radio>
                                })}
                            </RadioGroup>
                        </FormItem>
                    </Col>
                );
            }
            case 'checkbox':
            {
                const valuePropName = 'checked';
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            {itemOptions.options.map((v, i)=> {
                                return (
                                    <div className="check">
                                        <label className="query-terms-item-label">
                                            <Checkbox
                                                {...getFieldProps(v.value, {valuePropName})}
                                                {...eleProps}
                                            />
                                            {v.label}
                                        </label>
                                    </div>
                                )
                            })}
                        </FormItem>
                    </Col>
                );
            }
            case 'checkboxButton':
            {
                let commonHandleChange = eleProps.onChange;
                let handleChange = (value)=> {
                    const e = {
                        target: {
                            checked: !this.state[value],
                            id: value,
                        }
                    };
                    commonHandleChange && commonHandleChange(e)
                };

                itemProps.style.marginBottom = '0';
                let showCount = itemOptions.minCount || 10;
                let showExpandedBtn = itemOptions.expandable && itemOptions.options.length > showCount;
                let checkboxButtons = itemOptions.expandable ? itemOptions.options.filter((v, i, a)=> {
                    if (this.state[name + 'expanded']) {
                        return true;
                    }
                    return i < showCount;
                }) : itemOptions.options;
                return (
                    <Col>
                        <FormItem  {...itemProps} className="checkbox-btn-item">
                            {/*这个label位置比较特殊，为了使按钮和label始终同行*/}
                            {labelJsx}
                            <div style={{marginLeft:labelWidth}}>
                                {checkboxButtons.map((v, i)=> {
                                    let className = ['checkbox-btn'];
                                    if (this.state[v.value]) {
                                        className.push('checkbox-btn-checked');
                                    }
                                    return (
                                        <label className="query-terms-item-label">
                                            <label
                                                className={className.join(' ')}
                                                onClick={()=>{handleChange(v.value)}}
                                            >
                                                {v.label}
                                            </label>
                                        </label>
                                    )

                                })}
                                {
                                    showExpandedBtn ?
                                        <Button
                                            type="ghost"
                                            size="large"
                                            title="显示更多"
                                            style={{padding:'0 25px',paddingTop:'1px', fontSize:'19px'}}
                                            onClick={handleExpandBtnClick}
                                        >
                                            <FAIcon type="fa-angle-double-down"/>
                                        </Button>
                                        : ''
                                }
                            </div>
                        </FormItem>
                    </Col>
                );

            }
            case 'date':
            case 'dateTime':
            case 'time':
            {
                let format = itemOptions.format;
                let Element = DatePicker;
                if (itemType === 'time') {
                    Element = TimePicker;
                }
                if (itemType === 'dateTime') {
                    eleProps.showTime = true;
                }
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <Element
                                {...fieldPropsOptions}
                                format={format}
                                {...eleProps}
                            />
                        </FormItem>
                    </Col>
                );
            }
            case 'dateArea':
            case 'timeArea':
            case 'dateTimeArea':
            {
                let format = itemOptions.format;
                let commonHandleChange = eleProps.onChange;
                let handleChange = (name)=> {
                    return (value)=> {
                        this.setState({
                            [name]: value,
                        });
                        setFieldsValue({
                            [name]: value,
                        });
                        commonHandleChange && commonHandleChange(value);
                    }
                };
                const startEleProps = assign({}, eleProps, {onChange: handleChange(startName)});
                const endEleProps = assign({}, eleProps, {onChange: handleChange(endName)});
                let splitWidth = 20;
                const itemWidth = ((parseInt(eleWidth) - splitWidth) / 2) + 'px';
                splitWidth = splitWidth + 'px';
                itemProps.style.width = itemWidth;

                let disabledStartDate = (startValue)=> {
                    if (!startValue || !this.state[endName]) {
                        return false;
                    }
                    return startValue.getTime() > this.state[endName].getTime();
                };
                let disabledEndDate = (endValue)=> {
                    if (!endValue || !this.state[startName]) {
                        return false;
                    }
                    return endValue.getTime() < this.state[startName].getTime();
                };
                let showTimeProps = {};
                if (itemType === 'dateTimeArea') {
                    showTimeProps.showTime = true;
                }
                return (
                    <Col>
                        {labelJsx}
                        <div className="area-item" style={{width:itemWidth}}>
                            <FormItem  {...itemProps}>
                                {
                                    itemType === 'dateArea' || itemType === 'dateTimeArea' ?
                                        <DatePicker
                                            {...showTimeProps}
                                            disabledDate={disabledStartDate}
                                            {...startFieldPropsOptions}
                                            format={format}
                                            {...startEleProps}
                                        />
                                        :
                                        <TimePicker
                                            {...startFieldPropsOptions}
                                            format={format}
                                            {...startEleProps}
                                        />
                                }

                            </FormItem>
                        </div>
                        <div className="area-split" style={{width:splitWidth}}>
                            <p className="ant-form-split">-</p>
                        </div>
                        <div className="area-item" style={{width:itemWidth}}>
                            <FormItem  {...itemProps}>
                                {
                                    itemType === 'dateArea' || itemType === 'dateTimeArea' ?
                                        <DatePicker
                                            {...showTimeProps}
                                            disabledDate={disabledEndDate}
                                            {...endFieldPropsOptions}
                                            format={format}
                                            {...endEleProps}
                                        />
                                        :
                                        <TimePicker
                                            {...endFieldPropsOptions}
                                            format={format}
                                            {...endEleProps}
                                        />
                                }

                            </FormItem>
                        </div>
                    </Col>
                )
            }
            case 'tabs':
            {
                return (
                    <Tabs
                        onChange={eleProps.onChange}
                        defaultActiveKey={itemOptions.defaultValue}
                    >
                        {itemOptions.options.map((v, i)=> {
                            return (
                                <TabPane tab={v.label} key={v.value}/>
                            )
                        })}
                    </Tabs>
                )

            }
            case 'tabsCard':
            {
                return (
                    <Tabs
                        onChange={eleProps.onChange}
                        defaultActiveKey={itemOptions.defaultValue}
                        type="card"
                    >
                        {itemOptions.options.map((v, i)=> {
                            return (
                                <TabPane tab={v.label} key={v.value}/>
                            )
                        })}
                    </Tabs>
                )

            }
            default:
            {
                throw Error(`查询条件没有此类型：type:${itemType}`);
            }
        }

    };

    render() {
        const options = this.props.options;
        const items = options.items.map((value, index, array)=> {
            const rowProps = {
                type: "flex",
                justify: "start",
                align: "top"
            };
            let searchBtn;
            if (index === array.length - 1 && options.showSearchBtn) {
                searchBtn = (
                    <Col>
                        <FormItem className="query-terms-item" style={{padding: '0 10px'}}>
                            <Button type="primary" onClick={this.handleSubmit}>查询</Button>
                        </FormItem>
                    </Col>
                );
            }
            if (value instanceof Array) {
                // 一行多个查询条件
                return (
                    <Row  {...rowProps}>
                        {value.map((v, i, a)=> {
                            return [
                                this.getItem(options, v),
                                i === a.length - 1 ? searchBtn : undefined
                            ];
                        })}
                    </Row>
                )
            } else {
                // 一行一个查询条件
                return (
                    <Row  {...rowProps}>
                        {this.getItem(options, value)}
                        {searchBtn}
                    </Row>
                )
            }
        });
        return (
            <div className="query-terms">
                <Form horizontal form={this.props.form}>
                    {items}
                </Form>
            </div>
        );
    };
}

QueryTerms = createForm()(QueryTerms);
export default QueryTerms;