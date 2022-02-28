import {v1} from "uuid";
import {filterValueType, TodoListType} from "../App";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";

test('todolist should be removed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    /*    const action = {
            type: 'REMOVE-TODOLIST' as const,
            id: todolistID1
        }*/

    const endState = todolistReducer(startState, RemoveTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    /*    const action = {
            type: 'ADD-TODOLIST' as const,
            title: newTodolistTitle
        }*/

    const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')

})

test('correct todolist should change its name', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New title'

    const startState: Array<TodoListType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    /*
        const action = {
            type: 'CHANGE-TODOLIST-TITLE' as const,
            id: todolistID2,
            title: newTodolistTitle
        }
    */

    const endState = todolistReducer(startState, ChangeTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New title')
})

test('correct filter of todolist should be changed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newFiler: filterValueType = 'completed'

    const startState: Array<TodoListType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    /*    const action = {
            type: 'CHANGE-TODOLIST-FILTER' as const,
            id: todolistID2,
            filter: newFiler
        }*/

    const endState = todolistReducer(startState, ChangeTodolistFilterAC(todolistID2, newFiler))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})

