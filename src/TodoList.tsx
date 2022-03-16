import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./State/store";
import {addTaskAC} from "./State/tasks-reducer";
import {filterValueType} from "./App";
import {Task} from "./Task";

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


export const TodoList = React.memo((props: TodoListPropsType) => {


    const dispatch = useDispatch()
    const tasks = useSelector<RootState, Array<TaskType>>(state => state.tasks[props.id])

    const onFilterClickHandler = useCallback((filter: filterValueType, todolistID: string) => {
        props.changeFilter(filter, props.id)
    }, [props.changeFilter, props.id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch, props.id])

    const removeTodoList = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListStatus(props.id, newTitle)
    }, [props.changeTodoListStatus, props.id])


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
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksFoToDoList.map((t) => <Task task={t}
                                                  todolistId={props.id}
                                                  key={t.id}
                />)}
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
})


