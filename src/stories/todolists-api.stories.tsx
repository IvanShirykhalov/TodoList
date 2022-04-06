import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodo().then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'newTodolist'
        todolistApi.createTodo(title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "845573af-c723-4c82-ba95-2a1de07cc9a7"
        todolistApi.deleteTodo(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "845573af-c723-4c82-ba95-2a1de07cc9a7"
        const title = 'changeNameTodolist'
        todolistApi.updateTodo(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "cf6184eb-5ac2-4464-8f4c-a634e542f68b"
        todolistApi.getTasks(todolistId).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "cf6184eb-5ac2-4464-8f4c-a634e542f68b"
        const title = 'changeTaskTitle'
        todolistApi.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "cf6184eb-5ac2-4464-8f4c-a634e542f68b"
        const tasksId = '14754900-cded-4bef-877c-b53db7f9ff1b'
        todolistApi.deleteTask(todolistId, tasksId).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpgradeTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "cf6184eb-5ac2-4464-8f4c-a634e542f68b"
        const tasksId = '63fa11b6-750c-4e2b-abbe-62b1c4712676'
        const title = 'changeTaskTitle'
        todolistApi.upgradeTask(todolistId, tasksId, title).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}