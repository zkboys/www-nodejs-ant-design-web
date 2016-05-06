/*
 * 自定义组件示例页面
 * */
import React from 'react';
import PanelDemo from './panel/Demo'
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>自定义面板</h1>
                <PanelDemo/>
            </div>
        );
    }
}

export default Index;

