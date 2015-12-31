import React from 'react'
import { Button } from 'antd';
const MyButton = React.createClass({
    onClick(){// 这个是什么写法?
        location.href = '/';
    },
    onClick2: function () {
        location.href = '/service';
    },
    onClick3(){
        location.href = '/contact';
    },
    render(){
        return <div>
            <Button type="primary" onClick={this.onClick}>首页</Button>
            <Button onClick={this.onClick2}>服务</Button>
            <Button type="ghost" onClick={this.onClick3}>联系</Button>
        </div>
    }
});
export default MyButton;
