import {todolistApi, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setErrorActionType,
    setAppStatusAC,
    setStatusActionType,
    setAppErrorAC
} from "../../app/app-reducer";


type ActionsType =
    | removeTodolistActionType
    | addTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | setTodolistsActionType
    | setErrorActionType
    | setStatusActionType

export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>
export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export type filterValueType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: filterValueType
    entityStatus: RequestStatusType
}

const initialState: Array<TodoListDomainType> = []

export const todolistReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType):
    Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(t => {
                return {...t, filter: 'all', entityStatus: 'idle'}
            })
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
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS", status, id
} as const)

export const setTodolistsAC = (todolists: TodoListType[]) => ({type: 'SET-TODOLISTS', todolists} as const)


export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodo().then((res) => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    todolistApi.deleteTodo(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}


export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTodo(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(error => {
        dispatch(setAppErrorAC(error.message))
        dispatch(setAppStatusAC('failed'))
    })
}


export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.updateTodo(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

