import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, filterValueType,
    removeTodolistAC, TodoListDomainType,
    todolistReducer
} from "./todolist-reducer";

test('todolist should be removed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodoListDomainType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListDomainType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
    ]


    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')

})

test('correct todolist should change its name', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New title'

    const startState: Array<TodoListDomainType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
    ]

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New title')
})

test('correct filter of todolist should be changed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let newFiler: filterValueType = 'completed'

    const startState: Array<TodoListDomainType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
    ]


    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistID2, newFiler))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})

