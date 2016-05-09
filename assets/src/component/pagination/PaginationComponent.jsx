import './style.less';
import React from 'react';
import assign from 'object-assign';
import {Pagination, Row, Col, Button} from 'antd';

class PaginationComponent extends React.Component {
    state = {
        pageSize: this.props.options.pageSize
    };
    static defaultProps = {};
    handleChange = (currentPage, pageSize)=> {
        if (pageSize) {
            this.setState({
                pageSize
            });
            currentPage = 1;
        } else {
            pageSize = this.state.pageSize;
        }
        if (this.props.options.onChange) {
            this.props.options.onChange(currentPage, pageSize);
        }
    };

    render() {
        let options = this.props.options;
        options = assign({}, {
            showSizeChanger: true,
            showQuickJumper: true,
            showMessage: true,
        }, options);
        
        const pageSize = options.pageSize;
        const currentPage = options.currentPage;
        const totalCount = options.totalCount;
        const showSizeChanger = options.showSizeChanger;
        const showQuickJumper = options.showQuickJumper;
        const showMessage = options.showMessage;
        const props = {};
        showSizeChanger && (props.showSizeChanger = true);
        showQuickJumper && (props.showQuickJumper = true);

        return (
            <div className="pagination-component">
                <Pagination
                    {...props}
                    onShowSizeChange={this.handleChange}
                    onChange={this.handleChange}
                    defaultCurrent={1}
                    pageSize={pageSize}
                    current={currentPage}
                    total={totalCount}/>
                {showMessage ?
                    <div className="total-count">
                        共{Math.ceil(totalCount / pageSize)}页 {totalCount}条数据
                    </div>
                    : ''
                }
                <div style={{clear:'both'}}></div>
            </div>
        );
    }
}
export default PaginationComponent;
