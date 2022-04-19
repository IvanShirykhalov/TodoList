import {Provider} from "react-redux";
import {RootState} from "./store";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/Tasks/tasks-reducer";
import {todolistReducer} from "../features/Todolists/todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ''},
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: '1.1',
                title: "HTML",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: "todolistId1"
            },
            {
                id: v1(),
                title: "CSS",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: "todolistId1"
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: "todolistId1"
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: "todolistId2"
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: "todolistId2"
            },
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}