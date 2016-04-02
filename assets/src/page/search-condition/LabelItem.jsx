import React from 'react';
import {Col} from 'antd';
class LabelItem extends React.Component {
    render() {
        const labelColProps = {
            style: {
                flexBasis: this.props.labelWidth,
                textAlign: 'right'
            }
        };
        return (
            <Col {...labelColProps}>
                {this.props.label}：
            </Col>
        );
    }
}
export default LabelItem;