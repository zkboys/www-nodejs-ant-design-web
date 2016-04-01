import React from 'react';
import { Breadcrumb } from 'antd'
import Page from '../../framework/page/Page';
class ListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false
    };

    render() {
        return (
            <Page header="auto" loading={this.state.loading}>
                <h1>我是列表页</h1>
            </Page>
        );
    }
}
export default ListPage;
