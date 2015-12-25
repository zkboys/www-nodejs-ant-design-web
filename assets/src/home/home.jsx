import '../common/lib.jsx';
import ReactDOM from 'react-dom';
import React from 'react';
import './home.less';
import MyButton from '../common/MyButton';
import MyModal from '../common/MyModal.jsx';
import {Button
    , Checkbox
    , Slider
    , Alert
    , Menu
    , Dropdown
    , Icon
    , Modal
} from 'antd';
function onChange(e) {
    console.log('checked = ' + e.target.checked);
}
const menu = <Menu>
    <Menu.Item>
        <a target="_blank" href="http://www.alipay.com/">第一个菜单项</a>
    </Menu.Item>
    <Menu.Item>
        <a target="_blank" href="http://www.taobao.com/">第二个菜单项</a>
    </Menu.Item>
    <Menu.Item>
        <a target="_blank" href="http://www.tmall.com/">第三个菜单项</a>
    </Menu.Item>
</Menu>;
function modalOKCB() {
    alert('ok');
}
function modalCancelCB() {
    alert('cancel');
}
ReactDOM.render(
    <div className="home">
        <MyModal btnText={'我的对话框'} title={'提示'} content={'这里时内容,通过参数方式传递的.'} okCb={modalOKCB} cancelCb={modalCancelCB}/>
        <Dropdown overlay={menu}>
            <Button>
                某按钮 <Icon type="down"/>
            </Button>
        </Dropdown>
        <div>这是首页</div>
        <MyButton/>
        <Button type="primary">首页按钮</Button>
        <label>
            <Checkbox defaultChecked={false} onChange={onChange}/>
            Checkbox
        </label>
        <div>
            <Slider defaultValue={30}/>
            <Slider range defaultValue={[20, 50]}/>
            <Slider range defaultValue={[20, 50]} disabled/>
        </div>
        <Alert message="成功提示的文案" type="success"/>
    </div>
    , document.getElementById('react-content'));


