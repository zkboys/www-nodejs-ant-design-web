import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Container from './container/Container'

const store = configureStore()

export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <Container>{this.props.children}</Container>
            </Provider>
        )
    }
}