import {v1} from "uuid";
import {todolistApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";


type ActionsType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

export type filterValueType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: filterValueType
}

const initialState: Array<TodoListDomainType> = []

export const todolistReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistID, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case "SET-TODOLISTS":
            return action.todolists.map(t => {
                return {...t, filter: 'all'}
            })
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)

export const addTodolistAC = (newTodolistTitle: string) => ({
    type: "ADD-TODOLIST",
    title: newTodolistTitle,
    todolistID: v1()
} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
} as const)

export const changeTodolistFilterAC = (id: string, filter: filterValueType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter,
    id
} as const)

export const setTodolistsAC = (todolists: TodoListType[]) => ({type: 'SET-TODOLISTS', todolists} as const)

export const fetchTodolists = (dispatch: Dispatch) => {
    todolistApi.getTodo().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}