import React, {ChangeEvent} from 'react';
import {filterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: filterValueType
    removeTask: (id: string, todolistID: string) => void
    addTask: (e: string, todolistID: string) => void
    changeFilter: (value: filterValueType, todolistID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}


export const TodoList = (props: TodoListPropsType) => {

    const onFilterClickHandler = (filter: filterValueType, todolistID: string) => {
        props.changeFilter(filter, props.id)
    }

    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }

    const AddTask = (title: string) => {
        props.addTask(title, props.id)
    }


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>delete</button>
            </h3>
            <AddItemForm addItem={AddTask}/>
            <ul>
                {props.tasks.map((t) => {

                    const onRemoveHandler = () => props.removeTask(t.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <button onClick={onRemoveHandler}>x</button>
                            <input type={'checkbox'} checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <span>{t.title}</span>
                        </li>)
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => onFilterClickHandler('all', props.id)}>all
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => onFilterClickHandler('active', props.id)}>active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => onFilterClickHandler('completed', props.id)}>completed
                </button>
            </div>
        </div>
    )
}

