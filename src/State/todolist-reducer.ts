import {todolistApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {removeTaskAC} from "./tasks-reducer";


type ActionsType =
    | removeTodolistActionType
    | addTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | setTodolistsActionType

export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>
export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export type filterValueType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: filterValueType
}

const initialState: Array<TodoListDomainType> = []

export const todolistReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType):
    Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(t => {return {...t, filter: 'all'}})
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)

export const addTodolistAC = (todolist: TodoListType) => ({
    type: "ADD-TODOLIST", todolist
} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE", id, title
} as const)

export const changeTodolistFilterAC = (id: string, filter: filterValueType) => ({
    type: "CHANGE-TODOLIST-FILTER", filter, id
} as const)

export const setTodolistsAC = (todolists: TodoListType[]) => ({type: 'SET-TODOLISTS', todolists} as const)


export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodo().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}


export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
        })

}


export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodo(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
}


export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodo(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}


export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodo(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

