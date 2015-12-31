import React from 'react';
import { Timepicker , message} from 'antd';
const App = React.createClass({
    getInitialState() {
        return {
            date: ''
        };
    },
    handleChange(value) {
        message.info('您选择的日期是: ' + value.toString());
        this.setState({
            date: value
        });
    },
    render() {
        return <div style={{width: 400, margin: '100px auto'}}>
            <div>测试</div>
            <Timepicker defaultValue="12:08:23" onChange={this.handleChange}/>
            <div style={{marginTop: 20}}>当前日期：{this.state.date.toString()}</div>
        </div>;
    }
});
export default App;
