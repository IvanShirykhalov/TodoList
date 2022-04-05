import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0c2de323-eb53-4ebd-b722-6248960ba08c'
    },
})


export const todolistApi = {
    getTodo() {
        return instance.get<any, AxiosResponse<TodoType[]>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post <any, AxiosResponse<CommonTodoType<{ item: TodoType }>>, { title: string }>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<any, AxiosResponse<CommonTodoType>>(`todo-lists/${todolistId}`)

    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<any, AxiosResponse<CommonTodoType>>(`todo-lists/${todolistId}`, {title})
    },
}

type TodoType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}

type CommonTodoType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}

/*
type CreateTodoResponseType = {
    resultCode: number,
    messages: string[],
    data: {
        item: TodoType
    },
    fieldsErrors: string[]
}

type DeleteAndUpdateTodoResponseType = {
    resultCode: number,
    messages: string[],
    data: {},
    fieldsErrors: string[]
}
*/
