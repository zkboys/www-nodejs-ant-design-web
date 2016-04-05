import React from 'react';
import {Col, Select} from 'antd';
import PubSubMsg from '../../common/pubsubmsg';
class SelectItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.defaultValue,
        options: this.props.options
    };
    componentDidMount() {
        let _this = this;
        _this.props.setData(this.props.name, this.props.defaultValue);
        PubSubMsg.subscribe('setNextOptions' + _this.props.name, 'aa', function (data) {
            _this.setState({
                value: [],
                options: data.options
            });
            _this.props.setData(_this.props.name, undefined);
        });
    }

    handleChange = (value)=> {
        this.setState({
            value: value
        });
        if (this.props.setNextOptions) {
            this.props.setNextOptions(value);
        }
        this.props.setData(this.props.name, value);
        if (this.props.searchOnChange) {
            this.props.search();
        }
    };

    render() {
        let options = this.state.options && this.state.options.map((opt, index)=><Option key={index} value={opt.value}>{opt.text}</Option>);
        return (
            <Col>
                <Select
                    {...this.props.searchPros}
                    {...this.props.multipleProps}
                    notFoundContent="没有数据"
                    style={{width:this.props.width}}
                    placeholder={this.props.placeHolder}
                    optionFilterProp="children"
                    defaultValue={this.props.defaultValue}
                    value={this.state.value}
                    onChange={this.handleChange}>
                    {options}
                </Select>
            </Col>
        );
    }
}
export default SelectItem
