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
    filter: filterValueType
    removeTask: (id: string) => void
    addTask: (e: string) => void
    changeFilter: (value: filterValueType) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}


export const TodoList = (props: TodoListPropsType) => {


    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onClickHandler = () => {
        if (title.trim() === '') {
            return setError('Title is required')
        }
        props.addTask(title.trim())
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={onClickHandler}>+</button>
                {error && <div className={'error-message'}>Title is required</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {

                    const onRemoveHandler = () => props.removeTask(t.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeStatus(t.id, e.currentTarget.checked)

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
                        onClick={() => onFilterClickHandler('all')}>all
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => onFilterClickHandler('active')}>active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => onFilterClickHandler('completed')}>completed
                </button>
            </div>
        </div>
    )
}
