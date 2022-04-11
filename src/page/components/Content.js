import React from 'react'
import ContentItem from './ContentItem'

function Content({ list, deleteTodo, updateTodo }) {
    return (
        <div className='bg-white'>
            {
                list.map((item, index) =>
                    <ContentItem key={index} item={item} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                )
            }
        </div>
    )
}

export default React.memo(Content)