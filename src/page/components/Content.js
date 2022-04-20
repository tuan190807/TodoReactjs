import React from 'react'
import ContentItem from './ContentItem'

function Content({ list, updateStatusTodo }) {
    return (
        <div className='bg-white'>
            {
                list.map((item, index) =>
                    <ContentItem key={index} item={item} updateStatusTodo={updateStatusTodo} />
                )
            }
        </div>
    )
}

export default React.memo(Content)