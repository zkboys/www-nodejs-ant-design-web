import './style.less';
import React from 'react';
import { Breadcrumb, Button } from 'antd'
import {Link} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
const browserHistory = createBrowserHistory();
import Page from '../page/Page';

export default React.createClass({
    goBack(){
        browserHistory.goBack()
    },
    render() {
        return (
            <Page>
                <div id="admin-page-header" className="admin-page-header">
                    <h1 className="admin-page-header-title">NotFound</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="home">首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>未找到</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="admin-page-content">
                    <div className="admin-page-content-inner">
                        <h1>404</h1>
                        <Button onClick={this.goBack}><Link to="javascript:;">返回上一级</Link></Button>
                        <Button> <Link to="home">返回首页</Link></Button>

                    </div>
                </div>
            </Page>
        );
    }
});
