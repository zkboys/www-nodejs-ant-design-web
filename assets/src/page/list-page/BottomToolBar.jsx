import React from 'react';
import {Pagination,Row, Col, Button} from 'antd';

class BottomToolBar extends React.Component {
    state = {
        pageSize: this.props.pageSize
    };
    handleChange = (currentPage, pageSize)=> {
        if (pageSize) {
            this.setState({
                pageSize
            });
            currentPage = 1;
        } else {
            pageSize = this.state.pageSize;
        }
        if (this.props.handleSearch) {
            this.props.handleSearch(currentPage, pageSize);
        }
    };
    getButtons = ()=> {
        return this.props.buttons.map((btn, index)=> {
            return <Col key={index}><Button type="primary" onClick={btn.onClick}>{btn.text}</Button></Col>
        })
    }

    render() {
        return (
            <div className="bottom-tool-bar">
                <Pagination
                    showSizeChanger
                    showQuickJumper
                    onShowSizeChange={this.handleChange}
                    onChange={this.handleChange}
                    defaultCurrent={1}
                    pageSize={this.props.pageSize}
                    current={this.props.currentPage}
                    total={this.props.totalCount}/>
                <div className="total-count">共{Math.ceil(this.props.totalCount / this.props.pageSize)}页 {this.props.totalCount}条数据</div>
                <div className="button-group">
                    <Row
                        type="flex"
                        justify="start"
                        align="middle">
                        {this.getButtons()}
                    </Row>
                </div>
                <div style={{clear:'both'}}></div>
            </div>
        );
    }
}
export default BottomToolBar;
