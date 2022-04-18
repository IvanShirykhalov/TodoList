import {TaskStateType} from "../App";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {addTodolistAC, removeTodolistAC, setTodolistsActionType} from "./todolist-reducer";
import {Dispatch} from "redux";
import {RootState} from "./store";


type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTasksAC>
    | setTodolistsActionType

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
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            stateCopy[newTask.todoListId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, ...action.model} : t)
            }
        /*        case 'CHANGE-TASK-TITLE': {
                    const tasks = state[action.todolistID]
                    state[action.todolistID] = tasks.map(t => t.id === action.taskID ?
                        {...t, title: action.taskTitle} : t)
                    return {...state}
                }*/
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.todolistID]: action.tasks}
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => ({type: "REMOVE-TASK", todolistID, taskID} as const)

export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)

export const updateTaskAC = (model: UpdateDomainTaskModelType, taskID: string, todolistID: string) => ({
    type: "UPDATE-TASK", model, taskID, todolistID
} as const)

/*
export const changeTaskTitleAC = (taskTitle: string, taskID: string, todolistID: string) => ({
    type: "CHANGE-TASK-TITLE", taskID, taskTitle, todolistID
} as const)
*/

export const setTasksAC = (tasks: TaskType[], todolistID: string) => ({
    type: 'SET-TASKS', tasks, todolistID
} as const)

export const fetchTasksTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.getTasks(todolistID).then((res) => {
            dispatch(setTasksAC(res.data.items, todolistID))
        })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (domainModel: UpdateDomainTaskModelType, taskID: string, todolistID: string) => {
    return (dispatch: Dispatch, getState: () => RootState) => {
        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskID)
        if (!task) {
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        }
        todolistApi.upgradeTask(todolistID, taskID, apiModel)
            .then(() => {
                dispatch(updateTaskAC(domainModel, taskID, todolistID))
            })
    }
}
