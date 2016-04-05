import React from 'react';
import {Table} from 'antd';
import assign from 'object-assign'

class DataTable extends React.Component {
    state = {};

    setTableHeight() {
        document.querySelector('.admin-container .admin-page .admin-page-content').style.overflow = 'hidden';
        let tableBody = document.querySelector('.data-table .ant-table-header + .ant-table-body');
        let adminHeader = document.querySelector('.admin-header');
        let adminHeaderHeight = adminHeader.offsetHeight;
        let condition = document.querySelector('.list-page .search-condition');
        let conditionHeight = condition.offsetHeight;
        let topToolBar = document.querySelector('.list-page .top-tool-bar');
        let topToolBarHeight = topToolBar.offsetHeight;
        let tableHead = document.querySelector('.data-table .ant-table-header');
        let tableHeadHeight = tableHead.offsetHeight;

        let pageBottomHeight = document.querySelector('.bottom-tool-bar').offsetHeight;
        let orderHeight = 75 +
            adminHeaderHeight +
            conditionHeight +
            topToolBarHeight +
            tableHeadHeight +
            pageBottomHeight;
        console.log(adminHeaderHeight,
            conditionHeight,
            topToolBarHeight,
            tableHeadHeight,
            pageBottomHeight);
        let windowHeight = window.innerHeight;
        let tableBodyHeight = (windowHeight - orderHeight) + 'px';
        tableBody.style.height = tableBodyHeight;
    }

    componentDidMount() {
        let timer = 0;
        window.onresize = ()=> {
            if (!timer) {
                timer = setTimeout(()=> {
                    this.setTableHeight();
                    timer = 0;
                }, 250)
            }
        }
        this.setTableHeight();
    }

    render() {
        return (
            <div className="data-table">
                <Table columns={this.props.columns} dataSource={this.props.tableData} pagination={false} useFixedHeader/>
            </div>
        );
    }
}
export default DataTable;
