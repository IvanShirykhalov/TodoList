import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {addTodolistActionType, removeTodolistActionType, setTodolistsActionType} from "../Todolists/todolist-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | removeTodolistActionType
    | addTodolistActionType
    | setTodolistsActionType

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const initialState = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case 'SET-TASKS':
            return {...state, [action.todolistID]: action.tasks}
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => ({type: "REMOVE-TASK", todolistID, taskID} as const)
export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)
export const updateTaskAC = (model: UpdateDomainTaskModelType, taskID: string, todolistID: string) =>
    ({
        type: "UPDATE-TASK", model, taskID, todolistID
    } as const)
export const setTasksAC = (tasks: TaskType[], todolistID: string) =>
    ({type: 'SET-TASKS', tasks, todolistID} as const)


export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.getTasks(todolistID).then((res) => {
        dispatch(setTasksAC(res.data.items, todolistID))
    })
}


export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (domainModel: UpdateDomainTaskModelType, taskID: string, todolistID: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
        })

}
