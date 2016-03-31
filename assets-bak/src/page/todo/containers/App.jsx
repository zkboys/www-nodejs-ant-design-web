import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends Component {

    static propTypes = {
        visibleTodos: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired
        }).isRequired).isRequired,

        visibilityFilter: PropTypes.oneOf([
            'SHOW_ALL',
            'SHOW_COMPLETED',
            'SHOW_ACTIVE'
        ]).isRequired
    }
    render() {
        // Injected by connect() call:
        const { dispatch, visibleTodos, visibilityFilter } = this.props
        return (
            <div>
                <AddTodo onAddClick={text => dispatch({type:'ADD_TODO',text}) } />
                <TodoList todos={visibleTodos} onTodoClick={index => dispatch(completeTodo(index))} />
                <Footer filter={visibilityFilter} onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter)) } />
            </div>
        )
    }

}
// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    let todos = state.todos;
    let filter = state.visibilityFilter;
    let visibleTodos = [];
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            visibleTodos =  todos;
            break;
        case VisibilityFilters.SHOW_COMPLETED:
            visibleTodos =  todos.filter(todo => todo.completed)
            break;
        case VisibilityFilters.SHOW_ACTIVE:
            visibleTodos =  todos.filter(todo => !todo.completed)
            break;
    }
    return {//返回的数据将会作为App的props。
        visibleTodos,
        visibilityFilter: state.visibilityFilter
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
// select返回值 将会成为 app的props
export default connect(select)(App)