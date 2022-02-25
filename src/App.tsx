import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type filterValueType = 'all' | 'active' | 'completed'


function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'HTML', isDone: true},

    ])
    const [filter, setFilter] = useState<filterValueType>('all')


    const removeTask = (id: string) => {
        const newTasks = tasks.filter(t => t.id !== id)
        setTasks(newTasks)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (value: filterValueType) => {
        setFilter(value)
    }

    const changeStatus = (taskID: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let tasksFoToDoList = tasks
    switch (filter) {
        case 'completed':
            tasksFoToDoList = tasks.filter(t => t.isDone)
            break;
        case 'active':
            tasksFoToDoList = tasks.filter(t => !t.isDone)
            break;
    }

    return (
        <div className={'App'}>
            <TodoList title={'What to learn'}
                      tasks={tasksFoToDoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App

