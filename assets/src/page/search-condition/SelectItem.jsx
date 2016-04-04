import React from 'react';
import {Col, Select} from 'antd';
class SelectItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.defaultValue
    };

    componentDidMount() {
        this.props.setData(this.props.name, this.props.defaultValue);
    }

    handleChange = (value)=> {
        this.props.setData(this.props.name, value);
        this.setState({
            value: value
        });
        if (this.props.searchOnChange) {
            this.props.search();
        }
    };

    render() {
        let options = this.props.options.map((opt, index)=><Option key={index} value={opt.value}>{opt.text}</Option>);
        return (
            <Col>
                <Select
                    {...this.props.searchPros}
                    {...this.props.multipleProps}
                    style={{width:this.props.width}}
                    placeholder={this.props.placeHolder}
                    optionFilterProp="children"
                    defaultValue={this.props.defaultValue}
                    onChange={this.handleChange}>
                    {options}
                </Select>
            </Col>
        );
    }
}
export default SelectItem
