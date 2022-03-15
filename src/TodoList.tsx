import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./State/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/tasks-reducer";
import {filterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    filter: filterValueType
    changeFilter: (value: filterValueType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodoListStatus: (id: string, newTitle: string) => void
}


export const TodoList = (props: TodoListPropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<RootState, Array<TaskType>>(state => state.tasks[props.id])

    const onFilterClickHandler = (filter: filterValueType, todolistID: string) => {
        props.changeFilter(filter, props.id)
    }

    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListStatus(props.id, newTitle)
    }


    let tasksFoToDoList = tasks
    switch (props.filter) {
        case 'completed':
            tasksFoToDoList = tasksFoToDoList.filter(t => t.isDone)
            break;
        case 'active':
            tasksFoToDoList = tasksFoToDoList.filter(t => !t.isDone)
            break;
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title) => {
                dispatch(addTaskAC(title, props.id))
            }}/>
            <div>
                {tasksFoToDoList.map((t) => {

                    const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.id))

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIdDoneValue = e.currentTarget.checked
                        dispatch(changeTaskStatusAC(newIdDoneValue, t.id, props.id))
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(newValue, t.id, props.id))
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

