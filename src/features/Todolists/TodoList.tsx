import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTaskTC, fetchTasksTC} from "../Tasks/tasks-reducer";
import {Task} from "../Tasks/Task";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {filterValueType, TodoListDomainType} from "./todolist-reducer";


type TodoListPropsType = {
    todolist: TodoListDomainType
    changeFilter: (value: filterValueType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodoListStatus: (id: string, newTitle: string) => void
    demo?: boolean
}


export const TodoList = React.memo(({demo = false, ...props}: TodoListPropsType) => {


    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolist.id])

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [dispatch, props.todolist.id, demo])

    const onFilterClickHandler = useCallback((filter: filterValueType, todolistID: string) => {
        props.changeFilter(filter, todolistID)
    }, [props.changeFilter, props.todolist.id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolist.id, title))
    }, [dispatch, props.todolist.id])

    const removeTodoList = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [props.removeTodolist, props.todolist.id])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListStatus(props.todolist.id, newTitle)
    }, [props.changeTodoListStatus, props.todolist.id])


    let tasksFoToDoList = tasks
    switch (props.todolist.filter) {
        case 'completed':
            tasksFoToDoList = tasksFoToDoList.filter(t => t.status === TaskStatuses.Completed)
            break;
        case 'active':
            tasksFoToDoList = tasksFoToDoList.filter(t => t.status === TaskStatuses.New)
            break;
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {tasksFoToDoList.map((t) => <Task demo={demo}
                                                  task={t}
                                                  todolistId={props.todolist.id}
                                                  key={t.id}
                />)}
            </div>
            <div>
                <Button color={'primary'} variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                        onClick={() => onFilterClickHandler('all', props.todolist.id)}>all
                </Button>
                <Button color={'primary'} variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={() => onFilterClickHandler('active', props.todolist.id)}>active
                </Button>
                <Button color={'primary'} variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => onFilterClickHandler('completed', props.todolist.id)}>completed
                </Button>
            </div>
        </div>
    )
})


