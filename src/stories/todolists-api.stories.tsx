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
