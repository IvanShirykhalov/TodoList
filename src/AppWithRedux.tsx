import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./State/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";

export type filterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: filterValueType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, dispatchTodolistsReducer] = useReducer(todolistReducer,
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ])
    const [tasks, dispatchTasksReducer] = useReducer(tasksReducer,
        {
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

    //tasks
    const removeTask = (id: string, todolistID: string) => {
        dispatchTasksReducer(removeTaskAC(id, todolistID))

    }

    const addTask = (title: string, todolistID: string) => {
        dispatchTasksReducer(addTaskAC(title, todolistID))

    }


    const changeStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        dispatchTasksReducer(changeTaskStatusAC(isDone, taskID, todolistID))

    }

    const changeTaskTitle = (taskID: string, newTitle: string, todolistID: string) => {
        dispatchTasksReducer(changeTaskTitleAC(newTitle, taskID, todolistID))

    }


    //todolists
    const changeFilter = (value: filterValueType, todolistID: string) => {
        dispatchTodolistsReducer(changeTodolistFilterAC(todolistID, value))
    }

    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)
    }

    const changeTodoListStatus = (id: string, newTitle: string) => {
        dispatchTodolistsReducer(changeTodolistTitleAC(id, newTitle))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)

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
                        let tasksFoToDoList = tasks[tl.id]
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

export default AppWithReducers

