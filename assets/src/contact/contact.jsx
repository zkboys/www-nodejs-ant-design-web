import '../common/lib.jsx';
import ReactDOM from 'react-dom';
import React from 'react';
import './contact.less';
import MyButton from '../common/MyButton';
import App from '../common/App';
import MyModal from '../common/MyModal.jsx';
import contactImg from './img/contact.jpg';
ReactDOM.render(
    <div className="contact" style={{background:'red',fontSize:'20px'}}>
        <img src={contactImg} width="100px"/>
        <App/>
        <MyButton/>
        <MyModal btnText={'联系我们'} title={'提示'} content={'请拨打下面的电话,联系我们.'} okCb={modalOKCB} cancelCb={modalCancelCB}/>
    </div>
    , document.getElementById('react-content'));

function modalOKCB() {
    alert('ok');
}
function modalCancelCB() {
    alert('cancel');
}