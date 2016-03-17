import './style.less';
import React from 'react';
import { Breadcrumb, Button } from 'antd'
import {Link} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
const browserHistory = createBrowserHistory();
import Page from '../page/Page';
class Error404 extends React.Component {
    constructor(props){
        super(props);
    }
    goBack() {
        browserHistory.goBack()
    }
    render() {
        let header =
            <div>
                <h1 className="admin-page-header-title">NotFound</h1>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>未找到</Breadcrumb.Item>
                </Breadcrumb>
            </div>;
        return (
            <Page header={header}>
                <div id="admin-page-header" className="admin-page-header">

                </div>
                <h1>404</h1>
                <p>您访问的页面不存在</p>
                <Button onClick={this.goBack}><a href="javascript:;">返回上一级</a></Button>
                <Button> <Link to="/">返回首页</Link></Button>
            </Page>
        );
    }
}
export default Error404;
