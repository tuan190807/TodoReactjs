import React, { useEffect, useMemo, useState } from 'react'
import { TodoServices } from '../services/Services';
import Content from './components/Content'
import Footer from './components/Footer';
import Header from './components/Header';
import { useStore, actions } from '../store';

function Todo() {

    const [total, setTotal] = useState(0);
    const [state, dispatch] = useStore();
    const { todos, searchText, typeActive } = state;
    const [list, setList] = useState([]);

    useEffect(() => {
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useMemo(() => {
        if (!searchText) {
            if (typeActive === 'active') {
                setList(todos.filter(item => !item.active));
            } else if (typeActive === 'completed') {
                setList(todos.filter(item => item.active));
            } else {
                setList(todos);
            }
        } else {
            let listFilter = [];
            switch (typeActive) {
                case 'all': listFilter = todos; break;
                case 'active': listFilter = todos.filter(item => !item.active); break;
                case 'completed': listFilter = todos.filter(item => item.active); break
                default: return [];
            }
            let newList = listFilter.filter(item => { return (item.name.toLowerCase()).includes(searchText.toLowerCase()) });
            setList(newList);
        }
    }, [typeActive, searchText, todos]);

    const getList = () => {
        TodoServices.getList().then(res => {
            setTotal(res.total);
            dispatch(actions.getTodos(res.data));
            setList(res.data);
        });
    };

    const updateStatusTodo = request => {
        TodoServices.updateTodo(request);
        getList();
    };

    const updateStatusAllTodo = () => {
        if (todos.length > 0) {
            const request = total ? true : false;
            TodoServices.updateTodoAll(request);
            getList();
        }
    }

    return (
        <div className='w-2/3 border-2 mt-8 rounded-lg'>
            <Header style={total === 0} updateStatusAllTodo={updateStatusAllTodo} />
            <Content list={list} updateStatusTodo={updateStatusTodo} />
            <Footer />
        </div>
    )
}

export default Todo