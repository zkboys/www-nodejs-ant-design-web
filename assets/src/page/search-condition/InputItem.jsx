import React from 'react';
import {Row, Col, Input} from 'antd';
class InputItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.defaultValue
    };

    componentDidMount() {
        this.props.setData(this.props.name, this.state.value);
    }

    handleChange = (e)=> {
        let value = e.target.value;
        this.props.setData(this.props.name, value);
        this.setState({
            value: value
        });
        if (this.props.searchOnChange) {
            // 加入函数节流功能。
            this.props.search();
        }
    };

    render() {
        return (
            <Col>
                <Input
                    style={{width:this.props.width}}
                    placeholder={this.props.placeHolder}
                    onChange={this.handleChange}
                    value={this.state.value}/>
            </Col>
        );
    }
}
export default InputItem
