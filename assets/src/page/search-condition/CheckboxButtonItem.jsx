import React from 'react';
import {Col, Button} from 'antd';
import assign from 'object-assign'
const ButtonGroup = Button.Group;
class CheckboxButtonItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.options.map((opt, index)=> {
            let checked = this.props.defaultValue && this.props.defaultValue.indexOf(opt.value) > -1;
            return {
                type: checked ? "primary" : "ghost",
                value: opt.value,
                text: opt.text
            }
        })
    };

    componentDidMount() {
        this.props.setData(this.props.name, this.props.defaultValue);
    }

    handleClick = (index)=> {
        let stateValue = this.state.value;
        let opt = stateValue[index];
        if (opt.type == "primary") {
            opt.type = "ghost";
        } else {
            opt.type = "primary";
        }
        this.setState(
            {value: stateValue}
        );
        let values = stateValue.filter(opt=>opt.type == "primary").map(opt=>opt.value);
        this.props.setData(this.props.name, values);
        if (this.props.searchOnChange) {
            this.props.search();
        }
    }

    render() {
        let checkboxes = this.state.value.map((opt, index)=> {
            return (
                <Button
                    style={{paddingLeft:'15px',paddingRight:'15px'}}
                    key={index}
                    type={opt.type}
                    onClick={e=>{this.handleClick(index)}}>
                    {opt.text}
                </Button>
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
