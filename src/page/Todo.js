import React, { useEffect, useState } from 'react'
import { TodoServices } from '../services/Services';
import Content from './components/Content'
import Footer from './components/Footer';
import Header from './components/Header'

function Todo() {

    const [listTodo, setListTodo] = useState([]);
    const [listFilter, setListFilter] = useState([]);
    const [total, setTotal] = useState(0);
    const [type, setType] = useState(1);
    const [totalActive, setTotalActive] = useState(0);

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        filterListTodo(type);
        setTotalActive(listTodo.filter(item => item.active)?.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, listTodo]);

    const getList = () => {
        TodoServices.getList().then(res => {
            setTotal(res.total);
            setListTodo(res.data);
        });
    };

    const filterListTodo = (type) => {
        const listCopy = [...listTodo];
        switch (type) {
            case 'all': return setListFilter(listCopy);
            case 'active': return setListFilter(listCopy.filter(item => !item.active));
            case 'completed': return setListFilter(listCopy.filter(item => item.active));
            default: setListFilter(listCopy);
        }
    }

    const handleAdd = request => {
        TodoServices.addTodo(request);
        getList();
    };

    const updateTodo = request => {
        TodoServices.updateTodo(request);
        getList();
    };

    const handleChangeActive = () => {
        if (listTodo.length > 0) {
            const request = total ? true : false;
            TodoServices.updateTodoAll(request);
            getList();
        }
    }

    const deleteTodo = id => {
        TodoServices.deleteTodo(id);
        getList();
    };

    const clearCompleted = () => {
        TodoServices.deleteCompleted();
        getList();
    };

    const search = value => {
        const listCopy = [...listFilter];
        let list = listTodo;
        if (type === "active") {
            list = list.filter(e => !e.active)
        }
        if (type === "completed") {
            list = list.filter(e => e.active)
        }
        if (!value) {
            setListFilter(list);
        } else {
            let newList = listCopy.filter(item => { return (item.name.toLowerCase()).includes(value.toLowerCase()) });
            setListFilter(newList);
        }
    }

    const handleChangeTodo = type => {
        setType(type);
    };

    return (
        <div className='w-2/3 border-2 mt-8 rounded-lg'>
            <div>
                <Header style={listTodo.length > 0 && total === 0} handleAddTodo={handleAdd} handleChangeActive={handleChangeActive} search={search} />
            </div>
            <div>
                <Content list={listFilter} updateTodo={updateTodo} deleteTodo={deleteTodo} />
            </div>
            <div>
                <Footer totalCompleted={total} totalActive={totalActive} handleChangeTodo={handleChangeTodo} clearCompleted={clearCompleted} />
            </div>
        </div>
    )
}

export default Todo