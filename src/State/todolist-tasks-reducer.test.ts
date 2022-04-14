import {addTodolistAC, setTodolistsAC, TodoListDomainType, todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType} from "../App";

test('id should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistState: Array<TodoListDomainType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolist).toBe(action.todolistID)
})

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {id: '1', title: 'What to learn', order: 0, addedDate: ''},
        {id: '2', title: 'What to buy', order: 0, addedDate: ''},
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(endState['1']).toBeDefined()
    expect(endState['2 ']).toBeDefined()
})