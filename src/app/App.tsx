import React, {useCallback, useEffect} from 'react';
import './App.css';

import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Loging";
import {TodoListsList} from "../features/Todolists/TodoListsList";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


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
                        {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}> Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed style={{padding: '20px'}}>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<TodoListsList demo={demo}/>}/>
                        <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    </Routes>
                </Container>

            </div>
        </BrowserRouter>
    );
}

export default App
