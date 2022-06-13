import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC,
    changeTodolistTitleAC, filterValueType,
    removeTodolistAC, setTodolistsAC, TodoListDomainType,
    todolistReducer
} from "./todolist-reducer";

let todolistID1: string
let todolistID2: string
let startState: Array<TodoListDomainType>

beforeEach(() => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
    ]
})

test('todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistReducer(startState, addTodolistAC({
        title: newTodolistTitle,
        id: '1',
        order: 0,
        addedDate: ''
    }))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')

})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New title'

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New title')
})

test('correct filter of todolist should be changed', () => {
    let newFiler: filterValueType = 'completed'

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistID2, newFiler))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})

test('correct status of todolist should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
    ]

    const endState = todolistReducer(startState, changeTodolistEntityStatusAC(todolistID2, "loading"))

    expect(endState[1].entityStatus).toBe("loading")
    expect(endState[0].entityStatus).toBe("idle")
})

test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState)

    const endState = todolistReducer([], action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')

})

