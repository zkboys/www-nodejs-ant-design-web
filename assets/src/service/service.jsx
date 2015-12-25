import '../common/lib.jsx';
import './service.less';
import ReactDOM from 'react-dom';
import React from 'react';
import MyButton from '../common/MyButton';
import App from '../common/App';
ReactDOM.render(
    <div className="service">
        <App/>
        <MyButton/>
    </div>
    , document.getElementById('react-content'));


