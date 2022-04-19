import TextField from "@mui/material/TextField";
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [editMode, setEditMoe] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMoe(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMoe(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode ? <TextField variant="standard" value={title} onBlur={activateViewMode} onChange={onChangeHandler}
                              autoFocus/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})