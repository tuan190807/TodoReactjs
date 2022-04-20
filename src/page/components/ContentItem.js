import { Checkbox } from '@mantine/core';
import React from 'react';
import { X } from 'tabler-icons-react';
import { TodoServices } from '../../services/Services';
import { actions, useStore } from '../../store';


function ContentItem({ item, updateStatusTodo }) {


    const [state, dispatch] = useStore();
    const { todos } = state;

    const handleChange = value => {
        const data = {
            id: item.id,
            active: value ? 1 : 0
        };
        updateStatusTodo(data);
    }

    const deleteTodo = id => {
        const newTodo = todos.filter(item => item.id !== id);
        const itemDelete = todos.filter(item => item.id === id);
        dispatch(actions.getTodos(newTodo));
        TodoServices.deleteTodo(id)
            .then(res => console.log(res))
            .catch(error => {
                console.log(error);
                dispatch(actions.getTodos(todos.concat(itemDelete)));
            });
    }

    return (
        <div className='group flex justify-between border-b-2 px-2 py-3'>
            <div className='cursor-pointer'>
                <Checkbox
                    checked={item.active === 1 ? true : false}
                    onChange={(e) => handleChange(e.target.checked)}
                    size='xl' radius="xl" label={<span className={`${item.active === 1 ? 'line-through' : ''} text-xl`}>{item?.name}</span>} />
            </div>
            <div className='flex flex-col justify-center cursor-pointer hidden group-hover:block mr-4' onClick={() => deleteTodo(item.id)}><X color="red" /></div>
        </div>
    )
}

export default React.memo(ContentItem)