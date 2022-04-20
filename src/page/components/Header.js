import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { ChevronDown, RotateClockwise, Search, X } from 'tabler-icons-react';
import { TodoServices } from '../../services/Services';
import { useStore, actions } from '../../store';
function Header({ style, updateStatusAllTodo }) {

    const [isAdd, setIsAdd] = useState(false);
    const [textInputAdd, setTextInputAdd] = useState('')
    const [state, dispatch] = useStore();
    const { todos } = state;

    const onChangeInput = value => {
        setTextInputAdd(value);
        if (!isAdd) {
            dispatch(actions.setInputSearch(value));
        }
    }

    const openAddTodo = () => {
        setIsAdd(true);
        dispatch(actions.setInputSearch(''));
        setTextInputAdd('');
    }

    const handleSubmit = async () => {
        if (!textInputAdd) { return };
        const data = {
            id: todos[todos.length - 1].id + 1,
            name: textInputAdd,
            active: 0
        };
        const newTodo = [...todos, data];
        dispatch(actions.getTodos(newTodo));
        await TodoServices.addTodo(data)
            .then(res => console.log(res))
            .catch(error => {
                console.log(error);
                dispatch(actions.getTodos(todos.filter(item => item.id !== data.id)))
            });
        setTextInputAdd('');
    }

    const closeAdd = () => {
        setIsAdd(false);
        dispatch(actions.setInputSearch(''));
        setTextInputAdd('');
    }

    const resetInput = () => {
        dispatch(actions.setInputSearch(''));
        setTextInputAdd('');
    }

    return (
        <div className='border-b-2 p-2 flex bg-gray-50 justify-between'>
            <div className={`${!style ? 'opacity-20' : 'opacity-100'} cursor-pointer flex flex-col justify-center`}
                onClick={() => updateStatusAllTodo()}><ChevronDown size={30} />
            </div>
            <div className='w-10/12'>
                <TextInput
                    value={textInputAdd}
                    onChange={(e) => onChangeInput(e.target.value)}
                    icon={!isAdd ? <Search /> : ''}
                    rightSection={isAdd ? <X color='red' onClick={() => closeAdd()} /> : ''}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </div>
            <div className=''>
                {!isAdd && <Button onClick={openAddTodo} style={{ background: 'blue' }}>Add user</Button>}
                {isAdd && <Button onClick={handleSubmit} style={{ background: 'blue' }}>Submit</Button>}
            </div>
            <div className='flex flex-col justify-center cursor-pointer' onClick={resetInput}>
                <RotateClockwise />
            </div>
        </div >
    )
}

export default React.memo(Header)