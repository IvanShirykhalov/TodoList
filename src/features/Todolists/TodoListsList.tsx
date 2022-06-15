import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./TodoList";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC,
    filterValueType,
    removeTodolistTC, TodoListDomainType
} from "./todolist-reducer";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";

type PropsType = {
    demo?: boolean
}

export const TodoListsList = React.memo(({demo = false}: PropsType) => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [dispatch, demo, isLoggedIn])

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

    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }


    return (
        <Grid container spacing={4}>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
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
        </Grid>
    );
})