import React from 'react';
import HeaderBar from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Container from '../container/Container';
import 'antd/lib/index.css';
import './app.less';
class App extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <HeaderBar/>
                <Sidebar/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
export default App;
