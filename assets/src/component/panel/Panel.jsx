/*
 * 自定义面板组件
 * */
import './style.less';
import React from 'react';
import {Row, Col } from 'antd';
import assign from 'object-assign'
class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: [
            {
                title: '默认标题',
                subTitle: '默认副标题'
            }
        ],
        width: '100%'
    };

    render() {
        let headers = [];
        if (!(this.props.header instanceof Array)) {
            if (typeof this.props.header === 'string') {
                headers.push({
                    title: this.props.header
                });
            } else {
                headers.push(this.props.header);
            }

        } else {
            headers = this.props.header;
        }
        let headerJsx = [];
        let headerLength = headers.length;
        let span = Math.floor(12 / headerLength);
        for (let i = 0; i < headerLength; i++) {
            let h = headers[i];
            headerJsx.push(<Col key={i+'-title'} span={String(span)} className="title">{h.title}</Col>);
            headerJsx.push(<Col key={i+'-sub-title'} span={String(span)} className="sub-title">{h.subTitle || ' '}</Col>);
        }
        let style = assign({}, {width: this.props.width}, this.props.style);
        return (
            <div className={"panel-wrap " + (this.props.className||'')} style={style}>
                <div className="header">
                    <Row>
                        {headerJsx}
                    </Row>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default Panel;
