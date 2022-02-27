import React, {ChangeEvent} from 'react';
import {filterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

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
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodoListStatus: (id: string, newTitle: string) => void
}


export const TodoList = (props: TodoListPropsType) => {

    const onFilterClickHandler = (filter: filterValueType, todolistID: string) => {
        props.changeFilter(filter, props.id)
    }

    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListStatus(props.id, newTitle)
    }

    const AddTask = (title: string) => {
        props.addTask(title, props.id)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={AddTask}/>
            <div>
                {props.tasks.map((t) => {

                    const onRemoveHandler = () => props.removeTask(t.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return (
                        <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                            <Checkbox checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        </div>)
                })}
            </div>
            <div>
                <Button color={'primary'} variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={() => onFilterClickHandler('all', props.id)}>all
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={() => onFilterClickHandler('active', props.id)}>active
                </Button>
                <Button color={'primary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => onFilterClickHandler('completed', props.id)}>completed
                </Button>
            </div>
        </div>
    )
}

