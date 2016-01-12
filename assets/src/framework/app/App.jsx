import React from 'react';
import HeaderBar from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Container from '../container/Container';
import 'antd/lib/index.css';
import './app.less';
import Settings from '../Settings'
const App = React.createClass({
    getInitialState(){
        return {
            collapse: Settings.collapseSidebar()
        }
    },
    handelClick(){
        this.setState({
            collapse: !this.state.collapse
        });
        Settings.collapseSidebar(!this.state.collapse);
    },
    render() {
        return (
            <div>
                <HeaderBar collapse={this.state.collapse} handelClick={this.handelClick}/>
                <Sidebar collapse={this.state.collapse}/>
                <Container collapse={this.state.collapse}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
});
export default App;
