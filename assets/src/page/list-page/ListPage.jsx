import './style.less'
import React from 'react';
import {Row,Col,Button,Pagination} from 'antd';
import assign from 'object-assign'
import Request from 'superagent';
import Page from '../../framework/page/Page';
import SearchCondition from '../search-condition/SearchCondition'
import InputItem from '../search-condition/InputItem'
import DataTable from './DataTable'
import TopToolBar from './TopToolBar'
import BottomToolBar from './BottomToolBar'


class ListPage extends React.Component {
    state = {
        loading: false,
        currentPage: 1,
        pageSize: 20,
        totalCount: 0,
        tableData: []
    };
    conditionData = {};

    componentDidMount() {
        if (this.props.searchOnInit) {
            this.handleSearch();
        }
    }

    handleSearch = (currentPage, pageSize)=> {
        let _this = this;
        if (currentPage) {
            _this.setState({
                currentPage
            })
        }
        if (pageSize) {
            _this.setState({
                pageSize
            })
        }
        let conditions = assign({}, _this.conditionData, {
            currentPage: currentPage || 1,
            pageSize: pageSize || _this.state.pageSize
        });
        Request
            .get(_this.props.url)
            .query(conditions)
            .end(function (err, res) {
                _this.setState({
                    tableData: res.body.tableData,
                    currentPage: currentPage || 1,
                    totalCount: res.body.totalCount
                });
            });
        console.log(conditions);
    };

    render() {
        let _this = this;
        let conditionOptions = assign({}, this.props.conditionOptions, {
            onSearch: (data)=> {
                _this.handleSearch();
            }
        });
        let topToolBarOptions = this.props.topToolBarOptions;
        let dataTableOptions = this.props.dataTableOptions;
        let bottomToolBarOptions = this.props.bottomToolBarOptions;
        return (
            <Page header="auto" loading={this.state.loading}>
                <div className="list-page">
                    <SearchCondition
                        options={conditionOptions}
                        setConditionData={(data)=>this.conditionData=data}/>
                    <TopToolBar
                        options={topToolBarOptions}/>
                    <DataTable {...dataTableOptions} tableData={this.state.tableData}/>
                    <BottomToolBar
                        {...bottomToolBarOptions}
                        currentPage={this.state.currentPage}
                        totalCount={this.state.totalCount}
                        pageSize={this.state.pageSize}
                        handleSearch={this.handleSearch}/>
                </div>
            </Page>
        );
    }
}
export default ListPage;
