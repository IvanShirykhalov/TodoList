import {ControlPoint} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickHandler = () => {
        if (title.trim() === '') {
            return setError('Title is required')
        }
        props.addItem(title.trim())
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <TextField variant={'standard'}
                       label={'Type value'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={onClickHandler} color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
})