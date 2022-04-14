import {v1} from "uuid";

import {TaskStateType} from "../App";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";


type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
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
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: action.todolistID
            }, ...stateCopy[action.todolistID]]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistID];
            state[action.todolistID] = todolistTasks
                .map(t => t.id === action.taskID ? {...t, status: action.status} : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            const tasks = state[action.todolistID]
            state[action.todolistID] = tasks.map(t => t.id === action.taskID ?
                {...t, title: action.taskTitle} : t)
            return {...state}
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

export const removeTaskAC = (taskID: string, todolistID: string) => ({type: "REMOVE-TASK", todolistID, taskID} as const)

export const addTaskAC = (title: string, todolistID: string) => ({type: "ADD-TASK", title, todolistID} as const)
export const changeTaskStatusAC = (status: TaskStatuses, taskID: string, todolistID: string) => ({
    type: "CHANGE-TASK-STATUS",
    status,
    taskID,
    todolistID
} as const)
export const changeTaskTitleAC = (taskTitle: string, taskID: string, todolistID: string) => ({
    type: "CHANGE-TASK-TITLE",
    taskID,
    taskTitle,
    todolistID
} as const)