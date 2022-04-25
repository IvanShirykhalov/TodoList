import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import React from "react";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/Tasks/tasks-reducer";
import {todolistReducer} from "../features/Todolists/todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {appReducer} from "./app-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: 'loading'},
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
    },
    app: {
        status: 'idle',
        error: null
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}