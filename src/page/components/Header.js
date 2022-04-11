import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { ChevronDown, RotateClockwise, Search, X } from 'tabler-icons-react';
function Header({ style, handleAddTodo, handleChangeActive, search }) {

    const [valueText, setValueText] = useState('');
    const [isAdd, setIsAdd] = useState(false);

    const handleAdd = () => {
        setIsAdd(true);
        setValueText('');
        if (!valueText) return;
        if (isAdd) {
            const data = {
                name: valueText,
                active: 0
            }
            handleAddTodo(data);
            setValueText('');
        }
    }

    const onChange = value => {
        setValueText(value);
        !isAdd && search(value);
    }

    const closeAdd = () => {
        setIsAdd(false);
        search('');
    }

    const onEnter = e => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    }

    return (
        <div className='border-b-2 p-2 flex bg-gray-50 justify-between'>
            <div className={`${!style ? 'opacity-20' : 'opacity-100'} cursor-pointer flex flex-col justify-center`}
                onClick={() => handleChangeActive()}><ChevronDown size={30} />
            </div>
            <div className='w-10/12'>
                <TextInput
                    value={valueText}
                    onChange={(e) => onChange(e.target.value)}
                    icon={!isAdd ? <Search /> : ''}
                    rightSection={isAdd ? <X color='red' onClick={() => closeAdd()} /> : ''}
                    onKeyDown={onEnter}
                />
            </div>
            <div className=''>
                <Button onClick={handleAdd} style={{ background: 'blue' }}>{!isAdd ? 'Add user' : "Submit"}</Button>
            </div>
            <div className='flex flex-col justify-center cursor-pointer' onClick={() => setValueText('')}>
                <RotateClockwise />
            </div>
        </div>
    )
}

export default React.memo(Header)