import {Dispatch} from "redux";
import {setAppStatusAC, setErrorActionType, setStatusActionType} from "../../app/app-reducer";
import {auithAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type ActionsType = any
type ThunkDispatch = Dispatch<ActionsType | setErrorActionType | setStatusActionType>
type initialStateType = {}
const initialState: initialStateType = {}

export const loginReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        default:
            return state
    }
}


export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    auithAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                alert('!!!')
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })

}