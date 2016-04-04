import React from 'react';
import {Col, Select} from 'antd';
class SelectItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        options: []
    };

    componentDidMount() {
        this.props.setData(this.props.name, this.props.defaultValue);
    }

    handleChange = (value)=> {
        let separator = this.props.separator;
        let options;
        if (separator) {
            if (!value || value.indexOf(separator) >= 0) {
                options = [];
            } else {
                options = this.props.options.map((domain) => {
                    const val = `${value}${separator}${domain}`;
                    return <Option key={val}>{val}</Option>;
                });
            }
        } else {
            let isEndsWidth = this.props.options.filter((opt)=>value.endsWith(opt));
            if (isEndsWidth&&isEndsWidth.length) {
                options = [];
            } else {
                options = this.props.options.map((domain) => {
                    const val = `${value}${domain}`;
                    return <Option key={val}>{val}</Option>;
                });
            }
        }

        this.setState({options});

        this.props.setData(this.props.name, value);
        if (this.props.searchOnChange) {
            this.props.search();
        }
    }

    render() {
        // filterOption 需要设置为 false，数据是动态设置的
        return (
            <Select combobox
                    style={{ width: 200 }}
                    onChange={this.handleChange}
                    filterOption={false}
                    defaultValue={this.props.defaultValue}
                    searchPlaceholder="请输入账户名">
                {this.state.options}
            </Select>
        );
    }
}
export default SelectItem
