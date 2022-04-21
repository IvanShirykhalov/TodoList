import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "../features/Todolists/todolist-reducer";
import {tasksReducer} from "../features/Tasks/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer
})



export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store