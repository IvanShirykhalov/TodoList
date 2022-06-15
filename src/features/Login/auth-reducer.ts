import {Dispatch} from "redux";
import {setAppStatusAC, setErrorActionType, setStatusActionType} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type ActionsType = ReturnType<typeof setIsLoggedInAC>
type ThunkDispatch = Dispatch<ActionsType | setErrorActionType | setStatusActionType>
type initialStateType = {
    isLoggedIn: boolean
}
const initialState: initialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => ({type: 'SET-IS-LOGGED-IN', value} as const)

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | setErrorActionType | setStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })

}

export const logoutTC = () => (dispatch: Dispatch<ActionsType | setErrorActionType | setStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })

}