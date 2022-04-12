import {v1} from "uuid";
import {TodoListType} from "../api/todolist-api";


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleType | ChangeTodolistFilterType

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
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {type: "REMOVE-TODOLIST", id: todolistID} as const
}

export const addTodolistAC = (newTodolistTitle: string) => {
    return {type: "ADD-TODOLIST", title: newTodolistTitle, todolistID: v1()} as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}

export const changeTodolistFilterAC = (id: string, filter: filterValueType) => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, id} as const
}