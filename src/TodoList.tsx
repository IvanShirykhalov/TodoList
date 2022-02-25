import React from 'react';
import {filterValueType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (value: filterValueType)=> void
}


export const TodoList = (props: TodoListPropsType) => {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <button onClick={() => props.removeTask(t.id)}>x</button>
                            <input type={'checkbox'} checked={t.isDone}/><span>{t.title}</span></li>)
                })}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>all</button>
                <button onClick={()=>{props.changeFilter('active')}}>active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>completed</button>
            </div>
        </div>
    )
}
