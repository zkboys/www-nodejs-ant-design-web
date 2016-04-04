import React from 'react';
import {Col} from 'antd';
import DatePickerItem from './DatePickerItem'
import {getStartAndEndItem} from './utils'
class DatePickerAreaItem extends React.Component {
    render() {
        let [startItem,endItem] = getStartAndEndItem(this.props);
        return (
            <div style={{display: 'flex',alignItems:'center'}}>
                <DatePickerItem  {...startItem} search={this.props.search} setData={this.props.setData}/>
                <Col><p className="ant-form-split">-</p></Col>
                <DatePickerItem  {...endItem} search={this.props.search} setData={this.props.setData}/>
            </div>
        );
    }
}
export default DatePickerAreaItem
