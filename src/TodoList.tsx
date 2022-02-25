import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (e: string) => void
    changeFilter: (value: filterValueType) => void
}


export const TodoList = (props: TodoListPropsType) => {


    const [title, setTitle] = useState('')


    const onClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    const onFilterClickHandler = (filter: filterValueType) => {
        props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {

                    const onRemoveHandler = () => props.removeTask(t.id)

                    return (
                        <li key={t.id}>
                            <button onClick={onRemoveHandler}>x</button>
                            <input type={'checkbox'} checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>)
                })}
            </ul>
            <div>
                <button onClick={() => onFilterClickHandler('all')}>all</button>
                <button onClick={() => onFilterClickHandler('active')}>active</button>
                <button onClick={() => onFilterClickHandler('completed')}>completed</button>
            </div>
        </div>
    )
}
