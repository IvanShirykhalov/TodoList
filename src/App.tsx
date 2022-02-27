import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type filterValueType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: filterValueType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    const [tasksObj, setTasksObj] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'HTML', isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Сream', isDone: true},
            {id: v1(), title: 'Chocolate', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Coke', isDone: true},

        ],
    })

    const removeTask = (id: string, todolistID: string) => {
        let tasks = tasksObj[todolistID]
        const newTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistID] = newTasks
        setTasksObj({...tasksObj})
    }

    const addTask = (title: string, todolistID: string) => {
        let task = {id: v1(), title, isDone: false}
        let tasks = tasksObj[todolistID]
        let newTask = [task, ...tasks]
        tasksObj[todolistID] = newTask
        setTasksObj({...tasksObj})
    }

    const changeFilter = (value: filterValueType, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const changeStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        let tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }

    }

    const changeTaskTitle = (taskID: string, newTitle: string, todolistID: string) => {
        let tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }

    }

    const removeTodolist = (todolistID: string) => {
        let delTodolist = todolists.filter(tl => tl.id !== todolistID)
        setTodolists(delTodolist)
        delete tasksObj[todolistID]
        setTasksObj({...tasksObj})
    }

    const changeTodoListStatus = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    const addTodolist = (title: string) => {
        let newTodo: TodoListType = {id: v1(), title, filter: 'all'}
        setTodolists([newTodo, ...todolists])
        setTasksObj({...tasksObj, [newTodo.id]: []})
    }

    return (
        <div className={'App'}>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}> Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{padding: '20px'}}>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map((tl) => {

                        let tasksFoToDoList = tasksObj[tl.id]
                        switch (tl.filter) {
                            case 'completed':
                                tasksFoToDoList = tasksFoToDoList.filter(t => t.isDone)
                                break;
                            case 'active':
                                tasksFoToDoList = tasksFoToDoList.filter(t => !t.isDone)
                                break;
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}} elevation={6}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksFoToDoList}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodoListStatus={changeTodoListStatus}
                                    />
                                </Paper>
                            </Grid>
                        )

                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App

