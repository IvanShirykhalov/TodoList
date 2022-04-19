import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TaskStateType, updateTaskAC} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../Todolists/todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

let startState: TaskStateType = {}
beforeEach(() => {
    startState = {
        'todolistID1': [
            {
                id: '1',
                title: 'React',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID1',
                startDate: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                deadline: '',
                description: ''
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID1',
                startDate: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                deadline: '',
                description: ''
            },
            {
                id: '3',
                title: 'CSS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID1',
                startDate: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                deadline: '',
                description: ''
            },
            {
                id: '4',
                title: 'HTML',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID1',
                startDate: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                deadline: '',
                description: ''
            },
        ],
        'todolistID2': [
            {
                id: '1',
                title: 'Сream',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID2',
                startDate: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                deadline: '',
                description: ''
            },
            {
                id: '2',
                title: 'Chocolate',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID2',
                startDate: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                deadline: '',
                description: ''
            },
            {
                id: '3',
                title: 'Book',
                status: TaskStatuses.New,
                todoListId: 'todolistID2',
                startDate: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                deadline: '',
                description: ''
            },
            {
                id: '4',
                title: 'Coke',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID2',
                startDate: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                deadline: '',
                description: ''
            },
        ]
    }
})

test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC('2', 'todolistID2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'].length).toBe(4)
    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {


    //const action = addTaskAC('Snack', 'todolistID2')
    const action = addTaskAC({
        id: '1',
        title: 'Snack',
        todoListId: 'todolistID2',
        startDate: '',
        order: 0,
        priority: 0,
        description: '',
        addedDate: '',
        status: TaskStatuses.New,
        deadline: ''
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'].length).toBe(4)
    expect(endState['todolistID2'].length).toBe(5)
    expect(endState['todolistID2'][0].id).toBeDefined()
    expect(endState['todolistID2'][0].title).toBe('Snack')
    expect(endState['todolistID2'][0].status).toBe(TaskStatuses.New)

})

test('status of specified task should be changed', () => {

    const action = updateTaskAC({
        title: '1',
        description: '',
        status: TaskStatuses.New,
        deadline: '',
        startDate: '',
        priority: TaskPriorities.Low
    }, '2', 'todolistID2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistID2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {

    const action = updateTaskAC({
        title: 'Milk',
        status: TaskStatuses.New,
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        startDate: ''
    }, '2', 'todolistID2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'][1].title).toBe('JS')
    expect(endState['todolistID2'][1].title).toBe('Milk')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        title: 'new todolist',
        id: 'blabla',
        order: 0,
        addedDate: ''
    })

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistID1' && k !== 'todolistID2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolist should be delete', () => {

    const action = removeTodolistAC('todolistID2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).not.toBeDefined()
})

test('task should be added for todolist', () => {

    const action = setTasksAC(startState['todolistID1'], 'todolistID1')
    const endState = tasksReducer({
        'todolistID2': [],
        'todolistID1': [],
    }, action)

    expect(endState['todolistID1'].length).toBe(4)
    expect(endState['todolistID2'].length).toBe(0)

})