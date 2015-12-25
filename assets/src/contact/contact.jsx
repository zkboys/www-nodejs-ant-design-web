import '../common/lib.jsx';
import ReactDOM from 'react-dom';
import React from 'react';
import './contact.less';
import MyButton from '../common/MyButton';
import App from '../common/App';
import contactImg from './img/contact.jpg';
ReactDOM.render(
    <div className="contact">
        <img src={contactImg} width="100px"/>
        <App/>
        <MyButton/>
    </div>
    , document.getElementById('react-content'));
