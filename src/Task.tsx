import {useDispatch} from "react-redux";
import {updateTaskTC} from "./State/tasks-reducer";
import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {removeTaskTC} from "./State/todolist-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskTC(props.todolistId, props.task.id))
    }, [dispatch, props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback((status: TaskStatuses) => {
        dispatch(updateTaskTC({status}, props.task.id, props.todolistId))
    }, [dispatch, props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((title: string) => {
        dispatch(updateTaskTC({title}, props.task.id, props.todolistId))
    }, [dispatch, props.task.id, props.todolistId])
    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        </div>
    )
})