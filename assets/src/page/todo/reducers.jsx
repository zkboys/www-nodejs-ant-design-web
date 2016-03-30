import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters
// 这里面每一个函数，相当于App的state ，比如 App中state.todos 对应下面todos函数的返回值。

export default combineReducers({
    visibilityFilter(state = SHOW_ALL, action) {
        // 页面初始化的时候，这个函数被调用了三遍。搞啥子呢？
        // 1 1 2 2 1 2 这弹出顺序是为什么呢？
        //alert(1);
        switch (action.type) {
            case SET_VISIBILITY_FILTER:
                return action.filter
            case ADD_TODO:
            default:
                return state
        }
    },
    todos(state = [{text: '这个来自todos默认',completed: true}], action) {
        //alert(2);
        switch (action.type) {
            case ADD_TODO:
                return [
                    ...state,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            case COMPLETE_TODO:
                return [
                    ...state.slice(0, action.index),
                    Object.assign({}, state[action.index], {
                        completed: true
                    }),
                    ...state.slice(action.index + 1)
                ]
            default:
                return state
        }
    }
})


/*

 function visibilityFilter(state = SHOW_ALL, action) {
 switch (action.type) {
 case SET_VISIBILITY_FILTER:
 return action.filter
 case ADD_TODO:
 alert(11);
 default:
 return state
 }
 }

 function todos(state = [], action) {
 switch (action.type) {
 case ADD_TODO:
 alert(action.index);
 return [
 ...state,
 {
 text: action.text,
 completed: false
 }
 ]
 case COMPLETE_TODO:
 return [
 ...state.slice(0, action.index),
 Object.assign({}, state[action.index], {
 completed: true
 }),
 ...state.slice(action.index + 1)
 ]
 default:
 return state
 }
 }
 const todoApp = combineReducers({
 visibilityFilter,
 todos
 })

 export default todoApp

* */