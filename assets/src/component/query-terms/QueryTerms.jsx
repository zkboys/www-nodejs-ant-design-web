import './style.less';
import {Select, Radio, Checkbox, Button, DatePicker, InputNumber, Form, Cascader, Row, Col} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;

let Demo = React.createClass({
    componentDidMount() {
        this.props.form.setFieldsValue({
            eat: true,
            sleep: true,
            beat: true,
        });
    },

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!', errors);
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    },

    checkBirthday(rule, value, callback) {
        if (value && value.getTime() >= Date.now()) {
            callback(new Error('你不可能在未来出生吧!'));
        } else {
            callback();
        }
    },

    checkPrime(rule, value, callback) {
        if (value !== 11) {
            callback(new Error('8~12之间的质数明明是11啊!'));
        } else {
            callback();
        }
    },

    render() {
        const address = [
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
        ];
        const {getFieldProps} = this.props.form;
        const selectProps = getFieldProps('select', {
            rules: [
                {required: true, message: '请选择您的国籍'}
            ],
        });
        const radioProps = getFieldProps('radio', {
            rules: [
                {required: true, message: '请选择您的性别'}
            ]
        });
        const birthdayProps = getFieldProps('birthday', {
            rules: [
                {
                    required: true,
                    type: 'date',
                    message: '你的生日是什么呢?',
                }, {
                    validator: this.checkBirthday,
                }
            ]
        });
        const primeNumberProps = getFieldProps('primeNumber', {
            rules: [{validator: this.checkPrime}],
        });
        const addressProps = getFieldProps('address', {
            rules: [{required: true, type: 'array'}],
        });
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 12},
        };
        const rowProps = {
            type: "flex",
            justify: "start",
            align: "top"
        };
        const labelProps = {
            style: {
                width: '100px',
            }
        }

        return (
            <div className="query-terms">
                <Form horizontal form={this.props.form}>
                    <Row  {...rowProps}>
                        <Col>
                            <div className="query-terms-label" {...labelProps}>
                                8~12间的质数：
                            </div>
                            {/*
                                FormItem设置一个宽度，其中的子元素宽度设置为100%，宽度好控制。
                            */}
                            <FormItem className="query-terms-item" style={{width:'200px'}}>
                                <InputNumber {...primeNumberProps} min={8} max={12} style={{width:'100%'}}/>
                            </FormItem>
                        </Col>
                        <Col>
                            <div className="query-terms-label" {...labelProps}>
                                我是五个字：
                            </div>
                            <FormItem className="query-terms-item" style={{width:'200px'}}>
                                <Select {...selectProps} placeholder="请选择国家" style={{ width: '100%' }}>
                                    <Option value="china">中国</Option>
                                    <Option value="use">美国</Option>
                                    <Option value="japan">日本</Option>
                                    <Option value="korean">韩国</Option>
                                    <Option value="Thailand">泰国</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="query-terms-label" {...labelProps}>
                                生日：
                            </div>
                            <FormItem className="query-terms-item" style={{width:'200px'}}>
                                <DatePicker {...birthdayProps} style={{width:'100%'}}/>
                            </FormItem>
                        </Col>

                        <Col>
                            <div className="query-terms-label" {...labelProps}>
                                兴趣爱好：
                            </div>
                            <FormItem className="query-terms-item" style={{width:'200px'}}>
                                <Checkbox {...getFieldProps('eat', {
                                    valuePropName: 'checked',
                                })} />吃饭饭 &nbsp;
                                <Checkbox {...getFieldProps('sleep', {
                                    valuePropName: 'checked',
                                })} />睡觉觉 &nbsp;
                                <Checkbox {...getFieldProps('beat', {
                                    valuePropName: 'checked',
                                })} />打豆豆 &nbsp;
                            </FormItem>
                        </Col>
                    </Row>
                    <Row  {...rowProps}>
                        <Col>
                            <div className="query-terms-label" {...labelProps}>
                                性别：
                            </div>
                            <FormItem className="query-terms-item" style={{width:'200px'}}>
                                <RadioGroup {...radioProps}>
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col>
                            <div className="query-terms-label" {...labelProps}>
                                选择地址：
                            </div>
                            <FormItem className="query-terms-item" style={{width:'200px'}}>
                                <Cascader {...addressProps} options={address} style={{width:'100%'}}/>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem className="query-terms-item" style={{padding:'0 10px'}}>
                                <Button type="primary" onClick={this.handleSubmit}>查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    },
});

Demo = createForm()(Demo);
export default Demo;