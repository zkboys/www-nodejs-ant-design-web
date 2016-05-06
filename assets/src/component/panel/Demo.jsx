/*
 * 自定义组件测试页面
 * */
import React from 'react';
import Panel from './Panel'
import {Table } from 'antd';

class Demo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [{
            title: '参数',
            dataIndex: 'props',
            key: 'props'
        }, {
            title: '说明',
            dataIndex: 'desc',
            key: 'desc'
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type'
        }, {
            title: '默认值',
            dataIndex: 'default',
            key: 'default'
        }];
        return (
            <div>
                <h2>单列</h2>
                <Panel
                    header="我是标题,就一个字符串"
                    width="1000px">
                    <div className="content">
                        我真的是内容
                    </div>
                </Panel>

                <h2>表格</h2>
                <Panel
                    header={{
                             title:'我是标题,就一个字符串',
                             subTitle:'不好意思，我有个副标题'
                             }}
                    width="50%">
                    <table className="content-table">
                        <thead>
                        <tr>
                            <th>门店</th>
                            <th>领取用户数</th>
                            <th>已领券数</th>
                            <th>已领券额</th>
                            <th>已用券数</th>
                            <th>已用券额</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>111</td>
                            <td>111</td>
                            <td>111</td>
                            <td>111</td>
                            <td>111</td>
                            <td>111</td>
                        </tr>
                        </tbody>
                    </table>
                </Panel>

                <h2>多列</h2>
                <Panel
                    header={[{
                                title:'我是第一列标题',
                                subTitle:'日期：2016-05-04'
                             },{
                                title:'我是第二列标题'
                             }]}>

                    <div className="content" style={{padding:'10px'}}>
                        <table className="content-table-wrap">
                            <tbody>
                            <tr>
                                <td style={{width:'50%'}}>
                                    <div>1111</div>
                                    <div>1111</div>
                                </td>
                                <td style={{width:'50%'}}>123123</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Panel>
                <br/>
                <Table
                    pagination={false}
                    dataSource={ [{
                                      key: '1',
                                      props: 'header',
                                      desc: '头部',
                                      type: 'string | object | array',
                                      default:'参见Panel.jsx源代码'
                                    },{
                                      key: '2',
                                      props: 'width',
                                      desc: '宽度',
                                      type: 'string',
                                      default:'100%'
                                    }]}
                    columns={columns}/>

            </div>
        );
    }
}

export default Demo;

