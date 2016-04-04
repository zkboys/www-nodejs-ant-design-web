import React from 'react';
import {Col, Select} from 'antd';
import SelectItem from './SelectItem'
class SelectSearchItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let searchPros = {
            showSearch: true,
            searchPlaceholder: "输入关键词",
            notFoundContent: "无法找到"
        }
        return (
            <SelectItem searchPros={searchPros} {...this.props}/>
        );
    }
}
export default SelectSearchItem
