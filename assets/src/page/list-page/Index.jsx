import React from 'react'
import ListPage from './ListPage'
class Index extends React.Component {
    render() {
        let options = {
            url: '/list-table.json',
            searchOnInit: true,
            conditionOptions: {
                showSearchBtn: true,
                conditionItems: [
                    [
                        {
                            type: 'input',
                            name: 'name',
                            label: '客户名称',
                            placeHolder: '我是客户提示',
                            searchOnChange: true
                        },
                        {
                            name: 'email',
                            label: '客户邮箱',
                            type: 'combobox',
                            searchOnChange: true,
                            separator: '@',
                            options: ['gmail.com', '163.com', 'qq.com']
                        }
                    ],
                    [
                        {
                            type: 'select',
                            name: 'store',
                            label: '门店',
                            searchOnChange: true,
                            defaultValue: 'all',
                            options: [
                                {value: 'all', text: '全部'},
                                {value: '1', text: '和平门'},
                                {value: '2', text: '前门大街'},
                                {value: '3', text: '东直门'},
                                {value: '4', text: '宋家庄'}
                            ]
                        },
                        {
                            type: 'radioButton',
                            name: 'time',
                            label: '用餐时间',
                            searchOnChange: true,
                            defaultValue: 'all',
                            options: [
                                {value: 'all', text: '全部'},
                                {value: '1', text: '上午'},
                                {value: '2', text: '下午'},
                                {value: '3', text: '明天'},
                                {value: '4', text: '后天'}
                            ]
                        }
                    ]
                ]
            },
            topToolBarOptions: {
                buttons: [
                    {
                        text: '我是按钮',
                        onClick: ()=> {
                            console.log('我是按钮');
                        }
                    },
                    {
                        text: '我也是按钮',
                        onClick: ()=> {
                            console.log('我也是按钮');
                        }
                    },
                    {
                        text: '就像谁不是按钮似的',
                        onClick: ()=> {
                            console.log('就像谁不是按钮似的');
                        }
                    }
                ]
            },
            dataTableOptions: {
                columns: [{
                    title: '姓名',
                    dataIndex: 'name',
                    width: 150,
                }, {
                    title: '年龄',
                    dataIndex: 'age',
                    width: 150,
                }, {
                    title: '住址',
                    dataIndex: 'address',
                }]
            },
            bottomToolBarOptions: {
                buttons: [
                    {
                        text: '我是底部按钮',
                        onClick: ()=> {
                            console.log('我是底部按钮');
                        }
                    },
                    {
                        text: '我也是底部按钮',
                        onClick: ()=> {
                            console.log('我也是底部按钮');
                        }
                    },
                    {
                        text: '就像谁不是底部按钮似的',
                        onClick: ()=> {
                            console.log('就像谁不是底部按钮似的');
                        }
                    }
                ]
            }
        }
        return (
            <ListPage {...options}/>
        )
    }
}
export default Index;