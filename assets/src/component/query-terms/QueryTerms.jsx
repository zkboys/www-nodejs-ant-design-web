import './style.less';
import assign from 'object-assign';
import moment from 'moment';
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
        const {getFieldProps, setFieldsValue, getFieldValue} = this.props.form;
        const type = itemOptions.type;
        let defaultValue = itemOptions.defaultValue;
        const name = itemOptions.name;
        const startName = itemOptions.startName;
        const endName = itemOptions.endName;
        let startDefaultValue = itemOptions.startDefaultValue;
        let endDefaultValue = itemOptions.endDefaultValue;
        const options = itemOptions.options;

        // 表单元素初始化默认值
        if (itemOptions.type === 'checkbox') {
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
                    let values = getFieldValue(itemOptions.name)
                    if (!values) {
                        values = [];
                    }
                    values.push(name);
                    setFieldsValue({
                        [itemOptions.name]: values
                    });
                }
            }
        } else {
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
    static defaultProps = {
        options: {
            showSearchBtn: true,              // 可选，默认true 是否显示查询按钮
            labelWidth: '100px',               // 可选，默认：‘80px’,全局设置label长度，每个条件可以覆盖这个属性。
            eleWidth: '150px',                // 可选，默认：‘150px’,全局元素长度，每个条件可以覆盖这个属性。
            onSearch: function (data) {       // 必选，点击查询按钮时的回调函数 data为所有的查询条件数据，可以在这个函数中发起请求等操作。
                console.log('***', data);
            },
            items: [
                // 如果是对象，自己占据一行
                {
                    type: 'input',             // 必须，查询条件类型
                    label: '普通输入框',           // 必须，查询条件显示的label
                    name: 'userName',          // 必须，查询条件数据name
                    labelWidth: '80px',        // 可选，默认为 全局labelWidth，如果是Number类型，默认单位为px
                    eleWidth: '250px',         // 可选，默认为 全局eleWidth，控制输入框等大小，如果是Number类型，默认单位为px, 可以为auto
                    searchOnChange: true,      // 可选，默认：false， 值改变是否出发onSearch函数
                    //placeholder: '我是提示',    // 可选，默认为请输入[label],如果是select等选择类型，默认为：请选择[label]
                    defaultValue: 'all',       // 可选，默认值，checkbox，checkboxButton这个值为数组。
                    fieldPropsOptions: {},     // 可选，用来添加校验等，参见http://ant.design/components/form/#this-props-form-getfieldprops-id-options
                    min: undefined,            // 可选，inputNumber 专用
                    max: undefined,            // 可选，inputNumber 专用
                    props: {},                 // 可选，加在表单元素上的props 一般情况下不要用。
                    format: '',                 // 可选，yyyy-MM-dd yyyy-MM-dd HH:mm:ss HH:mm
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
                        eleWidth: '500px',
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
                        type: 'radioButton',
                        name: 'radioButton2',
                        label: '可收展单选按钮',
                        eleWidth: 'auto', // 启用展开收起功能时，eleWidth建议使用auto
                        searchOnChange: true,
                        defaultValue: 1,
                        expandable: true,// 是否启用展开收起功能
                        minCount: 5, // 如果使用展开收起功能，收起时，显示的个数
                        options: [
                            {value: 1, label: '单选一'},
                            {value: 2, label: '单选二'},
                            {value: 3, label: '单选三'},
                            {value: 4, label: '单选四'},
                            {value: 5, label: '单选五'},
                            {value: 6, label: '单选六'},
                            {value: 7, label: '单选七'},
                            {value: 8, label: '单选八'},
                            {value: 9, label: '单选九'},
                            {value: 10, label: '单选十'},
                            {value: 11, label: '单选十一'},
                            {value: 12, label: '单选十二'},
                            {value: 13, label: '单选十三'},
                            {value: 14, label: '单选十四'},
                            {value: 15, label: '单选十五'},
                            {value: 16, label: '单选十六'},
                            {value: 17, label: '单选十七'},
                            {value: 18, label: '单选十八'},
                            {value: 19, label: '单选十九'},
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
                ],
                {
                    type: 'date',
                    name: 'dateName',
                    label: '日期',
                    eleWidth: '300px',
                    //defaultValue: new Date(), // 这样也可以
                    defaultValue: '2016-05-08',
                },
                {
                    type: 'time',
                    name: 'timeName',
                    label: '时间',
                    eleWidth: '300px',
                    //defaultValue: new Date(),
                    defaultValue: '22:22',
                },
                {
                    type: 'dateTime',
                    name: 'dateTimeName',
                    label: '日期+时间',
                    eleWidth: '300px',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    //defaultValue: new Date(),
                    defaultValue: '2016-05-08 02:53:58',
                },
                {
                    type: 'dateArea',
                    startName: 'dateAreaNameStart',
                    endName: 'dateAreaNameEnd',
                    //startDefaultValue: new Date(),
                    //endDefaultValue: new Date(),
                    startDefaultValue: '2016-05-08',
                    endDefaultValue: '2016-05-08',
                    label: '日期区间',
                    eleWidth: '300px',
                    format: 'yyyy-MM-dd',
                },
                {
                    type: 'timeArea',
                    startName: 'timeAreaNameStart',
                    endName: 'timeAreaNameEnd',
                    //startDefaultValue: new Date(),
                    //endDefaultValue: new Date(),
                    startDefaultValue: '22:22',
                    endDefaultValue: '22:22',
                    label: '时间区间',
                    eleWidth: '300px',
                    format: 'HH:mm',
                },
                {
                    type: 'dateTimeArea',
                    startName: 'dateTimeAreaNameStart',
                    endName: 'dateTimeAreaNameEnd',
                    //startDefaultValue: new Date(),
                    //endDefaultValue: new Date(),
                    startDefaultValue: '2016-05-08 22:22',
                    endDefaultValue: '2016-05-08 22:22',
                    label: '日期+时间区间',
                    eleWidth: '300px',
                    format: 'yyyy-MM-dd HH:mm',
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
        let itemProps = {
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
                    const checkValue = e.target.checked;
                    const name = e.target.id;
                    this.setState({
                        [name]: checkValue
                    });
                    let values = getFieldValue(itemOptions.name);
                    if (!values) {
                        values = [];
                    }
                    if (checkValue) {
                        values.push(name);
                    } else {
                        let index = values.indexOf(name);
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
                        this.handleSubmit();
                    }, searchDelay);
                } else {
                    this.handleSubmit();
                }

            }
        }
        let areaElement = ()=> {
            let type = itemOptions.type;
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
            if (type === 'dateTimeArea') {
                showTimeProps.showTime = true;
            }
            return (
                <Col>
                    {labelJsx}
                    <div className="area-item" style={{width:itemWidth}}>
                        <FormItem  {...itemProps}>
                            {
                                type === 'dateArea' || type === 'dateTimeArea' ?
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
                                type === 'dateArea' || type === 'dateTimeArea' ?
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
            );
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

                    console.log(button.className);

                };
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
                            <RadioGroup
                                {...fieldPropsOptions}
                                {...eleProps}
                            >
                                {/*这个label位置比较特殊，为了使button和label始终同行*/}
                                {labelJsx}
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
                break;
            }
            case 'date':
            {
                let format = itemOptions.format;
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
                let format = itemOptions.format;
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
                let format = itemOptions.format;
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
                return areaElement();
            }
            case 'timeArea':
            {
                return areaElement();
            }
            case 'dateTimeArea':
            {
                return areaElement();
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

QueryTerms = createForm()(QueryTerms);
export default QueryTerms;