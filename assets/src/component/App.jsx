import React from 'react';
import HeaderBar from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Container from './container/Container';
const App = React.createClass({
    getInitialState(){
        return {
            collapse: localStorage.getItem('sidebar-collapse')=='false',
        }
    },
    handelClick(){
        this.setState({
            collapse: !this.state.collapse
        });
        localStorage.setItem('sidebar-collapse',this.state.collapse)
    },
    render() {
        return (
            <div>
                <HeaderBar collapse={this.state.collapse} handelClick={this.handelClick}/>
                <Sidebar collapse={this.state.collapse} />
                <Container collapse={this.state.collapse}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
});
export default App;
