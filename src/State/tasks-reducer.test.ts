import React from "react";
import {TaskStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";


test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        'todolistID1': [
            {id: '1', title: 'React', isDone: false},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'CSS', isDone: false},
            {id: '4', title: 'HTML', isDone: true},
        ],
        'todolistID2': [
            {id: '1', title: 'Сream', isDone: true},
            {id: '2', title: 'Chocolate', isDone: true},
            {id: '3', title: 'Book', isDone: false},
            {id: '4', title: 'Coke', isDone: true},
        ]
    }

    const action = removeTaskAC('2', 'todolistID2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'].length).toBe(4)
    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const startState: TaskStateType = {
        'todolistID1': [
            {id: '1', title: 'React', isDone: false},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'CSS', isDone: false},
            {id: '4', title: 'HTML', isDone: true},
        ],
        'todolistID2': [
            {id: '1', title: 'Сream', isDone: true},
            {id: '2', title: 'Chocolate', isDone: true},
            {id: '3', title: 'Book', isDone: false},
            {id: '4', title: 'Coke', isDone: true},
        ]
    }

    const action = addTaskAC('Snack', 'todolistID2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'].length).toBe(4)
    expect(endState['todolistID2'].length).toBe(5)
    expect(endState['todolistID2'][0].id).toBeDefined()
    expect(endState['todolistID2'][0].title).toBe('Snack')
    expect(endState['todolistID2'][0].isDone).toBe(false)

})

test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        'todolistID1': [
            {id: '1', title: 'React', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'CSS', isDone: false},
            {id: '4', title: 'HTML', isDone: true},
        ],
        'todolistID2': [
            {id: '1', title: 'Сream', isDone: true},
            {id: '2', title: 'Chocolate', isDone: true},
            {id: '3', title: 'Book', isDone: false},
            {id: '4', title: 'Coke', isDone: true},
        ]
    }

    const action = changeTaskStatusAC(false, '2', 'todolistID2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'][1].isDone).toBe(true)
    expect(endState['todolistID2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const startState: TaskStateType = {
        'todolistID1': [
            {id: '1', title: 'React', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'CSS', isDone: false},
            {id: '4', title: 'HTML', isDone: true},
        ],
        'todolistID2': [
            {id: '1', title: 'Сream', isDone: true},
            {id: '2', title: 'Chocolate', isDone: true},
            {id: '3', title: 'Book', isDone: false},
            {id: '4', title: 'Coke', isDone: true},
        ]
    }


    const action = changeTaskTitleAC('Milk', '2', 'todolistID2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'][1].title).toBe('JS')
    expect(endState['todolistID2'][1].title).toBe('Milk')
})
