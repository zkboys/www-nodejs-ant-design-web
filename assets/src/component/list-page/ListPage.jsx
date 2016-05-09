import React from 'react';
import assign from 'object-assign'
import QueryTerms from '../query-terms/QueryTerms';
import PaginationComponent from '../pagination/PaginationComponent'
import Page from '../../framework/page/Page';

import {
    Table,
    Icon,
    Button,
} from 'antd';

class ListPage extends React.Component {
    state = {
        queryData: {
            currentPage: 1,
            pageSize: 10,
            totalCount: 100,
        },
        tableData: []

    };

    componentDidMount() {
        this.handleSearch(this.state.queryData);
    };

    handleSearch = (queryData)=> {
        const currentPage = queryData.currentPage;
        const pageSize = queryData.pageSize;
        // 这里可以发请求，获取后端得数据
        let tableData = [];
        for (let i = 0; i < pageSize; i++) {
            tableData.push({
                key: i,
                name: `模拟数据${currentPage}--${i}`,
                age: 32,
                address: `西湖区湖底公园${i}号`
            });
        }
        queryData.totalCount = 77;

        this.setState({
            queryData,
            tableData,
        })
    };

    render() {
        const queryTermsOptions = {
            showSearchBtn: true,
            resultDateToString: true,
            onSubmit: (data)=> {
                let queryData = assign({}, this.state.queryData, data, {currentPage: 1});
                this.setState({
                    queryData
                });
                this.handleSearch(queryData);
            },
            items: [
                {
                    type: 'tabs',
                    name: 'tabsName',
                    defaultValue: 'finance',
                    searchOnChange: true,
                    options: [
                        {value: 'technology', label: '技术部'},
                        {value: 'finance', label: '财务部'},
                        {value: 'humanResources', label: '人力资源部'},
                        {value: 'marketing', label: '市场部'},
                    ]
                },
                [
                    {
                        type: 'input',
                        name: 'userName',
                        label: '用户名',
                        labelWidth: '50px'
                    },
                    {
                        type: 'inputNumber',
                        name: 'age',
                        label: '年龄',
                        labelWidth: '50px'
                    },
                ]
            ]
        }
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render(text) {
                    return <a href="#">{text}</a>;
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                key: 'operation',
                render(text, record) {
                    return (
                        <span>
                            <a href="#">操作一{record.name}</a>
                            <span className="ant-divider"></span>
                            <a href="#">操作二</a>
                            <span className="ant-divider"></span>
                            <a href="#" className="ant-dropdown-link">
                              更多 <Icon type="down"/>
                            </a>
                          </span>
                    );
                }
            }];
        const data = this.state.tableData;
        const paginationOptions = {
            showSizeChanger: true, // 默认true
            showQuickJumper: true, // 默认true
            showMessage: true, // 默认 true
            pageSize: this.state.queryData.pageSize,
            currentPage: this.state.queryData.currentPage,
            totalCount: this.state.queryData.totalCount,
            onChange: (currentPage, pageSize)=> {
                let queryData = assign({}, this.state.queryData, {currentPage, pageSize});
                this.setState({
                    queryData
                });
                this.handleSearch(queryData);
            }
        };

        return (
            <Page header='auto' loading={this.state.loading}>
                <QueryTerms options={queryTermsOptions}/>
                <Button type="primary" size="large" style={{marginBottom:'10px'}}>添加人员</Button>
                <Table columns={columns} dataSource={data} pagination={false}/>
                <PaginationComponent options={paginationOptions}/>
            </Page>
        )
    };
}
export default ListPage;