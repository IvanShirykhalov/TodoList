import {TaskStateType, TodoListType} from "../App";
import {AddTodolistAC, todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

test('id should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistState: Array<TodoListType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolist).toBe(action.todolistID)
})