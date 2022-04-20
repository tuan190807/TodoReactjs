import { GET_TODO, RESET_INPUT, SET_TYPE_TODO, ADD_TODO, SET_INPUT_SEARCH } from './contants';

export const getTodos = payload => {
    return {
        type: GET_TODO,
        payload
    }
}

export const setInputSearch = payload => ({
    type: SET_INPUT_SEARCH,
    payload
})

export const resetInput = () => ({
    type: RESET_INPUT
})

export const setTypeTodo = payload => ({
    type: SET_TYPE_TODO,
    payload

})

export const addTodo = payload => ({
    type: ADD_TODO,
    payload
})
