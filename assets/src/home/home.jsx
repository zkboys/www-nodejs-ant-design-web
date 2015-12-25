import '../common/lib.jsx';
import './home.less';
import ReactDOM from 'react-dom';
import React from 'react';
import MyButton from '../common/MyButton';
import App from '../common/App';
ReactDOM.render(
    <div className="home">
        <MyButton/>
    </div>
    , document.getElementById('react-content'));


