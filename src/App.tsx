import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodoListDomainType, filterValueType, fetchTodolistsTC
} from "./State/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./State/store";
import {TaskType} from "./api/todolist-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const App = React.memo(() => {


    const dispatch = useDispatch()
    const todolists = useSelector<RootState, Array<TodoListDomainType>>(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const changeFilter = useCallback((value: filterValueType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [dispatch])

    const changeTodoListStatus = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

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

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}} elevation={6}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
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
})

export default App

