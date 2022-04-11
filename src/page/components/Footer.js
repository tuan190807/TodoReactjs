import React, { useState } from 'react'

function Footer({ totalCompleted, totalActive, handleChangeTodo, clearCompleted }) {
    const [active, setActive] = useState('all');

    const handleChange = type => {
        setActive(type);
        handleChangeTodo(type);
    }

    return (
        <div className='p-2 flex justify-between h-12'>
            <div className='flex flex-col justify-center'>{totalCompleted} items left</div>
            <div className='flex w-1/4'>
                <div
                    onClick={() => handleChange('all')}
                    className={`${active === 'all' ? 'border-2' : ''} px-2 py-1 cursor-pointer hover:border-2 rounded`}>All</div>
                <div
                    onClick={() => handleChange('active')}
                    className={`${active === 'active' ? 'border-2' : ''} px-2 py-1 mx-2 cursor-pointer hover:border-2 rounded`}>Active</div>
                <div
                    onClick={() => handleChange('completed')}
                    className={`${active === 'completed' ? 'border-2' : ''} px-2 py-1 cursor-pointer hover:border-2 rounded`}>Completed</div>
            </div>
            <div className='flex flex-col justify-center cursor-pointer' onClick={clearCompleted}>{totalActive ? 'Clear completed' : ''}</div>
        </div>
    )
}

export default React.memo(Footer)