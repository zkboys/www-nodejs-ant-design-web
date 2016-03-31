import React, {Component} from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoReducers from './reducers'
let store = createStore(todoReducers, {visibilityFilter: 'SHOW_ALL', todos: [{text: '来自createStore的默认state', completed: false}]})
class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
export default Index;