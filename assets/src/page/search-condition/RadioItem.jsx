import React from 'react';
import {Col, Radio} from 'antd';
const RadioGroup = Radio.Group;
class RadioItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.defaultValue
    };

    componentDidMount() {
        this.props.setData(this.props.name, this.props.defaultValue);
    }

    handleChange = (e)=> {
        let value = e.target.value;
        this.props.setData(this.props.name, value);
        this.setState({
            value: value
        });
        if (this.props.searchOnChange) {
            this.props.search();
        }
    };

    render() {
        let options = this.props.options.map((opt, index)=><Radio key={index} value={opt.value}>{opt.text}</Radio>);
        return (
            <Col>
                <Col>
                    <RadioGroup
                        defaultValue={this.props.defaultValue}
                        onChange={this.handleChange}>
                        {options}
                    </RadioGroup>

                </Col>
            </Col>
        );
    }
}
export default RadioItem
