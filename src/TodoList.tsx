import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValueType} from "./App";

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


    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onClickHandler = () => {
        if (title.trim() === '') {
            return setError('Title is required')
        }
        props.addTask(title.trim(), props.id)
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

    const onFilterClickHandler = (filter: filterValueType, todolistID: string) => {
        props.changeFilter(filter, props.id)
    }

    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>delete</button>
            </h3>
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
