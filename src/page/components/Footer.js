import React from 'react'
import { TodoServices } from '../../services/Services';
import { useStore, actions } from '../../store';

function Footer() {

    const [state, dispatch] = useStore();
    const { todos, typeActive, totalActive } = state;

    const handleChange = type => {
        dispatch(actions.setTypeTodo(type))
    }

    const clearCompleted = () => {
        const newTodo = todos.filter(item => !item.active);
        const listItemDelete = todos.filter(item => item.active);
        dispatch(actions.getTodos(newTodo));
        TodoServices.deleteCompleted()
            .then(res => dispatch(actions.getTodos(newTodo)))
            .catch(error => {
                console.log(error);
                dispatch(actions.getTodos(todos.concat(listItemDelete)));
            });
    }

    return (
        <div className='p-2 flex justify-between h-12'>
            <div className='flex flex-col justify-center'>{todos?.filter(item => !item.active)?.length} items left</div>
            <div className='flex w-1/4'>
                <div
                    onClick={() => handleChange('all')}
                    className={`${typeActive === 'all' ? 'border-2' : ''} px-2 py-1 cursor-pointer hover:border-2 rounded`}>All</div>
                <div
                    onClick={() => handleChange('active')}
                    className={`${typeActive === 'active' ? 'border-2' : ''} px-2 py-1 mx-2 cursor-pointer hover:border-2 rounded`}>Active</div>
                <div
                    onClick={() => handleChange('completed')}
                    className={`${typeActive === 'completed' ? 'border-2' : ''} px-2 py-1 cursor-pointer hover:border-2 rounded`}>Completed</div>
            </div>
            <div className='flex flex-col justify-center cursor-pointer' onClick={clearCompleted}>{totalActive ? 'Clear completed' : ''}</div>
        </div>
    )
}

export default React.memo(Footer)