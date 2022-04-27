import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "../features/Todolists/TodoList";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    filterValueType,
    removeTodolistTC,
    TodoListDomainType
} from "../features/Todolists/todolist-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Loging";

type PropsType = {
    demo?: boolean
}

const App = React.memo(({demo = false}: PropsType) => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [dispatch, demo])


    const changeFilter = useCallback((value: filterValueType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, [dispatch])

    const changeTodoListStatus = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <BrowserRouter>
            <div className={'App'}>
                <AppBar position={'static'}>
                    <ErrorSnackbar/>
                    <Toolbar>
                        <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'}>
                            News
                        </Typography>
                        <Button color={'inherit'}> Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed style={{padding: '20px'}}>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Grid container spacing={4}>
                            {todolists.map((tl) => {

                                return (
                                    <Grid item>
                                        <Paper style={{padding: '10px'}} elevation={6}>
                                            <TodoList
                                                demo={demo}
                                                todolist={tl}
                                                key={tl.id}
                                                changeFilter={changeFilter}
                                                removeTodolist={removeTodolist}
                                                changeTodoListStatus={changeTodoListStatus}
                                            />
                                        </Paper>
                                    </Grid>
                                )

                            })}
                        </Grid>}/>
                        <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    </Routes>
                </Container>

            </div>
        </BrowserRouter>
    );
})

export default App

