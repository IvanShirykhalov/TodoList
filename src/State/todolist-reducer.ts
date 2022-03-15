import {v1} from "uuid";
import {filterValueType, TodoListType} from "../App";



export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
export type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: filterValueType
}


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleType | ChangeTodolistFilterType

const initialState: Array<TodoListType> = []

export const todolistReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistID, title: action.title, filter: 'all'}, ...state]
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

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistID}
}

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: newTodolistTitle, todolistID: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}

export const changeTodolistFilterAC = (id: string, filter: filterValueType): ChangeTodolistFilterType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, id}
}