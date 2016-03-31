import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import AsyncApp from './containers/AsyncApp'

const store = configureStore()

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        )
    }
}