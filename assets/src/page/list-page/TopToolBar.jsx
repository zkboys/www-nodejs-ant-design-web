import React from 'react';
import {Row, Col, Button} from 'antd';
import assign from 'object-assign'

class TopToolBar extends React.Component {
    getButtons = ()=> {
        return this.props.options.buttons.map((btn, index)=> {
            return <Col key={index}><Button type="primary" onClick={btn.onClick}>{btn.text}</Button></Col>
        })
    }

    render() {
        return (
            <div className="top-tool-bar">
                <Row
                    type="flex"
                    justify="start"
                    align="middle">
                    {this.getButtons()}
                </Row>
            </div>
        );
    }
}
export default TopToolBar;
