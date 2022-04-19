import {useDispatch} from "react-redux";
import {removeTaskTC, updateTaskTC} from "./tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskTC(props.todolistId, props.task.id))
    }, [dispatch, props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC({
            status: e.currentTarget.checked ?
                TaskStatuses.Completed : TaskStatuses.New
        }, props.task.id, props.todolistId))
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