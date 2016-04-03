import React from 'react';
import {Row, Col, TimePicker} from 'antd';
class TimePickerItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.defaultValue
    };

    componentDidMount() {
        this.props.setData(this.props.name, this.state.value);
    }

    handleChange = (value)=> {
        value = value && value.toLocaleTimeString('zh-CN', {hour12: false})
        this.props.setData(this.props.name, value);
        this.setState({
            value: value
        });
        if (this.props.searchOnChange) {
            this.props.search();
        }
    };

    render() {
        return (
            <Col>
                <TimePicker
                    style={{width:this.props.width}}
                    defaultValue={this.props.defaultValue}
                    format="HH:mm"
                    onChange={this.handleChange}/>
            </Col>
        );
    }
}
export default TimePickerItem;
