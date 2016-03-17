import React from 'react';
import Page from '../../framework/page/Page';
import { TimePicker } from 'antd';

class Hello extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        test: '我特么是父类的test',
        count: 11
    };

    componentDidMount() {
        console.log('父类中的 componentDidMount');
    }

    render() {
        return <div>Hello {this.props.name}</div>;
    }
}

function handleChange(time) {
    if (time) {
        console.log(time.toLocaleTimeString('zh-CN', {hour12: false}));
    }
}
class MyTime extends Hello {
    constructor(props) {
        super(props);
        console.log(super().state);
        this.state = Object.assign({
            //test: '我特么是子类的test',
            loading: false
        },super().state);
    }

    componentDidMount() {
        console.log('super.componentDidMount(); 需要显示调用父类的同名方法。');
        super.componentDidMount();
        console.log('子类中的 componentDidMount');

    }

    render() {
        console.log(this.state.test);
        const pageHeader = {
            title: 'auto',
            breadcrumbItems: [
                {text: '用户管理'},
                {text: '用户查询', path: '/myTime3'},
                {text: '修改用户'}
            ]
        };
        let animConfig = [
            {opacity: [1, 0], translateX: [0, 50]},
            {opacity: [1, 0], translateX: [0, -50]}
        ];
        return (
            <Page header={pageHeader} loading={this.state.loading} animConfig={animConfig}>
                <TimePicker handleChange={handleChange}/>
            </Page>
        );
    }
}
export default MyTime;
