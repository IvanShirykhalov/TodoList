import axios, {AxiosResponse} from "axios";

export type TodoListType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
    fieldsErrors: string[]
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0c2de323-eb53-4ebd-b722-6248960ba08c'
    },
})


export const todolistApi = {
    //todolist
    getTodo() {
        return instance.get<any, AxiosResponse<TodoListType[]>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post <any, AxiosResponse<ResponseType<{ item: TodoListType }>>, { title: string }>
        ('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<any, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`)

    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title})
    },

    //task
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<any, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>
        (`todo-lists/${todolistId}/tasks`, {title})

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    upgradeTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post <any, AxiosResponse<ResponseType<{ userId?: number}>>>
        ('auth/login', data)
    },
    me() {
        return instance.get <any, AxiosResponse<ResponseType<{id: number, email: string, login: string}>>>
        ('auth/me')
    }
}
