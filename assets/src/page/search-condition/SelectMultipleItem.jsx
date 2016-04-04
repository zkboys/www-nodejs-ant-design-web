import React from 'react';
import {Col, Select} from 'antd';
import SelectItem from './SelectItem'
class SelectMultipleItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let multipleProps = {
            multiple:true
        };
        return (
            <SelectItem multipleProps={multipleProps} {...this.props}/>
        );
    }
}
export default SelectMultipleItem
