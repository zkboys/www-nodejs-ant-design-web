import React from 'react';
import {Validation, Button, Form, Input, Breadcrumb} from 'antd';
import {Link} from 'react-router'
import Page from '../page/Page';
const Validator = Validation.Validator;
const FormItem = Form.Item;

function cx(classNames) {
    if (typeof classNames === 'object') {
        return Object.keys(classNames).filter(function (className) {
            return classNames[className];
        }).join(' ');
    } else {
        return Array.prototype.join.call(arguments, ' ');
    }
}

function noop() {
    return false;
}

const ValidationDemo = React.createClass({
    mixins: [Validation.FieldMixin],

    getInitialState() {
        return {
            status: {
                email: {},
                name: {},
                passwd: {},
                rePasswd: {},
                textarea: {}
            },
            formData: {
                email: undefined,
                name: undefined,
                passwd: undefined,
                rePasswd: undefined,
                textarea: undefined
            },
            isEmailOver: false, // email 是否输入完毕
            emailValidateMethod: 'onBlur' // 用于改变 email 的验证方法
        };
    },

    renderValidateStyle(item) {
        const formData = this.state.formData;
        const status = this.state.status;

        const classes = cx({
            'error': status[item].errors,
            'validating': status[item].isValidating,
            'success': formData[item] && !status[item].errors && !status[item].isValidating
        });

        return classes;
    },

    handleEmailInputBlur() {
        this.setState({
            isEmailOver: true
        });
    },

    handleEmailInputFocus() {
        if (this.state.isEmailOver) {
            this.setState({
                emailValidateMethod: 'onChange'
            });
        }
    },

    handleReset(e) {
        this.refs.validation.reset();
        this.setState(this.getInitialState());
        e.preventDefault();
    },

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            isEmailOver: true
        });
        const validation = this.refs.validation;
        validation.validate((valid) => {
            if (!valid) {
                console.log('error in form');
                return;
            } else {
                console.log('submit');
            }
            console.log(this.state.formData);
        });
    },

    userExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(function () {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    },

    checkPass(rule, value, callback) {
        if (this.state.formData.passwd) {
            this.refs.validation.forceValidate(['rePasswd']);
        }

        callback();
    },

    checkPass2(rule, value, callback) {
        if (value && value !== this.state.formData.passwd) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    },

    render() {
        const formData = this.state.formData;
        const status = this.state.status;
        /*
         * 一共24份？
         * */
        const labelCol = {span: 7};
        const wrapperCol = {span: 12};

        function help(field) {
            return status[field].errors ? status[field].errors.join(',') : null;
        }
        const pageHeader = {
            title: '表单校验',
            breadcrumbItems: [
                {text: '某应用'},
                {text: '我的时间', path: '/myTime3'},
                {text: '表单校验'}
            ]
        };
        return (
            <Page header={pageHeader}>
                <Form horizontal>
                    <Validation ref="validation" onValidate={this.handleValidate}>
                        <FormItem
                            label="用户名："
                            id="name"
                            labelCol={labelCol}
                            wrapperCol={wrapperCol}
                            validateStatus={this.renderValidateStyle('name')}
                            hasFeedback
                            help={status.name.isValidating ? '正在校验中..' : (help('name'))}
                            required>
                            <Validator rules={[{required: true, min: 5, message: '用户名至少为 5 个字符'}, {validator: this.userExists}]}>
                                <Input name="name" id="name" value={formData.name} placeholder="实时校验，输入 JasonWood 看看" onChange={this.setField.bind(this, 'name')}/>
                            </Validator>
                        </FormItem>

                        <FormItem
                            label="邮箱："
                            id="email"
                            labelCol={labelCol}
                            wrapperCol={wrapperCol}
                            validateStatus={this.renderValidateStyle('email')}
                            hasFeedback={this.state.isEmailOver}
                            help={help('email')}
                            required>
                            <Validator rules={[{required: true, type:'email', message: '请输入正确的邮箱地址'}]} trigger={this.state.emailValidateMethod}>
                                <Input type="email" name="email" id="email" value={formData.email} placeholder="onBlur 与 onChange 相结合" onBlur={this.handleEmailInputBlur} onFocus={this.handleEmailInputFocus}/>
                            </Validator>
                        </FormItem>

                        <FormItem
                            label="密码："
                            id="password"
                            labelCol={labelCol}
                            wrapperCol={wrapperCol}
                            validateStatus={this.renderValidateStyle('passwd')}
                            hasFeedback
                            help={help('passwd')}
                            required>
                            <Validator rules={[{required: true, whitespace: true, message: '请填写密码'}, {validator: this.checkPass}]}>
                                <Input name="passwd" id="password" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" value={formData.passwd}/>
                            </Validator>
                        </FormItem>

                        <FormItem
                            label="确认密码："
                            id="password2"
                            labelCol={labelCol}
                            wrapperCol={wrapperCol}
                            validateStatus={this.renderValidateStyle('rePasswd')}
                            hasFeedback
                            help={help('rePasswd')}
                            required>
                            <Validator rules={[{required: true,whitespace: true,message: '请再次输入密码'}, {validator: this.checkPass2}]}>
                                <Input name="rePasswd" id="password2" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" value={formData.rePasswd} placeholder="两次输入密码保持一致"/>
                            </Validator>
                        </FormItem>

                        <FormItem
                            label="备注："
                            id="textarea"
                            labelCol={labelCol}
                            wrapperCol={wrapperCol}
                            validateStatus={this.renderValidateStyle('textarea')}
                            help={help('textarea')}
                            required>
                            <Validator rules={[{required: true, message: '真的不打算写点什么吗？'}]}>
                                <Input type="textarea" placeholder="随便写" id="textarea" name="textarea" value={formData.textarea}/>
                            </Validator>
                        </FormItem>

                        <FormItem
                            wrapperCol={Object.assign({},wrapperCol,{span: 12, offset: labelCol.span})}>
                            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleReset}>重置</Button>
                        </FormItem>
                    </Validation>
                </Form>
            </Page>
        );
    }
});
export default ValidationDemo;