import './style.less';
import assign from 'object-assign';
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
} from 'antd';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;

class QueryTerms extends React.Component {
    componentDidMount() {
        //默认值要写在这里
        this.props.options.items.map((v)=> {
            if (v instanceof Array) {
                v.map((value)=> {
                    this.setDefaultValue(value);
                })
            } else {
                this.setDefaultValue(v);
            }
        });
    };

    setDefaultValue = (itemOptions)=> {
        let defaultValue = itemOptions.defaultValue;
        let startDefaultValue = itemOptions.startDefaultValue;
        let endDefaultValue = itemOptions.endDefaultValue;
        if (itemOptions.type === 'checkbox') {
            const options = itemOptions.options;
            if (typeof defaultValue === 'string') {
                defaultValue = [defaultValue];
            }
            for (let i = 0; i < options.length; i++) {
                let name = options[i].value;
                if (defaultValue.includes(name)) {
                    this.setState({
                        [name]: true
                    });
                    this.props.form.setFieldsValue({
                        [name]: true
                    });
                }
            }
        } else {
            const name = itemOptions.name;
            const startName = itemOptions.startName;
            const endName = itemOptions.endName;
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
    };

    state = {}
    static defaultProps = {
        options: {
            showSearchBtn: true,              // 可选，默认true 是否显示查询按钮
            labelWidth: '100px',               // 可选，默认：‘80px’,全局设置label长度，每个条件可以覆盖这个属性。
            eleWidth: '150px',                // 可选，默认：‘150px’,全局元素长度，每个条件可以覆盖这个属性。
            onSearch: function (data) {       // 必选，点击查询按钮时的回调函数 data为所有的查询条件数据，可以在这个函数中发起请求等操作。
                console.log('***', data);
                console.log(JSON.stringify(data));
            },
            items: [
                // 如果是对象，自己占据一行
                {
                    type: 'input',             // 必须，查询条件类型
                    label: '普通输入框',           // 必须，查询条件显示的label
                    name: 'userName',          // 必须，查询条件数据name
                    labelWidth: '80px',        // 可选，默认为 全局labelWidth，如果是Number类型，默认单位为px
                    eleWidth: '250px',         // 可选，默认为 全局eleWidth，控制输入框等大小，如果是Number类型，默认单位为px
                    searchOnChange: true,      // 可选，默认：false， 值改变是否出发onSearch函数
                    //placeholder: '我是提示',    // 可选，默认为请输入[label],如果是select等选择类型，默认为：请选择[label]
                    defaultValue: 'all',       // 可选，默认值，checkbox，checkboxButton这个值为数组。
                    fieldPropsOptions: {},     // 可选，用来添加校验等，参见http://ant.design/components/form/#this-props-form-getfieldprops-id-options
                    min: undefined,            // 可选，inputNumber 专用
                    max: undefined,            // 可选，inputNumber 专用
                    props: {},                 // 可选，加在表单元素上的props 一般情况下不要用。
                    format: '',                 // 可选，yyyy-MM-dd yyyy-MM-dd HH:mm HH:mm
                    options: [                 // 可选/必须，单值条件（input等）没有这个属性，多值条件（checkbox，checkboxButton,radioButton等）组件专用属性
                        {value: 'all', label: '全部'},
                        {value: '1', label: '和平门'},
                        {value: '2', label: '前门大街'},
                        {value: '3', label: '东直门'},
                        {value: '4', label: '宋家庄'}
                    ]
                },
                // 如果是数组，数组中所有的组件共占一行
                [
                    {
                        type: 'radioButton',
                        name: 'radioButton',
                        label: '单选按钮',
                        eleWidth: 'auto',
                        searchOnChange: true,
                        defaultValue: 1,
                        options: [
                            {value: 1, label: '单选一'},
                            {value: 2, label: '单选二'},
                            {value: 3, label: '单选三'},
                            {value: 4, label: '单选四'},
                        ]
                    },
                    {
                        type: 'radio',
                        name: 'radioName',
                        label: '单选',
                        eleWidth: 'auto',
                        searchOnChange: true,
                        defaultValue: 1,
                        options: [
                            {value: 1, label: '单选一'},
                            {value: 2, label: '单选二'},
                            {value: 3, label: '单选三'},
                            {value: 4, label: '单选四'},
                        ]
                    },
                    {
                        type: 'inputNumber',
                        name: 'number',
                        label: '数字',
                        min: 0,
                        max: 100,
                        defaultValue: 88,
                        searchOnChange: true
                    },
                ],
                [
                    {
                        type: 'cascader',
                        name: 'cascaderName',
                        label: '级联下拉',
                        options: [
                            {
                                value: 'zhejiang',
                                label: '浙江',
                                children: [{
                                    value: 'hangzhou',
                                    label: '杭州',
                                }],
                            },
                            {
                                value: 'beijing',
                                label: '北京',
                                children: [
                                    {
                                        value: 'xichengqu',
                                        label: '西城区',
                                    },
                                    {
                                        value: 'xidan',
                                        label: '西单',
                                    }
                                ],
                            },
                        ]
                    },
                    {
                        type: 'combobox',
                        name: 'comboboxName',
                        label: '提示输入框',
                        separator: '@',
                        options: [
                            '163.com',
                            'qq.com',
                            '126.com',
                            'xx.com',
                        ],
                    },
                    {
                        type: 'select',
                        name: 'selectName',
                        label: '普通下拉',
                        defaultValue: '112',
                        options: [
                            {value: '111', label: '中国'},
                            {value: '112', label: '中国1'},
                            {value: '113', label: '中国2'},
                            {value: '22', label: '美国3'},
                            {value: '33', label: '俄罗斯'},
                            {value: '44', label: '加拿大'},
                        ],
                    },
                    {
                        type: 'selectSearch',
                        name: 'selectSearchName',
                        label: '搜索下拉',
                        defaultValue: '112',
                        options: [
                            {value: '11', label: '中国'},
                            {value: '111', label: '中国1'},
                            {value: '112', label: '中国2'},
                            {value: '113', label: '中国3'},
                            {value: '22', label: '美国'},
                            {value: '33', label: '俄罗斯'},
                            {value: '44', label: '加拿大'},
                        ],
                    },
                    {
                        type: 'selectMultiple',
                        name: 'selectMultipleName',
                        label: '多选下拉',
                        //defaultValue: '112', // 这样也可以
                        defaultValue: ['11', '112'],
                        options: [
                            {value: '11', label: '中国'},
                            {value: '111', label: '中国1'},
                            {value: '112', label: '中国2'},
                            {value: '113', label: '中国3'},
                            {value: '22', label: '美国'},
                            {value: '33', label: '俄罗斯'},
                            {value: '44', label: '加拿大'},
                        ],
                    },
                    {
                        type: 'checkbox',
                        name: 'checkboxName',
                        label: '多选框',
                        eleWidth: 'auto',
                        defaultValue: '33',
                        options: [
                            {value: '11', label: '中国'},
                            {value: '22', label: '美国'},
                            {value: '33', label: '俄罗斯'},
                            {value: '44', label: '加拿大'},
                        ],
                    },
                    {
                        type: 'date',
                        name: 'dateName',
                        label: '日期',
                        eleWidth: '300px',
                        defaultValue: new Date(),
                    },
                ],
                {
                    type: 'time',
                    name: 'timeName',
                    label: '时间',
                    eleWidth: '150px',
                    defaultValue: new Date(),
                },
                {
                    type: 'dateTime',
                    name: 'dateTimeName',
                    label: '日期+时间',
                    eleWidth: '300px',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    defaultValue: new Date(),
                },
                {
                    type: 'dateArea',
                    startName: 'dateAreaNameStart',
                    endName: 'dateAreaNameEnd',
                    startDefaultValue: new Date(),
                    endDefaultValue: new Date(),
                    label: '日期区间',
                    eleWidth: '300px',
                    format: 'yyyy-MM-dd',
                },
                {
                    type: 'dateTimeArea',
                    startName: 'dateTimeAreaNameStart',
                    endName: 'dateTimeAreaNameEnd',
                    startDefaultValue: new Date(),
                    endDefaultValue: new Date(),
                    label: '日期+时间区间',
                    eleWidth: '300px',
                    format: 'yyyy-MM-dd HH:mm',
                },
                {
                    type: 'timeArea',
                    startName: 'timeAreaNameStart',
                    endName: 'timeAreaNameEnd',
                    startDefaultValue: new Date(),
                    endDefaultValue: new Date(),
                    label: '时间区间',
                    eleWidth: '300px',
                    format: 'HH:mm',
                },
            ]
        }
    };

    onSearch = (data)=> {
        // 这个方法会被 options.onSearch 重新复制
    };

    handleSubmit = (e)=> {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!', errors);
                return;
            }
            this.onSearch(values);
        });
    };

    getItem = (options, itemOptions)=> {
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
                width: labelWidth || options.labelWidth,
            }
        };
        const itemProps = {
            className: 'query-terms-item',
            style: {
                width: eleWidth || options.eleWidth,
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

        // FIXME 为了调试方便，这里统一使用 searchOnChange= true
        //if (searchOnChange) {
        if (true) {
            const searchDelay = 300;
            eleProps.onChange = (e)=> {
                const value = e && e.target ? e.target.value : e;
                if (itemType === 'checkbox') {
                    const value = e.target.checked;
                    const name = e.target.id;
                    this.setState({
                        [name]: value
                    });
                    setFieldsValue({
                        [name]: value
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
                        this.handleSubmit();
                    }, searchDelay);
                } else {
                    this.handleSubmit();
                }

            }
        }
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
                const props = {};
                min !== undefined && (props.min = min);
                max !== undefined && (props.max = max);

                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <InputNumber {...fieldPropsOptions} {...props} {...eleProps}/>
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
            {
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <Select {...fieldPropsOptions} {...eleProps}>
                                {itemOptions.options.map((v, i)=> {
                                    return <Option key={i} value={v.value}>{v.label}</Option>
                                })}
                            </Select>
                        </FormItem>
                    </Col>
                );
            }
            case 'selectSearch':
            {
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <Select
                                showSearch
                                {...fieldPropsOptions}
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                searchPlaceholder="输入关键词"
                                {...eleProps}
                            >
                                {itemOptions.options.map((v, i)=> {
                                    return <Option key={i} value={v.value}>{v.label}</Option>
                                })}
                            </Select>
                        </FormItem>
                    </Col>
                );
            }
            case 'selectMultiple':
            {
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <Select
                                multiple
                                {...fieldPropsOptions}
                                {...eleProps}
                            >
                                {itemOptions.options.map((v, i)=> {
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
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <RadioGroup
                                {...fieldPropsOptions}
                                {...eleProps}
                            >
                                {itemOptions.options.map((v, i)=> {
                                    return <RadioButton key={i} value={v.value}>{v.label}</RadioButton>
                                })}
                            </RadioGroup>
                        </FormItem>
                    </Col>
                );
            }
            case 'radio':
            {
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <RadioGroup
                                {...fieldPropsOptions}
                                {...eleProps}
                            >
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
                break;
            }
            case 'date':
            {
                let format = itemOptions.format || 'yyyy-MM-dd';
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <DatePicker
                                {...fieldPropsOptions}
                                format={format}
                                {...eleProps}
                            />
                        </FormItem>
                    </Col>
                );
            }
            case 'time':
            {
                let format = itemOptions.format || 'HH:mm';
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <TimePicker
                                {...fieldPropsOptions}
                                format={format}
                                {...eleProps}
                            />
                        </FormItem>
                    </Col>
                );
            }
            case 'dateTime':
            {
                let format = itemOptions.format || 'yyyy-MM-dd HH:mm';
                return (
                    <Col>
                        {labelJsx}
                        <FormItem  {...itemProps}>
                            <DatePicker
                                showTime
                                {...fieldPropsOptions}
                                format={format}
                                {...eleProps}
                            />
                        </FormItem>
                    </Col>
                );
            }
            case 'dateArea':
            {
                let format = itemOptions.format || 'yyyy-MM-dd';
                let commonHandleChange = eleProps.onChange;
                let handleChange = (name)=> {
                    return (value)=> {
                        this.setState({
                            [name]: value
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

                return (
                    <Col>
                        {labelJsx}
                        <div className="area-item" style={{width:itemWidth}}>
                            <FormItem  {...itemProps}>
                                <DatePicker
                                    disabledDate={disabledStartDate}
                                    {...startFieldPropsOptions}
                                    format={format}
                                    {...startEleProps}
                                />
                            </FormItem>
                        </div>
                        <div className="area-split" style={{width:splitWidth}}>
                            <p className="ant-form-split">-</p>
                        </div>
                        <div className="area-item" style={{width:itemWidth}}>
                            <FormItem  {...itemProps}>
                                <DatePicker
                                    disabledDate={disabledEndDate}
                                    {...endFieldPropsOptions}
                                    format={format}
                                    {...endEleProps}
                                />
                            </FormItem>
                        </div>
                    </Col>
                );
            }
            case 'timeArea':
            {
                let format = itemOptions.format || 'yyyy-MM-dd HH:mm';
                let commonHandleChange = eleProps.onChange;
                let handleChange = (name)=> {
                    return (value)=> {
                        this.setState({
                            [name]: value
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

                return (
                    <Col>
                        {labelJsx}
                        <div className="area-item" style={{width:itemWidth}}>
                            <FormItem  {...itemProps}>
                                <TimePicker
                                    {...startFieldPropsOptions}
                                    format={format}
                                    {...startEleProps}
                                />
                            </FormItem>
                        </div>
                        <div className="area-split" style={{width:splitWidth}}>
                            <p className="ant-form-split">-</p>
                        </div>
                        <div className="area-item" style={{width:itemWidth}}>
                            <FormItem  {...itemProps}>
                                <TimePicker
                                    {...endFieldPropsOptions}
                                    format={format}
                                    {...endEleProps}
                                />
                            </FormItem>
                        </div>
                    </Col>
                );
            }
            case 'dateTimeArea':
            {
                let format = itemOptions.format || 'yyyy-MM-dd HH:mm';
                let commonHandleChange = eleProps.onChange;
                let handleChange = (name)=> {
                    return (value)=> {
                        this.setState({
                            [name]: value
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

                return (
                    <Col>
                        {labelJsx}
                        <div className="area-item" style={{width:itemWidth}}>
                            <FormItem  {...itemProps}>
                                <DatePicker
                                    showTime
                                    disabledDate={disabledStartDate}
                                    {...startFieldPropsOptions}
                                    format={format}
                                    {...startEleProps}
                                />
                            </FormItem>
                        </div>
                        <div className="area-split" style={{width:splitWidth}}>
                            <p className="ant-form-split">-</p>
                        </div>
                        <div className="area-item" style={{width:itemWidth}}>
                            <FormItem  {...itemProps}>
                                <DatePicker
                                    showTime
                                    disabledDate={disabledEndDate}
                                    {...endFieldPropsOptions}
                                    format={format}
                                    {...endEleProps}
                                />
                            </FormItem>
                        </div>
                    </Col>
                );
            }
            default:
            {
                throw Error(`查询条件没有此类型：type:${itemType}`);
            }
        }
    };

    render() {
        const options = this.props.options;
        this.onSearch = options.onSearch;
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
                //console.log(value);
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
;

QueryTerms = createForm()(QueryTerms);
export default QueryTerms;