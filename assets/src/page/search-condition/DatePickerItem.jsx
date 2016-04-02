import React from 'react';
import {Row, Col, DatePicker} from 'antd';
class DatePickerItem extends React.Component {
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
                <DatePicker
                    style={{width:this.props.width}}
                    format="yyyy-MM-dd"
                    name={this.props.name}
                    value={this.state.value}
                    onChange={this.handleChange}/>
            </Col>
        );
    }
}
export default DatePickerItem;
