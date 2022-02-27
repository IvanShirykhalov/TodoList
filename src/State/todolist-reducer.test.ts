import {v1} from "uuid";
import {filterValueType, TodoListType} from "../App";
import {todolistReducer} from "./todolist-reducer";
import {userReducer} from "./user-reducer";

test('todolist should be removed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'REMOVE-TODOLIST',
        id: todolistID1
    }

    const endState = todolistReducer(startState, action)

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

    const action = {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle
    }

    const endState = todolistReducer(startState, action)

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

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistID2,
        title: newTodolistTitle
    }

    const endState = todolistReducer(startState, action)

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

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistID2,
        filter: newFiler
    }

    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})