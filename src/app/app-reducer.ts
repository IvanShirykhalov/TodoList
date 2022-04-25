export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: 'some error' as ErrorType

}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type setErrorActionType = ReturnType<typeof setErrorAC>;
export type setStatusActionType = ReturnType<typeof setStatusAC>;

type ActionsType =
    | setErrorActionType
    | setStatusActionType


export const setErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)