import React from 'react';
import Page from '../../framework/page/Page';

class ValidationDemo extends React.Component {
    pageHeader = {
        title: '表单校验',
        breadcrumbItems: [
            {text: '某应用'},
            {text: '我的时间', path: '/myTime3'},
            {text: '表单校验'}
        ]
    };

    render() {
        return (
            <Page header={this.pageHeader}>
                没实现
            </Page>
        )
    }
}

export default ValidationDemo;