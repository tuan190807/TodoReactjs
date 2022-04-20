import { GET_TODO, RESET_INPUT, SET_TYPE_TODO, ADD_TODO, SET_INPUT_SEARCH } from "./contants"

export const initState = {
    todos: [],
    totalActive: 0,
    searchText: '',
    typeActive: 'all',
}

function reducer(state, action) {
    switch (action.type) {
        case SET_INPUT_SEARCH:
            return {
                ...state,
                searchText: action.payload
            }
        case RESET_INPUT:
            return {
                ...state,
                textInput: ''
            }
        case SET_TYPE_TODO:
            return {
                ...state,
                typeActive: action.payload,
            }
        case GET_TODO:
            return {
                ...state,
                todos: action.payload.sort((a, b) => a - b),
                totalActive: action.payload.filter(item => item.active)?.length
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
                totalActive: state.todos.filter(item => item.active)?.length + 1
            }
        default: throw Error("error")
    }
}

export default reducer