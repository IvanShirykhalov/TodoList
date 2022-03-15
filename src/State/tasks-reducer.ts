import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {TaskStateType} from "../App";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistID: string
    taskID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistID: string

}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    taskTitle: string
    todolistID: string

}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistID]
            stateCopy[action.todolistID] = tasks.filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            console.log('stateCop', stateCopy)
            stateCopy[action.todolistID] = [{
                id: v1(),
                title: action.title,
                isDone: false
            }, ...stateCopy[action.todolistID]]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            stateCopy[action.todolistID] = tasks.map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)

            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            stateCopy[action.todolistID] = tasks.map(t => t.id === action.taskID ? {...t, title: action.taskTitle} : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistID]: []
            }

        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistID, taskID}
}

export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistID}
}

export const changeTaskStatusAC = (isDone: boolean, taskID: string, todolistID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (taskTitle: string, taskID: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskID, taskTitle, todolistID}
}