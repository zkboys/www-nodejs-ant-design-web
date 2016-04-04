import React from 'react';
import {Col} from 'antd';
import {getStartAndEndItem} from './utils'
import TimePickerItem from './TimePickerItem'
class TimePickerAreaItem extends React.Component {
    render() {
        let [startItem,endItem] = getStartAndEndItem(this.props);
        return (
            <div style={{display: 'flex',alignItems:'center'}}>
                <TimePickerItem  {...startItem} search={this.props.search} setData={this.props.setData}/>
                <Col><p className="ant-form-split">-</p></Col>
                <TimePickerItem  {...endItem} search={this.props.search} setData={this.props.setData}/>
            </div>
        );
    }
}
export default TimePickerAreaItem
