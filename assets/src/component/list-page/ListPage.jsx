import React from 'react';
import assign from 'object-assign'
import QueryTerms from '../query-terms/QueryTerms';
import PaginationComponent from '../pagination/PaginationComponent'

import {Table, Icon} from 'antd';

class ListPage extends React.Component {
    state = {
        queryData:{
            currentPage: 1,
            pageSize: 10,
        }
    };
    handleSearch= (queryData)=>{
        console.log(queryData);
    };
    render() {
        const queryTermsOptions = {
            showSearchBtn: true,
            resultDateToString: true,
            onSubmit: (data)=> {
                let queryData = assign({}, this.state.queryData,data,{currentPage:1});
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
        const data = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            },
            {
                key: '3',
                name: '李大嘴',
                age: 32,
                address: '西湖区湖底公园1号'
            }
        ];
        const paginationOptions = {
            showSizeChanger: true, // 默认true
            showQuickJumper: true, // 默认true
            showMessage: true, // 默认 true
            pageSize: this.state.queryData.pageSize,
            currentPage: this.state.queryData.currentPage,
            totalCount: 100,
            onChange: (currentPage, pageSize)=> {
                let queryData = assign({}, this.state.queryData,{currentPage, pageSize});
                this.setState({
                    queryData
                });
                this.handleSearch(queryData);
            }
        };

        return (
            <div>
                <QueryTerms options={queryTermsOptions}/>
                <Table columns={columns} dataSource={data} pagination={false}/>
                <PaginationComponent options={paginationOptions}/>
            </div>
        )
    };
}
export default ListPage;