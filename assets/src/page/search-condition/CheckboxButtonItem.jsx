import React from 'react';
import {Col, Button} from 'antd';
import assign from 'object-assign'
const ButtonGroup = Button.Group;
class CheckboxButtonItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: new Set(this.props.defaultValue || [])
    };

    componentDidMount() {
        this.props.setData(this.props.name, Array.from(this.state.value));
    }

    handleChange = (e)=> {
        let value = e.target.value;
        let values = this.state.value;
        if (e.target.checked) {
            values.add(value);
        } else {
            values.delete(value);
        }
        this.props.setData(this.props.name, Array.from(values));
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
                <Button key={index} type={checked?"primary":"ghost"}value={opt.value}>{opt.text}</Button>
            )

        });
        return (
            <Col>
                <ButtonGroup>
                    {checkboxes}
                </ButtonGroup>
            </Col>
        );
    }
}
export default CheckboxButtonItem
