import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type filterValueType = 'all' | 'active' | 'completed'


function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'React', isDone: false},

    ])
    const [filter, setFilter] = useState<filterValueType>('all')


    const removeTask = (id: number) => {
        const newTasks = tasks.filter(t => t.id !== id)
        setTasks(newTasks)
    }

    const changeFilter = (value: filterValueType) => {
        setFilter(value)
    }

    let tasksFoToDoList = tasks
    switch (filter) {
        case 'completed':
            tasksFoToDoList = tasks.filter(t => t.isDone)
            break;
        case 'active':
            tasksFoToDoList = tasks.filter(t => t.isDone !== true)
            break;
        default:
            return tasksFoToDoList
    }

    return (
        <div className={'App'}>
            <TodoList title={'What to learn'}
                      tasks={tasksFoToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
