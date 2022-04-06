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
        return instance.post <any, AxiosResponse<ResponseType<{ item: TodoType }>>, { title: string }>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<any, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`)

    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<any, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<any, AxiosResponse<TaskType>, { title: string }>(`todo-lists/${todolistId}/tasks`, {title})

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    upgradeTask(todolistId: string, taskId: string, title: string) {
        return instance.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
}

type TodoType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
    fieldsErrors: string[]
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}