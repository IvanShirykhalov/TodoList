import {filterValueType, TodoListType} from "../App";
import {v1} from "uuid";


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

export const todolistReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.todolistID, title: action.title, filter: 'all'}]
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
            throw new Error('I don\'t understand this action type')
    }
}

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistID}
}

export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: newTodolistTitle, todolistID: v1()}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}

export const ChangeTodolistFilterAC = (id: string, filter: filterValueType): ChangeTodolistFilterType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, id}
}