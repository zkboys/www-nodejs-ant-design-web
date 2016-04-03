import React from 'react';
import {Row, Col, Checkbox} from 'antd';
import assign from 'object-assign'
class CheckboxItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: new Set(this.props.defaultValue || [])
    };

    componentDidMount() {
        this.props.setData(this.props.name, this.state.value);
    }

    handleChange = (e)=> {
        let value = e.target.value;
        let values = this.state.value;
        if (e.target.checked) {
            values.add(value);
        } else {
            values.delete(value);
        }
        this.props.setData(this.props.name, values);
        this.setState({
            value: values
        });
        if (this.props.searchOnChange) {
            // 加入函数节流功能。
            this.props.search();
        }
    };

    render() {
        let checkboxes = this.props.options.map((opt, index)=> {
            let checked = this.props.defaultValue && this.props.defaultValue.indexOf(opt.value) > -1;
            return (
                <label key={index} style={{cursor:'pointer', marginRight:'20px'}}>
                    <Checkbox defaultChecked={checked} onChange={this.handleChange} value={opt.value}
                              name={this.props.name}/>
                    {opt.text}
                </label>
            )

        });
        return (
            <Col>
                {checkboxes}
            </Col>
        );
    }
}
export default CheckboxItem
